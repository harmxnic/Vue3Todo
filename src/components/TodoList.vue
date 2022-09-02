<template>
  <ul class="todo-list">
    <TodoItem
      v-if="items.length"
      v-for="item in items"
      :key="item.id"
      :item="item"
      @deleteItem="deleteItem"
    />
    <h2
      v-else
      class="todo-list__no-items"
    >
      В списке еще нет Todo записей
    </h2>
  </ul>
  <ModalAccept @accept="acceptDelete" />
</template>

<script setup>
import TodoItem from './TodoItem';
import {useStore} from 'vuex';
import { computed, ref } from 'vue';
import ModalAccept from '@/components/ModalAccept';

const store = useStore();

const items = computed(() => store.state.todoList);

const id = ref(null);

const acceptDelete = () => {
  store.commit('deleteItem', id.value);
  store.commit('toggleModal');
  localStorage.setItem('todoList', JSON.stringify(store.state.todoList));
};

const deleteItem = (itemId) => {
  id.value = itemId;
  store.commit('toggleModal');
};
</script>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 2em;

  &__no-items {
    text-align: center;
    font-size: 1.5em;
  }
}
</style>
