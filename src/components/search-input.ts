export class SearchInput extends HTMLElement {
  private input!: HTMLInputElement;
  private timer?: ReturnType<typeof setTimeout>;
  private controller?: AbortController;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        input {
          border: 2px solid var(--color-accent-dark);
          border-radius: 0.25rem;
          padding: 0.5rem;
          width: 20rem;
        }
      </style>
      <input type="text" placeholder="Escribe un nombre de usuario" />
    `;
    this.input = this.shadowRoot!.querySelector('input')!;
  }

  addEvents() {
    this.input.addEventListener('input', (event: Event) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const userId = this.input.value.trim();
        if (!userId) return;
        this.fetchUser(userId);
      }, 500);
    });
  }

  fetchUser(userId: string) {
    this.controller?.abort();
    this.controller = new AbortController();
    this.dispatchEvent(
      new CustomEvent('loading', { detail: true, bubbles: true, composed: true })
    );
    fetch(`https://api.github.com/users/${userId}`, { signal: this.controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Usuario no encontrado');
        return res.json();
      })
      .then((detail) => {
        this.dispatchEvent(
          new CustomEvent('user-info', { detail, bubbles: true, composed: true })
        );
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        this.dispatchEvent(
          new CustomEvent('error', { detail: err.message, bubbles: true, composed: true })
        );
      })
      .finally(() => {
        this.dispatchEvent(
          new CustomEvent('loading', { detail: false, bubbles: true, composed: true })
        );
      });
  }

}

customElements.define('search-input', SearchInput);
