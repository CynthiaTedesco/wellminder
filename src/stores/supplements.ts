import {
  supplementService,
  type Supplement,
} from '@/services/supplementService.ts';
import { defineStore } from 'pinia';

export const useSupplementStore = defineStore('supplements', {
  state: () => ({
    supplements: [] as Supplement[],
  }),

  actions: {
    load() {
      this.supplements = supplementService.getAll();
    },

    add(supplement: Supplement) {
      supplementService.save(supplement);
      this.load();
    },

    update(id: string, updates: Partial<Supplement>) {
      supplementService.update(id, updates);
      this.load();
    },

    remove(id: string) {
      supplementService.delete(id);
      this.load();
    },
  },
});
