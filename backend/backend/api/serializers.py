from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Pet, Community

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'type', 'fed', 'fed_at', 'community', 'created_by', 'created_at']
        read_only_fields = ['created_at']

    def validate_community(self, value):
        if not Community.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("This community does not exist.")
        return value

    def validate(self, attrs):
        if attrs.get('fed') and not attrs.get('fed_at'):
            raise serializers.ValidationError("fed_at must be set if the pet is fed.")
        return attrs

class CommunitySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    pets = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Community
        fields = ['id', 'name', 'users', 'invite_code', 'created_by', 'created_at', 'pets']
        read_only_fields = ['invite_code', 'created_at']
