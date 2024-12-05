/* TODO: After deploy of Core-CMS version that has https://github.com/TACC/Core-CMS/pull/902, change this snippet to load `/static/site_cms/js/modules/setTargetForExternalLinks.js` */
import findLinksAndSetTargets from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@dce8fbc2/taccsite_cms/static/site_cms/js/modules/setTargetForExternalLinks.js';

const links = document.querySelectorAll(
    'a[href*="/core/internal-docs/"]'
);
findLinksAndSetTargets( links, {
    shouldDebug: window.DEBUG,
    shouldFilter: false,
});
