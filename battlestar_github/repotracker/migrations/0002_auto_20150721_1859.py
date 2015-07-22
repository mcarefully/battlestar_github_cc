# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repotracker', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comparison',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('repo', models.ForeignKey(to='repotracker.Repo')),
            ],
        ),
        migrations.CreateModel(
            name='RepoComp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('members', models.ManyToManyField(to='repotracker.Repo', through='repotracker.Comparison')),
            ],
        ),
        migrations.AddField(
            model_name='comparison',
            name='repoComp',
            field=models.ForeignKey(to='repotracker.RepoComp'),
        ),
    ]
