<script setup lang="ts"></script>

<template>
  <div class="app">
    <nav class="p-4 bg-gray-100 flex gap-4">
      <RouterLink to="/">My stash</RouterLink>
      <RouterLink to="/nutrients">Nutrients</RouterLink>
    </nav>

    <router-view />
  </div>
</template>
