# 🏰 Disney Character Explorer

A web application built using **Lit (Web Components)** and **Vanilla JavaScript**, allowing users to explore Disney characters, filter them by roles, franchises, and eras, and manage favorites with smooth UI performance and modular design.

---

## 📖 Project Overview

The **Disney Character Explorer** lets users search and explore characters from Disney’s rich universe. Users can:

- View character details in a beautiful card layout  
- Search with autocomplete suggestions  
- Filter by franchise, role, and era  
- Favorite characters and view them in a separate list  
- Enjoy a fast, responsive interface even with large datasets

---

## 🚀 Features

✅ Search Disney characters with intelligent suggestions  
✅ Filter results using roles, franchises, and eras  
✅ View detailed profiles in modals  
✅ Add or remove favorite characters  
✅ Modular component-based architecture using Web Components (Lit)  
✅ Fast performance with pagination and lazy rendering  

---

## 🧱 Tech Stack

**Frontend:**

- [Lit](https://lit.dev) – Web Components
- Vanilla JavaScript (ES Modules)
- Tailwind CSS (optional for styling)
- [Disney API](https://disneyapi.dev/) – Character data source

**Testing:**

- `@open-wc/testing` + `@web/test-runner` – Unit tests

---

## 🏁 Getting Started

### 🔹 Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- npm

### 🔹 Clone the Repository

```bash
git clone https://github.com/indradev07/disney.git
cd disney

## 🔹 Install & Run

```bash
npm install
npm run dev

Visit the app at: http://localhost:5173


---

## 📂 Project Structure

disney-character-explorer/
│
├── public/
│   └── index.html                # Entry HTML file
│
├── src/
│   ├── components/               # All Lit web components
│   │   ├── character-card.js
│   │   ├── results-grid.js
│   │   ├── filter-panel.js
│   │   ├── search-bar.js
│   │   ├── favorites-panel.js
│   │   ├── character-profile.js
│   │   └── skeleton-card.js
│
│   ├── pages/
│   │   ├── home-page.js
│   │   └── favorites-page.js
│
│   ├── services/
│   │   └── favorites-service.js
│
├── index.js                      # App entry point
├── README.md
└── package.json


🧩 Component Breakdown

<search-bar> – Autocomplete search input with keyword highlighting
<filter-panel> – Dropdowns for role, franchise, and era filtering
<character-card> – Card UI with image, name, and favorite toggle
<results-grid> – Paginated grid of characters with empty/fallback states
<favorites-panel> – Grid of saved favorites
<character-profile> – Modal for detailed character info
<skeleton-card> – UI placeholder while loading

🧠 Filter Architecture

<filter-panel> manages filter state and emits filter-change events
<home-page> listens and filters characters using:
Franchise: Matches any films[]
Role: Matches role field
Era: Matches era (mocked based on data)
Combined with searchTerm from <search-bar> for multi-filtered results

⚡ UI Performance with Large Data Sets

Pagination in <results-grid> shows 10 characters per page
Skeleton loading cards improve perceived performance
Efficient filtering and searching on in-memory data – no re-fetching
Isolated reactivity via Lit components keeps DOM updates scoped


🛠️ Optional Build

npm run build
This creates a minified output in the dist/ folder.
