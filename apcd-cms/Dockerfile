# TACC/Core-CMS#v3.11.6
FROM taccwma/core-cms:c5bea4c

WORKDIR /code

COPY /src/apps /code/apps
COPY /src/client /code/client
COPY /src/taccsite_custom /code/taccsite_custom
COPY /src/taccsite_cms /code/taccsite_cms

RUN chmod u+x /code/client/build_client.sh && /code/client/build_client.sh
RUN cp /code/client/dist/apcd-components.es.js /code/taccsite_custom/apcd-cms/static/
