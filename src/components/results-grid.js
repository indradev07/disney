// 📁 src/components/results-grid.js
import { LitElement, html, css } from 'lit';
import './character-card.js';

const PAGE_SIZE = 10;

class ResultsGrid extends LitElement {
  static properties = {
    characters: { type: Array },
    searchTerm: { type: String },
    currentPage: { type: Number },
    favorites: { type: Array }
  };

  static styles = css`
    .grid, character-card {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      align-items: center;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      background: #1976d2;
      color: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 1rem;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .no-results {
      text-align: center;
      padding: 3rem 1rem;
      color: #555;
    }

    .no-results img {
      max-width: 180px;
      margin-bottom: 1.5rem;
      opacity: 0.8;
    }

    .no-results h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .no-results p {
      font-size: 1rem;
      color: #777;
    }
  `;

  constructor() {
    super();
    this.characters = [];
    this.searchTerm = '';
    this.currentPage = 1;
    this.favorites = [];
  }

  updated(changed) {
    if (changed.has('characters')) {
      this.currentPage = 1;
    }
  }

  get paginatedCharacters() {
    const start = (this.currentPage - 1) * PAGE_SIZE;
    return this.characters.slice(start, start + PAGE_SIZE);
  }

  _onToggleFavorite(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('toggle-favorite', {
      detail: e.detail,
      bubbles: false,
      composed: true
    }));
  }

  _onCharacterClick(e) {
    this.dispatchEvent(new CustomEvent('character-click', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _renderPagination() {
    const totalPages = Math.ceil(this.characters.length / PAGE_SIZE);
    if (totalPages <= 1) return null;

    return html`
      <div class="pagination">
        <button
          ?disabled=${this.currentPage === 1}
          @click=${() => this.currentPage--}
        >Previous</button>

        <span>Page ${this.currentPage} of ${totalPages}</span>

        <button
          ?disabled=${this.currentPage === totalPages}
          @click=${() => this.currentPage++}
        >Next</button>
      </div>
    `;
  }

  render() {
    if (!this.characters.length) {
      return html`
        <div class="no-results">
          <img src="https://www.pngkey.com/png/detail/672-6722829_no-result-found.png" alt="No characters found" />
          <h3>No characters match your search.</h3>
          <p>Try different keywords or reset your filters.</p>
        </div>
      `;
    }

    return html`
      <div class="grid">
        ${this.paginatedCharacters.map(char => html`
          <character-card
            .character=${char}
            .highlightText=${this.searchTerm}
            .isFavorite=${this.favorites.some(f => f._id === char._id)}
            @toggle-favorite=${this._onToggleFavorite}
            @character-click=${this._onCharacterClick}
          ></character-card>
        `)}
      </div>
      ${this._renderPagination()}
    `;
  }
}

customElements.define('results-grid', ResultsGrid);
