import re
import requests
from urllib.parse import urljoin, unquote
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from api.models import Report

class Command(BaseCommand):
    help = 'Populate or update the database with report data from a remote directory listing.'

    def fetch_report_data(self, base_url):
        def extract_year(file_name):
            
            years = re.findall(r'(?<!\d)(\d{4})(?!\d)', file_name)
            valid_years = [int(year) for year in years if 1900 <= int(year) <= 2100]
            return str(max(valid_years)) if valid_years else 'عام'

        main_page = requests.get(base_url)
        main_soup = BeautifulSoup(main_page.text, 'html.parser')

        report_type_links = []
        for link in main_soup.find_all('a', href=True):
            href = link['href']
            if href.endswith('/') and href not in ('../', './'):
                report_type_links.append(href)

        report_data = []

        for report_type_href in report_type_links:
            report_type_name = unquote(report_type_href.strip('/'))
            report_type_url = urljoin(base_url, report_type_href)

            type_page = requests.get(report_type_url)
            type_soup = BeautifulSoup(type_page.text, 'html.parser')

            file_groups = {}

            for link in type_soup.find_all('a', href=True):
                file_href = link['href']
                if file_href in ('../', './'):
                    continue

                decoded_filename = unquote(file_href)
                if decoded_filename.lower().endswith(('.pdf', '.md')):
                    base_name, ext = decoded_filename.rsplit('.', 1)
                    ext = '.' + ext
                    if base_name not in file_groups:
                        file_groups[base_name] = {}
                    file_url = urljoin(report_type_url, file_href)
                    file_groups[base_name][ext] = file_url

            for base_name, files in file_groups.items():
                pdf_url = files.get('.pdf')
                md_url = files.get('.md')
                year = extract_year(base_name)

                report_data.append({
                    'report_type': report_type_name,
                    'year': year,
                    'name': base_name,
                    'pdf_path': pdf_url,
                    'md_path': md_url
                })

        return report_data

    def update_db(self, report_data):
        
        new_count = 0
        for data in report_data:
    
            exists = Report.objects.filter(
                report_type=data['report_type'],
                year=data['year'],
                name=data['name']
            ).exists()

            if not exists:
                report = Report.objects.create(
                    report_type=data['report_type'],
                    year=data['year'],
                    name=data['name'],
                    pdf_path=data['pdf_path'],
                    md_path=data['md_path']
                )
                new_count += 1
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Inserted new report: {report.report_type} | {report.year} | {report.name}"
                    )
                )

        if new_count == 0:
            self.stdout.write("No new reports found.")

    def handle(self, *args, **options):
        base_url = "http://206.189.52.179/api/files/CBL_Reports/"
       
        report_data = self.fetch_report_data(base_url)
        # Update the DB with any new reports
        self.update_db(report_data)
        self.stdout.write("Database update process completed.")
