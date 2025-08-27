export class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['title'];
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value: string) {
    this.setAttribute('title', value);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--card-background, var(--color-white));
          padding: var(--card-padding, 1.5rem);
          border-radius: .75rem;
          box-shadow: 0 .25rem .625rem rgba(0,0,0,0.08);
        }

        .title {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-color, var(--color-accent));
        }

        .content {
          font-size: 0.9rem;
          color: var(--text-color, var(--color-accent));
          display: flex;
        }

        ::slotted(button[slot="action"]) {
          align-self: flex-end;
          background: var(--color-accent-dark);
          color: var(--color-accent);
          padding: 0.5rem 1rem;
          border-radius: .5rem;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s ease;
        }

        ::slotted(button[slot="action"]:hover) {
          background: var(--color-accent);
        }
      </style>
      <section class="card">
        <span class="title">${this.title}</span>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <slot name="action"></slot>
      </section>
    `;
  }
}

customElements.define('app-card', AppCard);
