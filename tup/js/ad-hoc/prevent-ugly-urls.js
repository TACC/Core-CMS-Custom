/* SEE: TUP-715 */

const links = document.querySelectorAll(
  'body > :is(header, main, footer) a[target="_blank"]'
);

/* HACK: To revert URL of links that Google changes on hover */
/* FAQ: Google Analytics settings interpret subdomain links as URLs to adjust so it can track navigation */
[...links].forEach(function restoreLinkHrefChangedOnHover(link) {
  const isTACC = link.host.includes('tacc.utexas.edu');

  if (isTACC) {
    let currentHrefVal = link.getAttribute('href');

    link.setAttribute('data-original-href', currentHrefVal);
    link.addEventListener('click', () => {
      const originalHrefVal = link.getAttribute('data-original-href');

      currentHrefVal = link.getAttribute('href');
      if (currentHrefVal !== originalHrefVal) {
        link.setAttribute('href', originalHrefVal);
      }
    });
  }
});
