from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<repocomp_id>[0-9]+)/results/$', views.results, name='results'),
]