# Generated by Django 4.1.4 on 2023-04-15 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_account_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
    ]
