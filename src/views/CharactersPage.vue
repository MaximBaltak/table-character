<template>
  <PaginationComponent/>
  <table class="styled-table">
    <tr>
      <th>
        <div class="actions">
          <p class="text">Имя</p>
          <p v-if="by.byName.active && by.byName.desc"
             @click="sortTable(TypeSort.DEFAULT)" class="desc">по убыванию</p>
          <p v-if="by.byName.active && !by.byName.desc"
             @click="sortTable(TypeSort.BY_NAME,true)" class="asc">по возрастанию</p>
          <p v-if="!by.byName.active && !by.byName.desc"
             @click="sortTable(TypeSort.BY_NAME)" class="no-active">сортировка</p>
        </div>
      </th>
      <th>Дата создания</th>
      <th>
        <div class="actions">
          <p class="text">Род</p>
          <p v-if="by.byGender.active && by.byGender.desc"
             @click="sortTable(TypeSort.DEFAULT)" class="desc">по убыванию</p>
          <p v-if="by.byGender.active && !by.byGender.desc"
             @click="sortTable(TypeSort.BY_GENDER,true)" class="asc">по возрастанию</p>
          <p v-if="!by.byGender.active && !by.byGender.desc"
             @click="sortTable(TypeSort.BY_GENDER)" class="no-active">сортировка</p>
        </div>
      </th>
      <th>
        <div class="actions">
          <p class="text">Вид</p>
          <p v-if="by.bySpecies.active && by.bySpecies.desc"
             @click="sortTable(TypeSort.DEFAULT)" class="desc">по убыванию</p>
          <p v-if="by.bySpecies.active && !by.bySpecies.desc"
             @click="sortTable(TypeSort.BY_SPECIES,true)" class="asc">по возрастанию</p>
          <p v-if="!by.bySpecies.active && !by.bySpecies.desc"
             @click="sortTable(TypeSort.BY_SPECIES)" class="no-active">сортировка</p>
        </div>
      </th>
      <th>Статус</th>
      <th>Тип</th>
    </tr>
    <tr v-for="character in sortCharacters" :key="character.id">
      <td>
        <div class="image">
          <img :src="character.image" alt="logo">
          <p>{{ defaultValue(character.name, '-') }}</p>
        </div>
      </td>
      <td>{{ moment(character.created).format('DD.MM.YYYY') }}</td>
      <td>{{ defaultValue(character.gender, '-') }}</td>
      <td>{{ defaultValue(character.species, '-') }}</td>
      <td>{{ defaultValue(character.status, '-') }}</td>
      <td>{{ defaultValue(character.type, '-') }}</td>
    </tr>
  </table>
</template>

<script lang="ts" async setup>
import {storeToRefs} from "pinia"
import {useTableStore} from "@/store/table"
import {defaultValue} from "@/helpers"
import moment from 'moment'
import {TypeSort} from "@/enums/type-sort";
import PaginationComponent from "@/components/PaginationComponent.vue";

const {sortCharacters, by} = storeToRefs(useTableStore())
const tableStore = useTableStore()
const sortTable = (typeSort: number, desc?: boolean) => {
  tableStore.sortTable(typeSort, desc)
}
await tableStore.getCharacters(1)
</script>

<style scoped lang="scss">
.styled-table {
  width: 1000px;
  margin: 0 auto;
  border-collapse: collapse;

  th {
    background-color: rgba(0, 172, 255, 0.1);
    padding: 8px;
    width: 100px;
  }

  td {
    text-align: center;
    padding: 8px;
    width: 100px;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 0, 0, 0.1);
  }

}

.image {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px;

  img {
    width: 60px;
    height: 60px;
  }
}

.actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;

  p {
    font-weight: 700;
  }

  .asc {
    margin: 0;
    color: green;
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;
  }

  .desc {
    margin: 0;
    color: red;
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;
  }

  .no-active {
    margin: 0;
    color: darkgray;
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;
  }

}
</style>
