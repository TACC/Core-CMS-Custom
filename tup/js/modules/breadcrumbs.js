/* TODO: Try to programmatically only perform if link is a redirect */
/* TODO: Integrate into Core-CMS (not Core-Styles):
        - …/css/src/imports/trumps/s-breadcrumbs.css
        - …/js/modules/breadcrumbs.js
*/
/**
 * To "disable" top-level CMS menu nav links in breadcrumbs
 * (because they all are always set to redirect to a child)
 */
const link = document.querySelector(
  '.s-breadcrumbs:is(nav) li:nth-of-type(2) a'
);
const isAppropriatePage = window.location.pathname.search('/systems/') == -1;

if (link && isAppropriatePage) {
  link.removeAttribute('href');
}
