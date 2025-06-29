<script setup lang="ts">
import { useNutrientStore } from '@/stores/nutrients';
import { v4 as uuid } from 'uuid';
import { onMounted, ref } from 'vue';

const store = useNutrientStore();
onMounted(() => store.load());

const name = ref('');
const otherNames = ref('');
const type = ref<'vitamin' | 'mineral' | 'other'>('vitamin');
const unit = ref<'mg' | 'g' | 'μg'>('mg');

const addNutrient = () => {
  store.add({
    id: uuid(),
    name: name.value,
    type: type.value,
    otherNames: otherNames.value,
    defaultUnit: unit.value,
  });

  name.value = '';
  otherNames.value = '';
  type.value = 'vitamin';
  unit.value = 'mg';
};
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">🧪 Manage Nutrients</h1>

    <form @submit.prevent="addNutrient" class="space-y-2">
      <input
        v-model="name"
        placeholder="Nutrient name"
        class="border p-2 w-full"
        required
      />
      <select v-model="type" class="border p-2 w-full">
        <option value="vitamin">Vitamin</option>
        <option value="mineral">Mineral</option>
        <option value="other">Other</option>
      </select>
      <select v-model="unit" class="border p-2 w-full">
        <option value="mg">mg</option>
        <option value="g">g</option>
        <option value="μg">μg</option>
      </select>
      <input
        v-model="otherNames"
        placeholder="Other names"
        class="border p-2 w-full"
      />
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>

    <ul class="mt-4 space-y-1">
      <li v-for="n in store.nutrients" :key="n.id" class="border p-2 rounded">
        <strong>{{ n.name }}</strong> ({{ n.type }} – {{ n.defaultUnit }})
        <span class="italic" v-if="n.otherNames">[{{ n.otherNames }}]</span>
      </li>
    </ul>
  </div>
</template>
