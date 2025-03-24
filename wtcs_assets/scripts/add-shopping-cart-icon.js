const scriptUrl = document.currentScript.src;
function getIconUrl(icon) { return new URL(icon, scriptUrl).href; }

const iconAlt = 'Register';
const linkHref = 'https://professionaled.utexas.edu/s/checkout-TACC';
const iconPath = '../icons/shopping-cart.png';

const iconSrc = getIconUrl(iconPath);

// To mimic the login nav icon HTML, but as a shopping cart icon
// https://github.com/TACC/Core-CMS/blob/v4.25.4/taccsite_cms/templates/nav_portal.html#L5-L10
// https://github.com/TACC/Core-Portal/blob/v3.12.0/server/portal/templates/includes/nav_portal.raw.html#L53-L57
const html = `
  <ul class="navbar-nav s-portal-nav">
    <li class="nav-item">
      <a href="${linkHref}" class="nav-link" target="_blank">
        <img role="button" alt="${iconAlt}" class="icon" src="${iconSrc}">
      </a>
    </li>
  </ul>
`;

document.getElementById('s-search-bar').parentElement.insertAdjacentHTML('beforeend', html);
