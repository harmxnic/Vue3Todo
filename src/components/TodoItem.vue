<template>
  <li class="todo-item">
    <div class="todo-item__head">
      <div class="todo-item__title">{{ item.title }}</div>
      <div class="todo-item__actions">
        <router-link
          class="todo-item__edit"
          :to="{ name: 'todo', params: { id: item.id } }"
        >
          <IconEdit />
        </router-link>
        <button
          class="todo-item__delete"
          @click="$emit('deleteItem', item.id)"
        >
          <IconDelete />
        </button>
      </div>
    </div>
    <ul class="todo-item__subitems subitems">
      <TodoSubItem
        v-for="subItem in item.items"
        :key="subItem.id"
        :item="subItem"
        @changeChecked="changeChecked"
      />
    </ul>
  </li>
</template>

<script setup>
import TodoSubItem from '@/components/TodoSubItem';
import IconDelete from '@/components/IconDelete';
import IconEdit from '@/components/IconEdit';

import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['deleteItem']);

const changeChecked = ({subItemId, checked}) => {
  store.commit('changeChecked', {itemId: props.item.id, subItemId, checked})
}
</script>

<style lang="scss">
.todo-item {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em;
    font-size: 1.2em;
    font-weight: 600;
    border-bottom: 1px solid indianred;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  &__edit, &__delete {
    height: 18px;
    border: none;
    background: transparent;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.subitems {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  padding-left: 1em;
  margin-top: 1em;
}
</style>
