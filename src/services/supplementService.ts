import type { Supplement } from '../types';

const STORAGE_KEY = 'my_stash_supplements';

export const supplementService = {
  getAll(): Supplement[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(newSupplement: Supplement): void {
    const supplements = this.getAll();
    supplements.push(newSupplement);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(supplements));
  },

  update(id: string, updates: Partial<Supplement>) {
    const supplements = this.getAll().map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(supplements));
  },

  delete(id: string) {
    const supplements = this.getAll().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(supplements));
  },
};
