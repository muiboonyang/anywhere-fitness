from django.db import models
import datetime
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.

class Review(models.Model):

    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateField(default=datetime.date.today)
    time = models.TimeField(auto_now_add=True)
    user = models.ForeignKey(User, default=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)

    def _str_(self):
        return self.user


