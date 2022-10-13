from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    # FP-1894: Do not support custom form at final URL yet
    # path('register/request-to-submit/', include('apps.submission_form.urls', namespace='apcd'))
    path('register/request-to-submit-form/', include('apps.submission_form.urls', namespace='apcd'))
]
