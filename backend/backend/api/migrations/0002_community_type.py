# Generated by Django 5.1.2 on 2024-12-10 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='type',
            field=models.CharField(choices=[('home', 'home'), ('work', 'work'), ('other', 'other')], default='other', max_length=10),
        ),
    ]
