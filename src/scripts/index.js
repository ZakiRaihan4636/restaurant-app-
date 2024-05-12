import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../layouts/app-bar';
import '../layouts/app-footer';
import App from './views/app';
import swRegister from './utils/sw-resgister';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('.drawer'),
  drawer: document.querySelector('.navbar .nav__list'),
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
