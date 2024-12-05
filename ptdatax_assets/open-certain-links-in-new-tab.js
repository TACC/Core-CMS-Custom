/* TODO: After deploy of Core-CMS v4.21.0, load script from `/static/site_cms/js/modules/setTargetForExternalLinks.js` */
import findLinksAndSetTargets from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@v4.21.0/taccsite_cms/static/site_cms/js/modules/setTargetForExternalLinks.js';

const links = document.querySelectorAll(
    'a[href*="/core/internal-docs/"]'
);
findLinksAndSetTargets( links, {
    shouldDebug: window.DEBUG,
    shouldFilter: false,
});
