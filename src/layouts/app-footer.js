class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer-content">
      <p>Copyright © 2024 - KULINERA</p>
    </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
