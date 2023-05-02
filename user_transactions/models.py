from django.db import models
import datetime
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.

class Transactions(models.Model):

    classCredit = models.IntegerField(default=0)
    classDebit = models.IntegerField(default=0)
    transaction_type = models.CharField(max_length=20, default="")
    date = models.DateField(default=datetime.date.today)
    time = models.TimeField(auto_now_add=True)
    user = models.ForeignKey(User, default=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)


    @property

    def _str_(self):
        return self.user


