import findLinksAndSetTargets from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@v4.40.0-rc3/taccsite_cms/static/site_cms/js/modules/setTargetForExternalLinks.js';

const NAV_READY_ATTR  = 'navReady';
const NAV_READY_EVENT = 'cms-nav:ready';

function initLinks() {
  const links = document.querySelectorAll(
    'a[href*="/core/internal-docs/"]'
  );
  findLinksAndSetTargets(links, {
    shouldDebug: false,
    shouldFilter: false,
  });
}

const portalCMSNav = document.getElementById('s-cms-nav');
const isPortalCMSNavAvailable = (
  // Was nav populated before this script ran?
  portalCMSNav.dataset
  && portalCMSNav.dataset[NAV_READY_ATTR] === 'true'
)
const isCMS = (! portalNavForCMS);
const isCMSNavAvailable = (
  isCMS // It is safe to assume nav is availabile
  && isPortalCMSNavAvailable
);

if (isCMSNavAvailable) {
  initLinks();
} else {
  portalCMSNav.addEventListener(NAV_READY_EVENT, initLinks, { once: true });
}
