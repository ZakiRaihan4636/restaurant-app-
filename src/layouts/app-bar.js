class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar">
      <div class="logo">
        <a href="">
          <img src="icons/logo.png" alt="Liceria Logo">
          <span>KULINERA</span>
        </a>
      </div>
      <button class="drawer" aria-label="button drawer"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
          fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg></button>
      <ul class="nav__list">
        <li><a href="/#">Home</a></li>
        <li><a href="#/favorite">Favorites</a></li>
        <li><a href="https://github.com/ZakiRaihan4636" target="_blank" rel="noreferrer">About Us</a></li>
      </ul>
    </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
