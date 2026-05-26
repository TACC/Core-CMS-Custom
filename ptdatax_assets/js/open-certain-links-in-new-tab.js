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

const container = document.getElementById('s-cms-nav');

if (!container) {
  // Plain CMS page — no Portal nav injection
  initLinks();
} else if (container.dataset[NAV_READY_ATTR] === 'true') {
  // Nav already populated before this script ran
  initLinks();
} else {
  container.addEventListener(NAV_READY_EVENT, initLinks, { once: true });
}
