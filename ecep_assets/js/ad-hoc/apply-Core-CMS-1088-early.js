// To apply TACC/Core-CMS#1088 before deploy
// https://github.com/TACC/Core-CMS/pull/1088/
import updateEmailLinkHrefs from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@eb89155/taccsite_cms/static/site_cms/js/modules/updateEmailLinkHrefs.js';

const scopeElement = document.getElementById('cms-content');
const fakeText = '__REMOVE_THIS__';

updateEmailLinkHrefs(scopeElement, fakeText, {
    user: 'data-user',
    domain: 'data-domain',
    subject: 'data-subject',
    body: 'data-body'
});
