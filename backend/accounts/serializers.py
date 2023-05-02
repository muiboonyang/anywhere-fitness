from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    name = serializers.CharField()
    surname = serializers.CharField()

    class Meta:
        model = Account
        fields = ('email', 'password', 'name', 'surname',
                  'contact', 'date_of_birth', 'gender', 'address_line', 'unit', 'postal_code')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance





