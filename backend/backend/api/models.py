from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import uuid
from django.core.exceptions import ValidationError
from django.utils import timezone

class UserProfileManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(email, first_name, last_name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserProfileManager()
    
    def __str__(self):
        return self.email
    
    @property
    def is_active(self):
        return self.deleted_at is None
    
    def delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.deleted_at = None
        self.save()

class Community(models.Model):

    environment_list = [
        ('home', 'home'),
        ('work', 'work'),
        ('other', 'other'),
    ]

    name = models.CharField(max_length=100)
    users = models.ManyToManyField(UserProfile, related_name='communities')
    type = models.CharField(max_length=10, choices=environment_list, default='other')
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
    feed_every = models.DecimalField()
    fed_at = models.DateTimeField(null=True, blank=True)
    fed_by = models.CharField(max_length=100, blank=True, null=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='pets')
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
       if self.fed and not self.fed_at:
            raise ValidationError("fed_at must be set if the pet is fed.")

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"