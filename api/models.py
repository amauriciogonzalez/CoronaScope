from django.db import models

class Image(models.Model):
    image = models.ImageField(null=False)
    classification = models.CharField(max_length=30, null=True)
    confidence = models.IntegerField(null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)