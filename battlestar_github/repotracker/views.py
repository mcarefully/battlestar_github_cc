from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.core.urlresolvers import reverse
from django.views import generic
from django.template import RequestContext, loader

from .models import RepoComp
from .forms import RepoForm


def index(request, pk=None):
  if request.method == 'POST':
      form = RepoForm(request.POST)
      if form.is_valid():
      	  #form.cleaned_data['repo1_url'] #TODO: validate the input we're getting on the repo urls
          #form.cleaned_data['repo2_url'] #TODO: validate the input we're getting on the repo urls
          # process the data in form.cleaned_data as required
          # ...
          repocomp = form.save()
          return HttpResponseRedirect(reverse('results', args=(repocomp.id,)))

  else:
      form = RepoForm()

  return render(request, 'repotracker/index.html', {'form': form})


def results(request, repocomp_id):
    repocomp = get_object_or_404(RepoComp, pk=repocomp_id)
    return render(request, 'repotracker/results.html', {'repocomp': repocomp})
