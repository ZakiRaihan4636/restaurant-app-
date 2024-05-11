import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button,
    drawer,
    content,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Render halaman yang dipilih
    this._content.innerHTML = await page.render();

    // Panggil fungsi afterRender dari halaman yang dipilih
    await page.afterRender();

    // Tambahkan event listener untuk link "Skip to Content"
    const skipToContentLink = document.querySelector('.skip');
    skipToContentLink.addEventListener('click', (event) => {
      event.preventDefault();
      this._focusContent(); // Panggil fungsi untuk fokus ke konten utama
    });
  }

  // Fungsi untuk fokus ke konten utama
  // eslint-disable-next-line class-methods-use-this
  _focusContent() {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.focus(); // Fokus ke elemen konten utama
    }
  }
}

export default App;
