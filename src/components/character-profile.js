// 📁 src/components/character-profile.js
import { LitElement, html, css } from 'lit';

class CharacterProfile extends LitElement {
  static properties = {
    character: { type: Object },
  };

  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }

    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    img {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0.5rem 0;
    }

    .close {
      margin-top: 1rem;
      background: #444;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      cursor: pointer;
      border-radius: 6px;
    }

    .close:hover {
      background-color: #222;
    }
  `;

  _close() {
    this.dispatchEvent(
      new CustomEvent('close-profile', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.character) return html``;

    const { name = 'Unknown', films = [], role = 'Unknown', imageUrl = '' } = this.character;

    return html`
      <div class="modal" @click=${this._close}>
        <div class="card" @click=${(e) => e.stopPropagation()}>
          <img src=${imageUrl || 'https://placehold.co/300x300'} alt=${name} />
          <h2>${name}</h2>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Films:</strong> ${films.length ? films.join(', ') : 'Unknown'}</p>
          <button class="close" @click=${this._close}>Close</button>
        </div>
      </div>
    `;
  }
}

customElements.define('character-profile', CharacterProfile);
