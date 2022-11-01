FROM taccwma/core-cms:a854352

WORKDIR /code

COPY /src/apps /code/apps
COPY /src/taccsite_custom/style-cms /code/taccsite_custom/style-cms
COPY /src/taccsite_cms /code/taccsite_cms

# Create symlinks to consolidate CSS patterns to read and stylesheets to load
# FAQ: The Node package "fractal" cannot read these from multiple directories
RUN mkdir -p /code/taccsite_ui/libs/patterns &&\
    mkdir -p /code/taccsite_ui/libs/styles &&\
    ln -s /code/taccsite_cms/static/site_cms/css/src/_imports /code/taccsite_ui/libs/patterns/core-cms &&\
    ln -s /code/node_modules/@tacc/core-styles/src/lib/_imports /code/taccsite_ui/libs/patterns/core-styles &&\
    ln -s /code/taccsite_cms/static/site_cms/css/build /code/taccsite_ui/libs/styles/core-cms &&\
    ln -s /code/taccsite_custom /code/taccsite_ui/libs/styles/core-cms-resources

WORKDIR /code/apps/pattern_library
RUN npm ci
RUN npm run build --project="core-cms"
WORKDIR /code
