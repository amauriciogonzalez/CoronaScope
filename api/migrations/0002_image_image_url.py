# Generated by Django 4.2 on 2023-04-16 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='image_url',
            field=models.CharField(default='http://127.0.0.1:8000/api/images/<built-in function id>/image', max_length=500),
        ),
    ]
