from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.

class ClassDetails(models.Model):
    class_type = models.CharField(max_length=30, default="")
    date = models.CharField(max_length=20, default="")
    time = models.CharField(max_length=20, default="")
    class_instructor = models.CharField(max_length=30, default="")
    spot_one_booked = models.BooleanField(default=False)
    spot_two_booked = models.BooleanField(default=False)
    spot_three_booked = models.BooleanField(default=False)
    spot_four_booked = models.BooleanField(default=False)
    spot_five_booked = models.BooleanField(default=False)
    spot_six_booked = models.BooleanField(default=False)
    spot_seven_booked = models.BooleanField(default=False)
    spot_eight_booked = models.BooleanField(default=False)
    spot_nine_booked = models.BooleanField(default=False)
    spot_ten_booked = models.BooleanField(default=False)
    spot_eleven_booked = models.BooleanField(default=False)
    spot_twelve_booked = models.BooleanField(default=False)
    spot_thirteen_booked = models.BooleanField(default=False)
    spot_fourteen_booked = models.BooleanField(default=False)
    spot_fifteen_booked = models.BooleanField(default=False)
    spot_sixteen_booked = models.BooleanField(default=False)
    spot_seventeen_booked = models.BooleanField(default=False)
    spot_eighteen_booked = models.BooleanField(default=False)
    spot_nineteen_booked = models.BooleanField(default=False)
    spot_twenty_booked = models.BooleanField(default=False)



    def _str_(self):
        return self.class_type
