# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repotracker', '0003_auto_20150721_1902'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comparison',
            name='repo',
        ),
        migrations.RemoveField(
            model_name='comparison',
            name='repoComp',
        ),
        migrations.RemoveField(
            model_name='repocomp',
            name='repos',
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo1_fork_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo1_star_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo1_url',
            field=models.CharField(default=b'[USER]/[REPOSITORY]', max_length=200),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo1_watch_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo2_fork_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo2_star_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo2_url',
            field=models.CharField(default=b'[USER]/[REPOSITORY]', max_length=200),
        ),
        migrations.AddField(
            model_name='repocomp',
            name='repo2_watch_ct',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Comparison',
        ),
    ]
