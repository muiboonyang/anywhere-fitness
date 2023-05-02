from django.contrib import admin
from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'description', 'date', 'name')


# Register your models here.

admin.site.register(Review, ReviewAdmin)
