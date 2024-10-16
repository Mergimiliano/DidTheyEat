from django.contrib import admin
from .models import UserProfile, Community, Pet

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = (['is_staff'])

@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_users' ,'created_by', 'created_at')
    search_fields = ('name',)

    def display_users(self, obj):
        return ", ".join([user.username for user in obj.users.all()])
    
    display_users.short_description = 'Users'

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'fed', 'community', 'created_by', 'created_at')
    list_filter = ('type', 'fed', 'community')
    search_fields = ('name',)
