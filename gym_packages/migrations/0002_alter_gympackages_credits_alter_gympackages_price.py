# Generated by Django 4.1.4 on 2023-04-12 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gym_packages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gympackages',
            name='credits',
            field=models.IntegerField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='gympackages',
            name='price',
            field=models.IntegerField(default='', max_length=20),
        ),
    ]
