from django.shortcuts import render, redirect
from rest_framework import viewsets
from .serializers import EventsSerializer, UserSerializer
from .models import Events
from django.urls import reverse_lazy
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.views.generic.edit import FormView
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
#from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
#from rest_framework import status
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.views.generic import ListView

class EventsViewSet(viewsets.ModelViewSet):   
    serializer_class = EventsSerializer
    #permission_classes = (IsAuthenticated,)
    authentication_class = (TokenAuthentication,)
    queryset = Events.objects.all().order_by('event_initial_date')
   
    
    def delete(self, event_id):
        Events.objects.filter(event_id=event_id).delete()
    
    @method_decorator(never_cache)
    def create(self, request,*args,**kwargs):
        response = super(EventsViewSet, self).create(request, *args, **kwargs)
        return HttpResponseRedirect(redirect_to="http://localhost:8080/api/events-all/")

class EventsList(ListView):  
    http_method_names = [u"post",u"get"]
    
    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        value = request.POST.get("delete")
        EventsViewSet.delete(EventsViewSet,value)
        contexto = {
            "events" : list(EventsViewSet.queryset),
            "username" : request.user.username
        }
        return render(request,"events.html", contexto)

    @method_decorator(never_cache)
    def get(self,request,*args,**kwargs):    
        if not request.user.is_authenticated:
            return redirect("login")
        else:       
            contexto = {
                "events" : list(EventsViewSet.queryset.values_list()),
                "username" : request.user.username
            }
            return render(request,"events.html", contexto)  
        

class UserCreate(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    
    template_name = "login.html"
    form_class = UserCreationForm

    def create(self, request,*args,**kwargs):
        response = super(UserCreate, self).create(request, *args, **kwargs)
        return HttpResponseRedirect(redirect_to="http://localhost:8080/login/")

class Register(ListView):
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect("http://localhost:8080/api/events-all/")
        else:
            return render(request, "register.html")    

class Login(FormView):
    template_name = "login.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy('api:events-all')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else: return super(Login,self).dispatch(request,*args,*kwargs)

    def form_valid(self,form):
        user = authenticate(username = form.cleaned_data["username"], password = form.cleaned_data["password"])
        token,_ = Token.objects.get_or_create(user = user)
        if token:
            login(self.request, form.get_user())
            return super(Login,self).form_valid(form)

class Logout(APIView):
    def get(self,request, format=None):
        logout(request)
        return redirect("login")


