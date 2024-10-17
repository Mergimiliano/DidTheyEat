from django.db import models
from django.contrib.auth.models import User
import uuid

class Community(models.Model):

    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User, related_name='communities')
    invite_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Communities"

class Pet(models.Model):

    animal_list = [
        ('dog', 'dog'),
        ('cat', 'cat'),
        ('fish', 'fish'),
        ('bird', 'bird'),
        ('reptile', 'reptile'),
        ('other', 'other'),]
    
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=animal_list, default='other')
    fed = models.BooleanField(default=False)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='animals')
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)