# Generated by Django 4.1.4 on 2023-04-13 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_account_address_line_account_contact_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='date_of_birth',
            field=models.DateField(default=''),
        ),
    ]