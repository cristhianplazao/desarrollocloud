from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EventsSerializer, UserSerializer
from .models import Events
from django.urls import reverse_lazy
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.views.generic.edit import FormView
from django.contrib.auth import login, logout
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated


class EventsViewSet(viewsets.ModelViewSet):
    permission_clasess = (IsAuthenticated,)
    
    queryset = Events.objects.all().order_by('event_initial_date')
    serializer_class = EventsSerializer    
        

class UserCreate(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class Login(FormView):
    template_name = "login.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy("events:")

