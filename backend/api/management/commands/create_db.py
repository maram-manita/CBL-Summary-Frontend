import re
import requests
from urllib.parse import urljoin, unquote
from bs4 import BeautifulSoup

from django.core.management.base import BaseCommand
from api.models import Report

class Command(BaseCommand):
    help = 'Populate the database with report data from a remote directory listing.'

    def handle(self, *args, **options):
        base_url = "http://206.189.52.179/api/files/CBL_Reports/"

        def extract_year(file_name):
            # Extract a valid 4-digit year from the file name
            years = re.findall(r'(?<!\d)(\d{4})(?!\d)', file_name)
            valid_years = [int(year) for year in years if 1900 <= int(year) <= 2100]
            return str(max(valid_years)) if valid_years else 'عام'

        # Get the main page listing
        main_page = requests.get(base_url)
        main_soup = BeautifulSoup(main_page.text, 'html.parser')

        # In the HTML directory listing, directories end with '/'
        # We identify them by checking if href ends with '/'
        # They represent "report types"
        report_type_links = []
        for link in main_soup.find_all('a', href=True):
            href = link['href']
            # Directories typically end with '/', exclude '../'
            if href.endswith('/') and href not in ('../', './'):
                report_type_links.append(href)

        # Now we have a list of directories, each representing a report type
        # For each directory, we fetch its page and parse PDF and MD files
        for report_type_href in report_type_links:
            # The report type name can be deduced from the href by removing trailing '/'
            # Since href is percent-encoded, we decode it.
            report_type_name = unquote(report_type_href.strip('/'))

            report_type_url = urljoin(base_url, report_type_href)
            type_page = requests.get(report_type_url)
            type_soup = BeautifulSoup(type_page.text, 'html.parser')

            # Collect files by base name (ignoring extension)
            file_groups = {}

            for link in type_soup.find_all('a', href=True):
                file_href = link['href']
                # Ignore parent directory link
                if file_href in ('../', './'):
                    continue
                
                # Decode filename for processing (to extract year, etc.)
                decoded_filename = unquote(file_href)
                if decoded_filename.lower().endswith(('.pdf', '.md')):
                    base_name, ext = decoded_filename.rsplit('.', 1)
                    ext = '.' + ext  # re-add the dot
                    if base_name not in file_groups:
                        file_groups[base_name] = {}
                    
                    # Store the full URL as given by the href for this file
                    file_url = urljoin(report_type_url, file_href)
                    file_groups[base_name][ext] = file_url

            # Now create Report entries
            for base_name, files in file_groups.items():
                pdf_url = files.get('.pdf')
                md_url = files.get('.md')

                year = extract_year(base_name)

                # Create report entry
                Report.objects.create(
                    report_type=report_type_name,
                    year=year,
                    name=base_name,
                    pdf_path=pdf_url,
                    md_path=md_url
                )

        self.stdout.write("Report data populated into the database from remote URL paths.")
