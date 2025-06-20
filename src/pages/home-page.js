// 📁 src/pages/home-page.js
import { LitElement, html, css } from 'lit';

import { FavoritesService } from '../services/favorites-service.js';

import '../components/search-bar.js';
import '../components/filter-panel.js';
import '../components/results-grid.js';
import '../components/character-profile.js';
import '../components/skeleton-card.js';

const API_URL = 'https://api.disneyapi.dev/character';

class HomePage extends LitElement {
  static properties = {
    characters: { type: Array },
    filteredCharacters: { type: Array },
    favorites: { type: Array },
    currentQuery: { type: String },
    isLoading: { type: Boolean },
    error: { type: String },
    selectedCharacter: { type: Object },
  };

  static styles = css`
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .error {
      color: red;
      text-align: center;
      padding: 2rem;
    }
  `;

  constructor() {
    super();
    this.characters = [];
    this.filteredCharacters = [];
    this.favorites = FavoritesService.get();
    this.currentQuery = '';
    this.isLoading = false;
    this.error = '';
    this.selectedCharacter = null;
    this._filtersInitialized = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchCharacters();
  }

  async _fetchCharacters() {
    this.isLoading = true;
    this.error = '';
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      this.characters = data.data || [];
      this.filteredCharacters = [...this.characters];
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load characters. Try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  _onSearchChanged(e) {
    this.currentQuery = e.detail;
    this._applyFilters();
  }

  _onFilterChanged() {
    this._applyFilters();
  }

  _applyFilters() {
    const filterPanel = this.shadowRoot.querySelector('filter-panel');
    const filters = filterPanel?.getFilters() || {};

    this.filteredCharacters = this.characters.filter(char => {
      const query = this.currentQuery.toLowerCase();
      const nameMatch = char.name.toLowerCase().includes(query) ||
        (char.keywords || []).some(k => k.toLowerCase().includes(query));
      const franchiseMatch = filters.franchise ? char.films?.some(f => f.includes(filters.franchise)) : true;
      const roleMatch = filters.role ? char.role === filters.role : true;
      const eraMatch = filters.era ? char.era === filters.era : true;
      return nameMatch && franchiseMatch && roleMatch && eraMatch;
    });
  }

  _toggleFavorite(e) {
    this.favorites = FavoritesService.toggle(e.detail);
  }

  _onCharacterClick(char) {
    this.selectedCharacter = char;
  }

  updated(changed) {
    if (changed.has('selectedCharacter')) {
      document.body.style.overflow = this.selectedCharacter ? 'hidden' : '';
    }

    if (!this._filtersInitialized && !this.isLoading && this.characters.length > 0) {
      const searchBar = this.shadowRoot.querySelector('search-bar');
      const filterPanel = this.shadowRoot.querySelector('filter-panel');

      if (searchBar) searchBar.dataset = this.characters;

      if (filterPanel) {
        const franchises = [...new Set(this.characters.flatMap(c => c.films || []))];
        const roles = ['Hero', 'Villain', 'Sidekick'];
        const eras = ['Classic', 'Renaissance', 'Modern'];
        filterPanel.setOptions({ franchises, roles, eras });
      }

      this._filtersInitialized = true;
    }
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="skeleton-grid">
          ${Array.from({ length: 8 }).map(() => html`<skeleton-card></skeleton-card>`)}
        </div>
      `;
    }

    if (this.error) {
      return html`<div class="error">${this.error}</div>`;
    }

    return html`
      <search-bar
        .dataset=${this.characters}
        @search-changed=${this._onSearchChanged}
      ></search-bar>

      <filter-panel @filter-change=${this._onFilterChanged}></filter-panel>

      <results-grid
        .characters=${this.filteredCharacters}
        .searchTerm=${this.currentQuery}
        .favorites=${this.favorites}
        @toggle-favorite=${this._toggleFavorite}
        @character-click=${e => this._onCharacterClick(e.detail)}
      ></results-grid>

      ${this.selectedCharacter
        ? html`
            <character-profile
              .character=${this.selectedCharacter}
              @close-profile=${() => (this.selectedCharacter = null)}
            ></character-profile>
          `
        : ''}
    `;
  }
}

customElements.define('home-page', HomePage);
