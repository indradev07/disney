// 📁 src/components/favorites-panel.js
import { LitElement, html, css } from 'lit';
import './character-card.js';

class FavoritesPanel extends LitElement {
  static properties = {
    favorites: { type: Array }
  };

  static styles = css`
    .grid,
    character-card {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  `;

  constructor() {
    super();
    this.favorites = [];
  }

  render() {
    return html`
      <div class="grid">
        ${this.favorites.map(
          char => html`
            <character-card 
            .character=${char}
            .isFavorite=${this.favorites.some(f => f._id === char._id)}>
            </character-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('favorites-panel', FavoritesPanel);
