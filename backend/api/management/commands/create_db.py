import os
import re
from django.core.management.base import BaseCommand
from django.conf import settings
from api.models import Report

class Command(BaseCommand):
    help = 'Populate the database with report data using remote URL paths.'

    def handle(self, *args, **options):
        # Directory containing the reports locally (assuming it still exists)
        # If you no longer have them locally, you'll need a different approach.
        media_reports_dir = os.path.join(settings.MEDIA_ROOT, "reports")

        # Base URL prefix where files are now hosted
        base_url = "http://206.189.52.179/api/files/CBL_Reports/"

        def extract_year(file_name):
            # Extract a valid 4-digit year from the file name
            years = re.findall(r'(?<!\d)(\d{4})(?!\d)', file_name)
            valid_years = [int(year) for year in years if 1900 <= int(year) <= 2100]
            return str(max(valid_years)) if valid_years else 'عام'

        # Identify folders in the local directory
        folders = [
            folder for folder in os.listdir(media_reports_dir)
            if os.path.isdir(os.path.join(media_reports_dir, folder))
        ]

        for folder in folders:
            folder_path = os.path.join(media_reports_dir, folder)
            report_type = folder

            if os.path.exists(folder_path):
                file_groups = {}
                # Group files by their base name (ignoring extension)
                for file_name in os.listdir(folder_path):
                    file_path = os.path.join(folder_path, file_name)
                    if os.path.isfile(file_path):
                        base_name, ext = os.path.splitext(file_name)
                        if base_name not in file_groups:
                            file_groups[base_name] = {}
                        file_groups[base_name][ext] = file_name

                # Create Report entries
                for base_name, files in file_groups.items():
                    pdf_file_name = files.get(".pdf")
                    md_file_name = files.get(".md")

                    year = extract_year(base_name)

                    # Construct the remote URL paths
                    pdf_rel_path = None
                    if pdf_file_name:
                        pdf_rel_path = f"{base_url}{report_type}/{pdf_file_name}"

                    md_rel_path = None
                    if md_file_name:
                        md_rel_path = f"{base_url}{report_type}/{md_file_name}"

                    Report.objects.create(
                        report_type=report_type,
                        year=year,
                        name=base_name,
                        pdf_path=pdf_rel_path,
                        md_path=md_rel_path
                    )

        self.stdout.write("Report data populated into the database with remote URL paths.")
