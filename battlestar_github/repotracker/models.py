from django.db import models


class Repo(models.Model):
    repo_url = models.CharField(max_length=200)

    def __str__(self):              # __unicode__ on Python 2
        return self.repo_url


class RepoComp(models.Model):
    repo1_url = models.CharField(max_length=200)
    repo1_star_ct = models.IntegerField(default=0)
    repo1_watch_ct = models.IntegerField(default=0)
    repo1_fork_ct = models.IntegerField(default=0)

    repo2_url = models.CharField(max_length=200)
    repo2_star_ct = models.IntegerField(default=0)
    repo2_watch_ct = models.IntegerField(default=0)
    repo2_fork_ct = models.IntegerField(default=0)

    def __str__(self):              # __unicode__ on Python 2
      return self.repo2_url

