const STORAGE_KEY = 'my_stash_nutrients';

export const nutrientService = {
  getAll(): Nutrient[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(newNutrient: Nutrient): void {
    const nutrients = this.getAll();
    nutrients.push(newNutrient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nutrients));
  },

  update(id: string, updates: Partial<Nutrient>) {
    const nutrients = this.getAll().map((n) =>
      n.id === id ? { ...n, ...updates } : n
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nutrients));
  },

  delete(id: string) {
    const nutrients = this.getAll().filter((n) => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nutrients));
  },
};
