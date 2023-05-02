from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.

class GymPackages(models.Model):
    name = models.CharField(max_length=30, default="")
    credits = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    description = models.CharField(max_length=500, default="")


def _str_(self):
        return self.class_type
