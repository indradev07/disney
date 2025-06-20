// src/app/app-shell.js
import { LitElement, html, css } from "lit";
import '../pages/home-page.js';
import '../pages/favorites-page.js';

class AppShell extends LitElement {
  static properties = {
    route: { type: String }
  };

  static styles = css`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 2px 4px #00000014;
      padding: 0.5rem 2rem;
      display: flex;
      align-items: center;
      gap: 8rem;
      z-index: 1000
    }

    .header img {
      height: 40px;
    }

     nav {
      padding: 1rem;
      display: flex;
      gap: 1rem;
      text-transform: capitalize;
    }

    nav a {
      color: #000;
      text-decoration: none;
    }

    nav a.active {
      font-weight: bold;
      text-decoration: underline;
    }

    main {
      margin-top: 4rem;
      padding: 1rem;
    }
    h1 {
      margin-bottom: 1rem;
    }
  `;

  constructor() {
    super();
    this.route = 'home';
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', () => this._onRouteChange());
    this._onRouteChange();
  }

  _onRouteChange() {
    const hash = window.location.hash.replace('#/', '');
    this.route = hash || 'home';
  }

  render() {
    return html`
      <header class="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Disney_logo.png/1600px-Disney_logo.png"
          alt="Disney Logo"
          height="40"
        />
        <nav>
            <a
              href="#/home"
              class="${this.route === "home" ? "active" : ""}"
              >home</a
            >
            <a
              href="#/favorites"
              class="${this.route === "favorites" ? "active" : ""}"
              >Favorites</a
            >
          </nav>
      </header>

      <main>
        <h1>Disney Character</h1>

        ${this.route === 'home'
          ? html`<home-page></home-page>`
          : html`<favorites-page></favorites-page>`}
      </main>
    `;
  }
}

customElements.define('app-shell', AppShell);
