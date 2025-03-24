const icon = document.createElement('img');
      icon.role = 'button';
      icon.alt = 'Register';
      icon.classList.add('icon');
      icon.src = 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@feat/wtcs-shopping-cart-icon/wtcs_assets/icons/shopping-cart.png';
      // icon.src = '../icons/shopping-cart.png';

const link = document.createElement('a');
      link.href = 'https://professionaled.utexas.edu/s/checkout-TACC';
      link.classList.add('nav-link');
      link.target = '_blank';
      link.appendChild(icon);

const item = document.createElement('li');
      item.classList.add('nav-item');
      item.appendChild(link);

const list = document.createElement('ul');
      list.classList.add('navbar-nav', 's-portal-nav');
      list.appendChild(item);

document.getElementById('s-search-bar').parentElement.appendChild(list);
