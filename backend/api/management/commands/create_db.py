import re
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from api.models import Report

class Command(BaseCommand):
    help = 'Populate the database with report data using remote URL paths (no "reports" in paths).'

    def handle(self, *args, **options):
        # Directory containing the reports locally
        media_dir = Path(settings.MEDIA_ROOT)

        # Base URL prefix where files are now hosted
        base_url = "http://206.189.52.179/api/files/CBL_Reports/"

        def extract_year(file_name):
            # Extract a valid 4-digit year from the file name
            years = re.findall(r'(?<!\d)(\d{4})(?!\d)', file_name)
            valid_years = [int(year) for year in years if 1900 <= int(year) <= 2100]
            return str(max(valid_years)) if valid_years else 'عام'

        # Identify folders in the local directory
        folders = [f for f in media_dir.iterdir() if f.is_dir()]

        for folder in folders:
            report_type = folder.name

            if folder.exists():
                file_groups = {}
                
                # Group files by their base name (ignoring extension)
                for file_path in folder.iterdir():
                    if file_path.is_file():
                        base_name = file_path.stem
                        ext = file_path.suffix
                        if base_name not in file_groups:
                            file_groups[base_name] = {}
                        file_groups[base_name][ext] = file_path.name

                # Create Report entries
                for base_name, files in file_groups.items():
                    pdf_file_name = files.get(".pdf")
                    md_file_name = files.get(".md")

                    year = extract_year(base_name)

                    # Construct the remote URL paths without adding any "reports" directory
                    pdf_rel_path = f"{base_url}{pdf_file_name}" if pdf_file_name else None
                    md_rel_path = f"{base_url}{md_file_name}" if md_file_name else None

                    Report.objects.create(
                        report_type=report_type,
                        year=year,
                        name=base_name,
                        pdf_path=pdf_rel_path,
                        md_path=md_rel_path
                    )

        self.stdout.write("Report data populated into the database with simplified remote URL paths.")
