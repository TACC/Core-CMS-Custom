const alt = 'Register';
const url = 'https://professionaled.utexas.edu/s/checkout-TACC';
const icon = 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@feat/wtcs-shopping-cart-icon/wtcs_assets/icons/shopping-cart.png';

// To mimic the login nav icon HTML, but as a shopping cart icon
// https://github.com/TACC/Core-CMS/blob/v4.25.4/taccsite_cms/templates/nav_portal.html#L5-L10
// https://github.com/TACC/Core-Portal/blob/v3.12.0/server/portal/templates/includes/nav_portal.raw.html#L53-L57
const html = `
  <ul class="navbar-nav s-portal-nav">
    <li class="nav-item">
      <a href="${url}" class="nav-link" target="_blank">
        <img role="button" alt="${alt}" class="icon" src="${icon}">
      </a>
    </li>
  </ul>
`;

document.getElementById('s-search-bar').parentElement.insertAdjacentHTML('beforeend', html);
