<template>
  <div class="flex">
    <button @click="prev">Предыдущая</button>
    <div class="pages">
      <button v-for="page in pages"
              :key="page.page"
              :style="{
                background: page.active ? '#007aff': null,
                color: page.active ? 'white': 'grey'
              }"
              @click="updatePage(page.page)"
      >{{ page.page }}
      </button>
    </div>
    <button @click="next">Следующая</button>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useTableStore} from "@/store/table";
import {computed} from "vue";

const {pagination} = storeToRefs(useTableStore())
const tableStore = useTableStore()

const pages = computed(() => {
  return Array.from({length: pagination.value.pages},
      (_, i) => {
        if (i + 1 === activePage.value) {
          return {active: true, page: i + 1}
        } else {
          return {active: false, page: i + 1}
        }
      })
})
const activePage = computed(() => pagination.value.currentPage)

const next = async () => {
  if (activePage.value < pagination.value.pages) {
    await tableStore.getCharacters(activePage.value + 1)
  }
}
const prev = async () => {
  if (activePage.value > 1) {
    await tableStore.getCharacters(activePage.value - 1)
  }
}
const updatePage = async (page: number) => {
  await tableStore.getCharacters(page)
}
</script>

<style scoped lang="scss">
.flex {
  width: 700px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    display: block;
    color: #007aff;
    font-size: 16px;
    font-weight: 500;
  }

  .pages {
    display: flex;
    width: 400px;
    overflow-x: auto;
    align-items: center;
    gap: 5px;

    &::-webkit-scrollbar {
      width: 0;
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: white;
    }

    &::-webkit-scrollbar-thumb {
      background: #007aff;
      border-radius: 20px;
    }

    button {
      border-radius: 20px;
      background: none;
      width: 30px;
      height: 30px;
      outline: none;
      border: none;
      cursor: pointer;
      display: block;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
