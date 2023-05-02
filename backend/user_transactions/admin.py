from django.contrib import admin
from .models import Transactions


class TransactionsAdmin(admin.ModelAdmin):
    list_display = ('classCredit', 'classDebit', 'date', 'time', 'user', 'name', 'transaction_type')


# Register your models here.

admin.site.register(Transactions, TransactionsAdmin)
