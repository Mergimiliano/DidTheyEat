from django.contrib import admin
from .models import Community, Pet

@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name',)

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'fed', 'community', 'created_by', 'created_at')
    list_filter = ('type', 'fed', 'community')
    search_fields = ('name',)
