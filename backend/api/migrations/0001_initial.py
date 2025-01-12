# Generated by Django 5.1.4 on 2024-12-10 19:10

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('report_type', models.CharField(max_length=255)),
                ('year', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=255)),
                ('pdf_path', models.CharField(blank=True, max_length=1024, null=True)),
                ('md_path', models.CharField(blank=True, max_length=1024, null=True)),
            ],
        ),
    ]
