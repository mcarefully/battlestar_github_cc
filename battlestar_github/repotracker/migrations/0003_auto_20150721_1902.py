# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repotracker', '0002_auto_20150721_1859'),
    ]

    operations = [
        migrations.RenameField(
            model_name='repocomp',
            old_name='members',
            new_name='repos',
        ),
    ]
