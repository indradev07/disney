// 📁 src/components/skeleton-card.js
import { LitElement, html, css } from 'lit';

class SkeletonCard extends LitElement {
  static styles = css`
    .skeleton {
      background-color: #e0e0e0;
      border-radius: 10px;
      padding: 1rem;
      width: 200px;
      height: 300px;
      display: flex;
      flex-direction: column;
      animation: pulse 1.2s infinite ease-in-out;
    }

    .image {
      width: 100%;
      height: 60%;
      background: #ccc;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    .line {
      height: 12px;
      background: #ccc;
      border-radius: 6px;
      margin: 0.3rem 0;
      width: 80%;
    }

    .line.short {
      width: 50%;
    }

    @keyframes pulse {
      0% {
        background-color: #e0e0e0;
      }
      50% {
        background-color: #f5f5f5;
      }
      100% {
        background-color: #e0e0e0;
      }
    }
  `;

  render() {
    return html`
      <div class="skeleton">
        <div class="image"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line short"></div>
      </div>
    `;
  }
}

customElements.define('skeleton-card', SkeletonCard);
