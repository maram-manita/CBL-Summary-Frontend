# api/views.py
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import pypandoc
import base64
import tempfile
import requests
from .serializers import UserSerializer, ReportSerializer
from api.models import Report

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ReportListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]


class SummarizeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        selected_file_ids = request.data.get('selected_file_ids', [])
        language = request.data.get('language', 'en')

        if not selected_file_ids:
            return Response({"error": "No file IDs provided."}, status=status.HTTP_400_BAD_REQUEST)

        reports = Report.objects.filter(id__in=selected_file_ids)
        if not reports.exists():
            return Response({"error": "No matching reports found."}, status=status.HTTP_404_NOT_FOUND)

        markdown_texts = []
        for r in reports:
            if not r.md_path:
                return Response({"error": f"Report with ID {r.id} has no md_path."}, status=status.HTTP_400_BAD_REQUEST)

            md_path = r.md_path.strip()
            if md_path.startswith('http://') or md_path.startswith('https://'):
                
                try:
                    response = requests.get(md_path)
                    if response.status_code != 200:
                        return Response({"error": f"File at URL {md_path} not accessible."}, status=status.HTTP_404_NOT_FOUND)
                    markdown_texts.append(response.text)
                except requests.RequestException as e:
                    return Response({"error": f"Error accessing file at URL {md_path}.", "details": str(e)}, status=status.HTTP_404_NOT_FOUND)
            else:
                
                if not os.path.exists(md_path):
                    return Response({"error": f"File at path {md_path} not found."}, status=status.HTTP_404_NOT_FOUND)
                try:
                    with open(md_path, 'r', encoding='utf-8') as f:
                        markdown_texts.append(f.read())
                except OSError as e:
                    return Response({"error": f"Error reading file at path {md_path}.", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        combined_text = "\n\n".join(markdown_texts)

        if len(selected_file_ids) == 1:
            
            if language == "en":
                prompt = f"""
                Summarize the following text in English using organized headings and bullet points.
                Add Markdown tables for key data if applicable.

                {combined_text}
                """
            else:
                prompt = f"""
                قم بتلخيص النص التالي باللغة العربية مع استخدام نقاط وعناوين منظمة وشاملة.
                إذا كان ذلك مناسبًا، أضف جداول بتنسيق Markdown لعرض البيانات الهامة.

                {combined_text}
                """
        else:
            # Multiple-file comparison and analytical prompt
            if language == "en":
                prompt = f"""
                The following content is derived from multiple documents. Please:

                1. Summarize each document individually with clear headings.
                2. Identify relationships and contrasts between these documents.
                3. Highlight trends, common themes, and areas of significant difference.
                4. Provide analytical insights, drawing meaningful conclusions from the combined set of documents.
                5. If applicable, use Markdown tables to clearly present comparative data.

                {combined_text}
                """
            else:
                prompt = f"""
                النص التالي مستمد من وثائق متعددة. يرجى القيام بما يلي باللغة العربية:

                1. تلخيص كل وثيقة على حدة مع عناوين واضحة.
                2. تحديد العلاقات والتباينات بين هذه الوثائق.
                3. تسليط الضوء على الاتجاهات والمواضيع المشتركة وأوجه الاختلاف البارزة.
                4. تقديم تحليلات واستنتاجات ذات معنى بناءً على مجموعة الوثائق الكاملة.
                5. إذا كان ذلك مناسبًا، استخدم جداول بتنسيق Markdown لعرض البيانات المقارنة بوضوح.

                {combined_text}
                """

        GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
        if not GEMINI_API_KEY:
            return Response({"error": "Gemini API key not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={GEMINI_API_KEY}"

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }

        try:
            response = requests.post(api_url, json=payload)
            response.raise_for_status()
            data = response.json()
            summary_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return Response({"summary": summary_text}, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            return Response({"error": "Error fetching summary from Gemini API.", "details": str(e)}, status=status.HTTP_502_BAD_GATEWAY)
        except (KeyError, IndexError) as e:
            return Response({"error": "Unexpected response structure from Gemini API.", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# -----------------------------
# New Code: SummarizeExportView
# -----------------------------

def convert_markdown_to_pdf(markdown_text, language='en'):
    
    extra_args = [
        '--standalone',
        '--from=markdown+pipe_tables',
        '--pdf-engine=xelatex',
        '--variable', f'lang={language}',
       '--variable', 'mainfont=Tajawal',
        '--variable', 'dir=auto',
        '--toc'
    ]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".md") as md_file:
        md_file.write(markdown_text.encode('utf-8'))
        md_file_path = md_file.name

    pypandoc.convert_file(md_file_path, 'pdf', outputfile=md_file_path + ".pdf", extra_args=extra_args)
    os.remove(md_file_path)  
    pdf_path = md_file_path + ".pdf"
    return pdf_path

def convert_markdown_to_docx(markdown_text):

    extra_args = ['--from=markdown+pipe_tables']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".md") as md_file:
        md_file.write(markdown_text.encode('utf-8'))
        md_file_path = md_file.name

    pypandoc.convert_file(md_file_path, 'docx', outputfile=md_file_path + ".docx", extra_args=extra_args)
    os.remove(md_file_path)
    docx_path = md_file_path + ".docx"
    return docx_path

class SummarizeExportView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        summary_text = request.data.get("summary_text", "")
        language = request.data.get("language", "en")  

        if not summary_text:
            return Response({"error": "No summary text provided."}, status=status.HTTP_400_BAD_REQUEST)

        pdf_path = convert_markdown_to_pdf(summary_text, language=language)
        # Convert markdown summary to DOCX
        docx_path = convert_markdown_to_docx(summary_text)

        with open(pdf_path, 'rb') as pdf_file:
            pdf_content = pdf_file.read()
        with open(docx_path, 'rb') as docx_file:
            docx_content = docx_file.read()

        # Clean up temporary files
        os.remove(pdf_path)
        os.remove(docx_path)

        # Encode files in base64 for JSON response
        pdf_base64 = base64.b64encode(pdf_content).decode('utf-8')
        docx_base64 = base64.b64encode(docx_content).decode('utf-8')

        return Response(
            {
                "pdf_base64": pdf_base64,
                "docx_base64": docx_base64
            },
            status=status.HTTP_200_OK
        )