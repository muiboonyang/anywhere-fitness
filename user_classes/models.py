from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.

class FitnessClass(models.Model):

    user = models.ForeignKey(User, default=User, on_delete=models.CASCADE)
    class_type = models.CharField(max_length=30, default="")
    class_instructor = models.CharField(max_length=30, default="")
    date = models.CharField(max_length=20, default="")
    time = models.CharField(max_length=20, default="")
    spot = models.IntegerField(default="")
    spot_name = models.CharField(max_length=20, default="")
    name = models.CharField(max_length=20, default="")
    class_id = models.IntegerField(default="")

    def _str_(self):
        return self.class_type
