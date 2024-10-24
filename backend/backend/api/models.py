from django.db import models
from django.contrib.auth.models import User
import uuid
from django.core.exceptions import ValidationError

class Community(models.Model):

    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User, related_name='communities')
    invite_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Communities"

    def __str__(self):
        return self.name

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
    fed_at = models.DateTimeField(null=True, blank=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='pets')
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if not Community.objects.filter(id=self.community_id).exists():
            raise ValidationError("The specified community does not exist.")
        if self.fed and not self.fed_at:
            raise ValidationError("fed_at must be set if the pet is fed.")

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"