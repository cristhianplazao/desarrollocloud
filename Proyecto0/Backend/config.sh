pip install django
django-admin startproject Proyecto0
"Config in Proyecto0/Proyecto0/settings.py ALLOWED HOST = ['*']"
python3 Proyecto0/manage.py runserver 0.0.0.0:8080
python3 Proyecto0/manage.py startapp api
"Config in Proyecto0/Proyecto0/settings.py INSTALLED_APPS = ['api.apps.ApiConfig'],"
python3 Proyecto0/manage.py migrate
python3 Proyecto0/manage.py createsuperuser
"If run the server in /admin we can access to the admin panel of Django"
"After modify the models.py file we can continue and register de model in api/admin"
python3 Proyecto0/manage.py makemigrations
python3 Proyecto0/manage.py migrate
"This previous command create the model into the Django database"
"After this, we can create objects of each model in the admin app directly or rest but for rest we'd do..."
pip install djangorestframework
"Config in Proyecto0/Proyecto0/settings.py INSTALLED_APPS = ['rest_framework'],"
"A serializer.py file has been created with all necessary models imported
and a HyperlinkedModelSerializer class and Meta subclass also created for link
the model with REST"
"For display the JSON Format of our REST we must create a viewsets using the
the rest_framework.viewsets method, after that a class querying the model, all this
in view.py file"
"The purpose of this step is to point a URL at the viewset just created in Proyecto0/urls.py"
"In this step is necessary for give the instructions to Django on how to route this URL
if we see in Proyecto0/urls.py we pointed to api.urls. The configuration in this step is on
api/urls.py"
"*** CADA QUE SE HAGA UN CAMBIO EN LOS MODELOS ES NECESARIO EJECUTAR makemigrations y migrate ***"
"When a problem with migrations exists.., a solution could be delete the records of migration folder in api folder"
"For authenticated vía rest_framework is necessary modify the settings.py file located in Proyecto0/Proyecto0
adding a REST_FRAMEWORK dictionary"
"Add in urls.py from the project the library authtoken views and path for generat token"
"Also is necessary add the rest_framework.authtoken line in INSTALLED_APPS"
"The TokenGenerated is just for an user of the system.., in this case Token worked for admin Django user no for API's user"