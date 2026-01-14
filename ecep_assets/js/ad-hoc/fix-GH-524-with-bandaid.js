// Remove any `data-user` and `data-domain` attributes from links
// IMPORTANT: After deploy of Core-CMS#1065, delete file (and import of it)
const links = document.querySelectorAll('a[data-user][data-domain]');

links.forEach(link => {
  link.removeAttribute('data-user');
  link.removeAttribute('data-domain');
});
