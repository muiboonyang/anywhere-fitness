from rest_framework import serializers
from .models import GymPackages


class GymPackagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymPackages
        fields = '__all__'
