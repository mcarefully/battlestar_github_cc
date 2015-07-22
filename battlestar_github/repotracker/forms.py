from django.forms import ModelForm, TextInput
from .models import RepoComp

class RepoForm(ModelForm):
    class Meta:
    	model = RepoComp
    	fields = ['repo1_url','repo2_url']
      #widgets = {
      #    'name': TextInput(attrs={'placeholder':'[USER]/[REPOSITORY]'}),
      #}
