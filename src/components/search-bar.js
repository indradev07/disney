// 📁 src/components/search-bar.js
import { LitElement, html, css } from 'lit';

class SearchBar extends LitElement {
  static properties = {
    suggestions: { type: Array },
    searchTerm: { type: String },
    dataset: { type: Array }
  };

  static styles = css`
    .autocomplete {
      position: relative;
      width: 100%;
    }

    input {
      width: 60%;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-top: none;
      max-height: 150px;
      overflow-y: auto;
      z-index: 1000;
      border-radius: 0 0 4px 4px;
    }

    .suggestions div {
      padding: 8px;
      cursor: pointer;
    }

    .suggestions div:hover {
      background-color: #f0f0f0;
    }

    mark {
      background: yellow;
    }
  `;

  constructor() {
    super();
    this.suggestions = [];
    this.searchTerm = '';
    this.dataset = [];
  }

  render() {
    return html`
      <div class="autocomplete">
        <input
          type="text"
          .value=${this.searchTerm}
          placeholder="Search characters..."
          @input=${this._onInput}
          @blur=${this._clearSuggestions}
        />

        ${this.suggestions.length > 0
          ? html`
              <div class="suggestions">
                ${this.suggestions.map(
                  (s) => html`
                    <div @click=${() => this._selectSuggestion(s)}>
                      ${this._highlightMatch(s)}
                    </div>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  _onInput(e) {
    const input = e.target.value;
    this.searchTerm = input;

    this.dispatchEvent(
      new CustomEvent('search-changed', {
        detail: input,
        bubbles: true,
        composed: true
      })
    );

    if (input.length > 1 && this.dataset.length > 0) {
      const query = input.toLowerCase();
      const matches = this.dataset.filter((char) => {
        return (
          char.name.toLowerCase().includes(query) ||
          (char.keywords || []).some((kw) => kw.toLowerCase().includes(query))
        );
      });

      const uniqueNames = [...new Set(matches.map((c) => c.name))];
      this.suggestions = uniqueNames.slice(0, 5);
    } else {
      this.suggestions = [];
    }
  }

  _selectSuggestion(name) {
    this.searchTerm = name;
    this.suggestions = [];

    this.dispatchEvent(
      new CustomEvent('search-changed', {
        detail: name,
        bubbles: true,
        composed: true
      })
    );
  }

  _clearSuggestions() {
    setTimeout(() => (this.suggestions = []), 150);
  }

  _highlightMatch(text) {
    if (!this.searchTerm) return text;

    const re = new RegExp(`(${this.searchTerm})`, 'gi');
    const parts = text.split(re);

    return html`${parts.map((part) =>
      part.toLowerCase() === this.searchTerm.toLowerCase()
        ? html`<mark>${part}</mark>`
        : part
    )}`;
  }
}

customElements.define('search-bar', SearchBar);
