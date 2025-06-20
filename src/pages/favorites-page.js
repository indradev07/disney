// 📁 src/pages/favorites-page.js
import { LitElement, html, css } from 'lit';
import { FavoritesService } from '../services/favorites-service.js';
import '../components/favorites-panel.js';

class FavoritesPage extends LitElement {
  static properties = {
    favorites: { type: Array },
  };

  static styles = css`
    h2 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #666;
      padding: 1rem 0;
    }
  `;

  constructor() {
    super();
    this.favorites = FavoritesService.get();
  }

  _toggleFavorite(e) {
    this.favorites = FavoritesService.toggle(e.detail);
    this.requestUpdate();
  }

  _onCharacterClick(e) {
    this.dispatchEvent(
      new CustomEvent('character-click', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <h2>Your Favorite Characters</h2>
      ${this.favorites.length > 0
        ? html`
            <favorites-panel
              .favorites=${this.favorites}
              @toggle-favorite=${this._toggleFavorite}
              @character-click=${this._onCharacterClick}
            ></favorites-panel>
          `
        : html`<p>No favorite characters saved yet.</p>`}
    `;
  }
}

customElements.define('favorites-page', FavoritesPage);
