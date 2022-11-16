class UnauthenticatedError extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div hidden id="unauthenticated-message" class="container-sm mt-5">
        <h2>Error: 401 Unauthorized</h2>
        <p>You are not logged in. Please login to be able to perform this action.</p>
    </div>
`;
  }
}

customElements.define("unauthenticated-error", UnauthenticatedError);
