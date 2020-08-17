from django.urls import include, path
from rest_framework import routers, authtoken
from . import views


router = routers.DefaultRouter()
router.register(r'events', views.EventsViewSet)
router.register(r'create-user', views.UserCreate)

urlpatterns = [
    path("", include(router.urls)),
    path('generate-api-auth/',authtoken.views.obtain_auth_token),
    path("api-auth/",include('rest_framework.urls',namespace='rest_framework'))    
]