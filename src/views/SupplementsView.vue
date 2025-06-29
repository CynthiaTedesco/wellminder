<script setup lang="ts">
import { useNutrientStore } from '@/stores/nutrients';
import { useSupplementStore } from '@/stores/supplements';
import { Supplement } from '@/types';
import { v4 as uuid } from 'uuid';
import { onMounted, ref } from 'vue';

const store = useSupplementStore();
const nutrientStore = useNutrientStore();

store.load();

const supplements = store.supplements;

const newSupplement = ref<Supplement>({
  id: '',
  name: '',
  brand: '',
  category: 'vitamin',
  form: 'pill',
  doses: [{ nutrient: '', amount: 0, unit: 'mg' }],
  schedule: {
    days: [],
    timeOfDay: '',
    condition: '',
  },
  notes: '',
  createdAt: '',
});

const addDoseField = () => {
  newSupplement.value.doses.push({
    nutrient: '',
    amount: 0,
    unit: 'mg',
  });
};

const getNutrientName = (id: string) => {
  debugger;
  return nutrientStore.nutrients.find((n) => n.id === id)?.name || 'Unknown';
};

const addNewSupplement = () => {
  const now = new Date().toISOString();
  store.add({
    ...newSupplement.value,
    id: uuid(),
    createdAt: now,
  });
  // Reset form
  newSupplement.value = {
    id: '',
    name: '',
    brand: '',
    category: 'vitamin',
    form: 'pill',
    doses: [{ nutrient: '', amount: 0, unit: 'mg' }],
    schedule: {
      days: [],
      timeOfDay: '',
      condition: '',
    },
    notes: '',
    createdAt: '',
  };
};

onMounted(() => {
  nutrientStore.load();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">📦 MyStash</h1>

    <form @submit.prevent="addNewSupplement" class="space-y-2">
      <input
        v-model="newSupplement.name"
        placeholder="Name"
        class="border p-2 w-full"
        required
      />

      <input
        v-model="newSupplement.brand"
        placeholder="Brand"
        class="border p-2 w-full"
        required
      />

      <select v-model="newSupplement.category" class="border p-2 w-full">
        <option value="vitamina">Vitamin</option>
        <option value="mineral">Mineral</option>
        <option value="otro">Otro</option>
      </select>

      <select v-model="newSupplement.form" class="border p-2 w-full">
        <option value="cápsula">Pill</option>
        <option value="líquido">Liquid</option>
        <option value="polvo">Powder</option>
        <option value="otro">Other</option>
      </select>

      <div>
        <label class="font-semibold">Doses:</label>
        <div
          v-for="(dose, index) in newSupplement.doses"
          :key="index"
          class="flex gap-2 mb-1"
        >
          <select v-model="dose.nutrient" class="border p-2 rounded w-full">
            <option disabled value="">Select nutrient</option>
            <option
              v-for="n in nutrientStore.nutrients"
              :key="n.id"
              :value="n.id"
            >
              {{ n.name }} ({{ n.defaultUnit }})
            </option>
          </select>

          <input
            v-model.number="dose.amount"
            type="number"
            min="0"
            step="0.1"
            class="border p-1 w-20"
            placeholder="0"
          />

          <select v-model="dose.unit" class="border p-1 w-16">
            <option value="mg">mg</option>
            <option value="g">g</option>
            <option value="μg">μg</option>
          </select>
        </div>

        <button
          type="button"
          @click="addDoseField"
          class="text-blue-600 text-sm underline mt-1"
        >
          + Add nutrient
        </button>
      </div>

      <input
        v-model="newSupplement.notes"
        placeholder="Notes"
        class="border p-2 w-full"
      />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>

    <div class="mt-6">
      <h2 class="text-xl font-semibold">My stash:</h2>
      <ul class="mt-2 space-y-1">
        <li v-for="s in supplements" :key="s.id" class="border p-2 rounded">
          <strong>{{ s.name }} - {{ s.brand }}</strong> -
          <span v-for="dose in s.doses"
            >[{{ getNutrientName(dose.nutrient) }}]</span
          >
          ({{ s.category }})
        </li>
      </ul>
    </div>
  </div>
</template>
