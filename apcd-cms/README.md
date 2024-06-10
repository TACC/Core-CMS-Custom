# APCD

https://txapcd.org/

An extension of the [Core CMS](https://github.com/TACC/Core-CMS) project

## Basics

See [Core-CMS-Custom](../README.md).


## Build

1. cd to apcd-cms/src/client
2. run npm ci.
3. Make code changes
4. cd to apcd-cms/src
5. run make build.
6. make start


## Converting existing page to react based page

### Backend

1. Update urls.py
   + Make the default page return as TemplateView.as_view(template_name='<template_name')
   + Add api end points. These endpoints are used in client.

2. Update views.py
   
   + import JsonResponse
   + remove Template building
   + Adjust context to return Json.
   + send JsonResponse
   
   
   
### Client

1. Define hook
    + Add method to retrieve data from server
	+ Add types in index.ts
	
2. Defining component
    - Add one or more component as tsx file.
    - Export the component
	- Add exports in index.ts
	
3. Define library method for initializing your method
    - export it.
	

### Template

Use a block like this at the top of the template:

```
{% block extra_js %}
<script type="module">
import { <your_component_method> } from "{% static 'apcd-components.es.js' %}";
your_component_method();
</script>
{% endblock %}
```

Replace <your_component_method> with your component.
