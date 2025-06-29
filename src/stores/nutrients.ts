import { nutrientService } from '@/services/nutrientsService';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Nutrient } from '../types';

export const useNutrientStore = defineStore('nutrients', () => {
  const nutrients = ref<Nutrient[]>([]);

  function load() {
    nutrients.value = nutrientService.getAll();
  }

  function add(nutrient: Nutrient) {
    nutrientService.save(nutrient);
    load();
  }

  function update(id: string, updates: Partial<Nutrient>) {
    nutrientService.update(id, updates);
    load();
  }

  function remove(id: string) {
    nutrientService.delete(id);
    load();
  }

  return {
    nutrients,
    load,
    add,
    update,
    remove,
  };
});
