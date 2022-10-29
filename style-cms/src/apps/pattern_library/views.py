from django.http import HttpResponse
from django.template import loader


def AddedView(request):
    try:
        # WARNING: This template is not a file in the repo; it is generated
        template = loader.get_template('pattern_library/index.html')
    except loader.TemplateDoesNotExist:
        template = loader.get_template('pattern_library/placeholder.html')
    return HttpResponse(template.render({}, request))
