from django.db import models
from django import forms
import uuid
from django.contrib.auth.models import User

class Events(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_name = models.CharField(max_length=255)
    conference = "CONFERENCE"
    seminar = "SEMINAR"
    congress = "CONGRESS"
    course = "COURSE"
    event_category_choices = [
        (conference, "CONFERENCE"),
        (seminar, "SEMINAR"),
        (congress, "CONGRESS"),
        (course, "COURSE")
    ]
    event_category = models.CharField(
        max_length=10,
        choices=event_category_choices,
    )
    event_place = models.CharField(max_length=255)
    event_address = models.CharField(max_length=255)
    event_initial_date = models.DateTimeField()
    event_final_date = models.DateTimeField()
    virtual = "VIRTUAL"
    presencial = "PRESENCIAL"
    event_type_choices = [
        (virtual, "VIRTUAL"),
        (presencial, "PRESENCIAL")
    ]
    event_type = models.CharField(
        max_length=10,
        choices=event_type_choices,
    )
    thumbnail = models.CharField(max_length=255)

# Create your models here.
