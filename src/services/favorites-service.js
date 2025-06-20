// src/services/favorites-service.js
const FAVORITES_KEY = 'favorites';

export const FavoritesService = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  },

  save(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  },

  toggle(character) {
    const favorites = this.get();
    const exists = favorites.find(c => c._id === character._id);
    const updated = exists
      ? favorites.filter(c => c._id !== character._id)
      : [...favorites, character];
    this.save(updated);
    return updated;
  },

  isFavorite(character) {
    const favorites = this.get();
    return favorites.some(c => c._id === character._id);
  }
};
