export class CardsContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
          gap: 1.5rem;
          padding: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        ::slotted(user-card),
        ::slotted(app-card) {
          max-width: 20rem;
          margin: 0 auto;
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('cards-container')) {
  customElements.define('cards-container', CardsContainer);
}
