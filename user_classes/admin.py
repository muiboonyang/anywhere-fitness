from django.contrib import admin
from .models import FitnessClass


class FitnessClassAdmin(admin.ModelAdmin):
    list_display = ('user', 'class_type', 'class_instructor', 'date', 'time', 'spot')
    # list_display = ('class_type', 'date_time', 'instructor', 'spot_one_booked', 'spot_two_booked', 'spot_three_booked', 'spot_four_booked', 'spot_five_booked')


# Register your models here.

admin.site.register(FitnessClass, FitnessClassAdmin)
