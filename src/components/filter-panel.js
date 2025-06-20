// 📁 src/components/filter-panel.js
import { LitElement, html, css } from 'lit';

class FilterPanel extends LitElement {
  static properties = {
    options: { type: Object },
    selected: { type: Object }
  };

  static styles = css`
    .panel {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 1rem 0 2rem;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      min-width: 150px;
    }

    label {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    select {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
    }
  `;

  constructor() {
    super();
    this.options = { franchises: [], roles: [], eras: [] };
    this.selected = { franchise: '', role: '', era: '' };
  }

  render() {
    return html`
      <div class="panel">
        ${this._renderSelect('franchise', 'Franchise', this.options.franchises, this.selected.franchise)}
        ${this._renderSelect('role', 'Role', this.options.roles, this.selected.role)}
        ${this._renderSelect('era', 'Era', this.options.eras, this.selected.era)}
      </div>
    `;
  }

  _renderSelect(name, label, items, selectedValue) {
    return html`
      <div class="filter-group">
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}" @change=${this._onFilterChange}>
          <option value="">All</option>
          ${items.map(
            (val) => html`
              <option value="${val}" ?selected=${selectedValue === val}>${val}</option>
            `
          )}
        </select>
      </div>
    `;
  }

  _onFilterChange(e) {
    const { name, value } = e.target;
    this.selected = { ...this.selected, [name]: value };
    this.requestUpdate(); // ensures UI re-renders with latest selected values

    this.dispatchEvent(
      new CustomEvent('filter-change', {
        detail: this.selected,
        bubbles: true,
        composed: true
      })
    );
  }

  // Optional helper methods
  getFilters() {
    return this.selected;
  }

  setOptions(options) {
    this.options = options;
  }
}

customElements.define('filter-panel', FilterPanel);
