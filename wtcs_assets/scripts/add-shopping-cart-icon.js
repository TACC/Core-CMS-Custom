const imgSrc = 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@afbbae/wtcs_assets/icons/shopping-cart.png';
const linkHref = 'https://professionaled.utexas.edu/s/checkout-TACC';
const imgAlt = 'Register';

// To mimic the login nav icon HTML, but as a shopping cart icon
// https://github.com/TACC/Core-CMS/blob/v4.25.4/taccsite_cms/templates/nav_portal.html#L5-L10
// https://github.com/TACC/Core-Portal/blob/v3.12.0/server/portal/templates/includes/nav_portal.raw.html#L53-L57
const html = `
  <ul class="navbar-nav s-portal-nav">
    <li class="nav-item">
      <a
        class="nav-link"
        href="${linkHref}"
        target="_blank"
      >
        <img class="icon" alt="${imgAlt}" src="${imgSrc}" role="button">
      </a>
    </li>
  </ul>
`;

const searchBar = document.getElementById('s-cms-nav');
if (searchBar) {
  searchBar.parentElement.insertAdjacentHTML('beforeend', html);
} else {
  console.error('No `.s-cms-nav` found, so uncertain where to render icon');
}
