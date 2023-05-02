from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.

class GymInstructors(models.Model):
    name = models.CharField(max_length=30, default="")
    class_type = models.CharField(max_length=20, default="")
    cardImage = models.CharField(max_length=200, default="")
    profileImage = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=1000, default="")

    def _str_(self):
        return self.class_type
