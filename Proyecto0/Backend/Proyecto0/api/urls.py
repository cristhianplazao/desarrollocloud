from django.urls import include, path
from rest_framework import routers, authtoken
from . import views


router = routers.DefaultRouter()
router.register(r'events', views.EventsViewSet,basename="events-list")
router.register(r'create-user', views.UserCreate,basename="create-user")

urlpatterns = [
    path("", include(router.urls)),
    path('api-auth/',authtoken.views.obtain_auth_token),
    path("api-auth/",include('rest_framework.urls',namespace='rest_framework')),
    path('events/', views.EventsViewSet, name="events-list")
]