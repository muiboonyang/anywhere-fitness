from rest_framework import serializers
from .models import GymInstructors


class GymInstructorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymInstructors
        fields = '__all__'
