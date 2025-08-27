export class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  render(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .loading {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: .5rem;
          }
          .spinner {
            border: .25rem solid rgba(0, 0, 0, 0.1);
            border-left-color: #fff;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
        <div class="loading">
          <div class="spinner"></div>
          Cargando...
        </div>
      `;
    }
  }
}

customElements.define('loading-spinner', LoadingSpinner);
