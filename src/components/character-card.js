// 📁 src/components/character-card.js
import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
    highlightText: { type: String },
    isFavorite: { type: Boolean },
  };

  static styles = css`
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
      transform: scale(1.03);
      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }

    .details {
      padding: 0 1rem 1rem;
    }

    h3 {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.9rem;
      color: #555;
    }

    .btn {
      --button-size: 30px;
      --default-color: #333;
      --active-color: red;
      --inverse-color: white;
      position: absolute;
      top: 12px;
      right: 12px;
      width: var(--button-size);
      height: var(--button-size);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--inverse-color);
      border-radius: 50%;
      border: 1.5px solid var(--default-color);
      cursor: pointer;
      z-index: 1;
      transition: all 0.2s ease;
    }

    .btn.active {
      background: var(--active-color);
      border-color: var(--active-color);
    }

    .btn .heart-icon {
      width: 60%;
      height: 60%;
      aspect-ratio: 1;
      border-image: radial-gradient(var(--default-color) 69%, transparent 70%) 84.5% / 50%;
      clip-path: polygon(-41% 0, 50% 91%, 141% 0);
    }

    .btn:hover {
      border-color: var(--active-color);
    }

    .btn:hover .heart-icon {
      border-image: radial-gradient(var(--active-color) 69%, transparent 70%) 84.5% / 50%;
      transform: scale(1.1);
    }

    .btn.active .heart-icon {
      border-image: radial-gradient(var(--inverse-color) 69%, transparent 70%) 84.5% / 50%;
    }

    mark {
      background-color: yellow;
    }
  `;

  constructor() {
    super();
    this.character = {};
    this.highlightText = '';
    this.isFavorite = false;
  }

  _highlight(text) {
    if (!this.highlightText) return text;
    const re = new RegExp(`(${this.highlightText})`, 'gi');
    const parts = text.split(re);
    return html`${parts.map(part =>
      part.toLowerCase() === this.highlightText.toLowerCase()
        ? html`<mark>${part}</mark>` : part
    )}`;
  }

  _toggleFavorite(e) {
    e.stopPropagation(); // Prevents click bubbling to card
    this.dispatchEvent(new CustomEvent('toggle-favorite', {
      detail: this.character,
      bubbles: true,
      composed: true,
    }));
  }

  _onCardClick() {
    this.dispatchEvent(new CustomEvent('character-click', {
      detail: this.character,
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const { name = 'Unknown', imageUrl, role = 'Unknown', films = [] } = this.character;

    return html`
      <div class="card" @click=${this._onCardClick}>
        <img src=${imageUrl || 'https://placehold.co/250x250'} alt=${name} />
        <div class="details">
          <h3>${this._highlight(name)}</h3>
          <div class="meta">
            ${films.length ? html`<div><strong>Movie:</strong> ${films[0]}</div>` : ''}
            <div><strong>Role:</strong> ${role}</div>
          </div>
        </div>
        <a
          class=${classMap({ btn: true, active: this.isFavorite })}
          @click=${this._toggleFavorite}
          title="Toggle Favorite"
          aria-label="Favorite"
        >
          <div class="heart-icon"></div>
        </a>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
