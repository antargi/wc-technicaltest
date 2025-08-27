import './app-card';

export class ErrorCard extends HTMLElement {
  private message: string = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set error(msg: string) {
    this.message = msg;
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .icon {
          font-size: 2rem;
          color: #ef4444; /* rojo principal */
        }

        .message {
          font-size: 0.95rem;
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-align: center;
        }
      </style>

      <app-card title="Error">
        <div slot="content" class="content">
          <span class="icon">⚠️</span>
          <div class="message">${this.message || 'Ha ocurrido un error inesperado'}</div>
        </div>
      </app-card>
    `;
  }
}

if (!customElements.get('error-card')) {
  customElements.define('error-card', ErrorCard);
}