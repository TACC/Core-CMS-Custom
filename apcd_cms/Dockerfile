FROM taccwma/core-cms:v4.26.1

WORKDIR /code

COPY /src/apps /code/apps
COPY /src/client /code/client
COPY /src/taccsite_custom /code/taccsite_custom
COPY /src/taccsite_cms /code/taccsite_cms

# install node 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

RUN chmod u+x /code/client/build_client.sh && /code/client/build_client.sh
RUN cp -R /code/client/dist/static/assets/. /code/taccsite_custom/apcd_cms/static/assets/
RUN cp -R /code/client/dist/react-assets.html /code/taccsite_custom/apcd_cms/templates/react-asset.html
