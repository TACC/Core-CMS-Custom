from curses.ascii import HT
from django.http import HttpResponse
from django.conf import settings
from django.template import loader


def AddedView(request):
    template = loader.get_template('custom_example/custom_example.html')
    return HttpResponse(template.render({}, request))
