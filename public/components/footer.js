class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
            <a href="terms.html">
              <span class="text-muted">Terms &amp; Conditions</span>
            </a>
        </div>
    </footer>
      `;
  }
}

customElements.define("footer-component", Footer);
