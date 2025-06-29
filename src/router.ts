import NutrientsView from '@/views/NutrientsView.vue';
import SupplementsView from '@/views/SupplementsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'supplements', component: SupplementsView },
  { path: '/nutrients', name: 'nutrients', component: NutrientsView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
