from rest_framework import serializers
from .models import Pet, Community, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "email", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(**validated_data)
        return user

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'type', 'fed', 'fed_at', 'fed_by', 'community', 'created_by', 'created_at']
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
    pets = serializers.StringRelatedField(many=True, read_only=True)
    users = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Community
        fields = ['id', 'name', 'invite_code', 'created_at', 'pets', 'users']
        read_only_fields = ['invite_code', 'created_at', 'pets', 'created_by']
