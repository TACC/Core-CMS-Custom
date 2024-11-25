# APCD

https://txapcd.org/

An extension of the [Core CMS](https://github.com/TACC/Core-CMS) project

## Basics

See [Core-CMS-Custom](../README.md).


## Build

1. cd to acpd-cms
2. run make build
3. run make start
4. cd to apcd_cms/src/client
5. run npm ci
6. run npm run build
7. run npm run dev
8. Make code changes and observe changes live in browser.


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
	
3. Update apcd_cms/src/client/src/main.tsx:
    - add import for your component
    - update componentMap to add the 
	

### Template

* Update the first line: standard.html to use this {% extends "apcd_cms/templates/standard.html" %}
* Add a div element where the component will render, Example: (make the id name distinct)
   <div id="list-registrations-root"></div>

