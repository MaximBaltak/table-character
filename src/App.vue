<template>
  <Suspense>
    <template #fallback>Загрузка...</template>
    <CharactersPage/>
  </Suspense>
</template>

<script setup lang="ts">

import CharactersPage from "@/views/CharactersPage.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
