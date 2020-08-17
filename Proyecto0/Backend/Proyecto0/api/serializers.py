from rest_framework import serializers
from .models import Events
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "password"
        )

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class EventsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Events
        fields = (
            "event_id",
            'event_name',
            'event_category',
            'event_place',
            'event_address',
            'event_initial_date',
            'event_final_date',
            'event_type',
            'thumbnail',
        )

