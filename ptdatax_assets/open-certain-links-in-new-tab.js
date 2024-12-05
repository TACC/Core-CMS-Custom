import findLinksAndSetTargets from '/static/site_cms/js/modules/setTargetForExternalLinks.js';

const links = document.querySelectorAll(
    'a[href*="/core/internal-docs/"]'
);
findLinksAndSetTargets( links, {
    shouldDebug: window.DEBUG,
    shouldFilter: false,
});
