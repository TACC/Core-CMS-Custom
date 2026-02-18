/* Add `subject` and `body` to `mailto:` links via attributes sans `data-` */
/* https://github.com/TACC/Core-CMS/blob/v4.38.0/taccsite_cms/templates/assets_core_delayed.html#L12-L22 */
import updateEmailLinkHrefs from '/static/site_cms/js/modules/updateEmailLinkHrefs.js';

const scopeElement = document.getElementById('cms-content');
const fakeText = '';

updateEmailLinkHrefs(scopeElement, fakeText, {
    subject: 'subject',
    body: 'body'
});
