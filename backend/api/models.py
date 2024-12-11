from django.db import models
import uuid

class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report_type = models.CharField(max_length=255)
    year = models.CharField(max_length=10)  # Storing year as string for simplicity
    name = models.CharField(max_length=255)
    pdf_path = models.CharField(max_length=1024, null=True, blank=True)
    md_path = models.CharField(max_length=1024, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.year})"
