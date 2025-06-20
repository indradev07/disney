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
- [Disney API](https://disneyapi.dev/) – Character data source

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
```

## 🔹 Install & Run

```bash
npm install
npm run dev
```

Visit the app at: http://localhost:5173


---

## 📂 Project Structure

```bash
disney/
│           
├── src/
│
│   ├──  app/
│   │   └── app-shell.js            # App entry point
│
│   ├── components/                 # All Lit web components
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
│   ├── main.js                     # App config point
│
├── index.html                      # Entry HTML file
├── README.md
└── package.json
```

---

## 📦 Component Breakdown

This application is built using the Lit library with a focus on modular Web Components, each encapsulating its own logic, styles, and events.

```bash
<app-shell> -   Main shell handling routing (explore / favorites) and rendering pages
<home-page> -   Manages stateful logic like fetching, filtering, and character selection
<search-bar>    -   Autocomplete input with search suggestions and input debouncing
<filter-panel>  -   Select inputs for filtering by franchise, role, and era
<results-grid>  -   Displays a paginated list of character-cards
<character-card>    -   Represents individual character with favorite toggle
<character-profile> -   Modal for showing detailed character view
<favorites-page>    -   Displays saved favorites using favorites-panel
<favorites-panel>   -   Renders favorite characters and handles removal
<skeleton-card> -   Reusable loader shown during API fetch
```
---

## 🧠 Filter Architecture

Filters are declarative and composable. State is derived and applied at runtime via a central filter mechanism inside home-page.

- `<filter-panel>` manages filter state and emits `filter-change` events  
- `<home-page>` listens to these events and applies filtering logic:

  - **Franchise**: Matches any string within the `films[]` array  
  - **Role**: Matches the `role` property (e.g., Hero, Villain, Sidekick)  
  - **Era**: Matches the `era` property (mocked/classified in the dataset)  
  - **Search Term**: Comes from `<search-bar>`,
 
- matched against character `name` and `keywords`

All filters and the search term are **combined together** for efficient in-memory filtering — no additional network requests are made.

---

## 🚀 UI Performance on Large Data Sets

```bash
Pagination in <results-grid> shows 10 characters per page
Skeleton loading cards improve perceived performance
Efficient filtering and searching on in-memory data – no re-fetching
Isolated reactivity via Lit components keeps DOM updates scoped
```

---

## 🛠️ Optional Build

```bash
npm run build
```
This creates a minified output in the dist/ folder.
