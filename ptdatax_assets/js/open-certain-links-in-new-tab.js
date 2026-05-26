import findLinksAndSetTargets from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@v4.40.0-rc3/taccsite_cms/static/site_cms/js/modules/setTargetForExternalLinks.js';

const links = document.querySelectorAll(
    'a[href*="/core/internal-docs/"]'
);
findLinksAndSetTargets( links, {
    shouldDebug: false,
    shouldFilter: false,
});
