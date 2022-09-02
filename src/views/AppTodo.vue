<template>
  <form
    class="todo-item"
    @submit.prevent
  >
    <div class="todo-item__head">
      <div class="todo-item__title">
        <input
          v-if="isEditing"
          type="text"
          v-model="todoTitle"
          @blur="setTodoTitle"
        >
        <span v-else>{{ todoItem.title }}</span>
      </div>
      <div class="todo-item__actions">
        <IconEdit
          class="todo-item__delete"
          @click="store.commit('setEdit', true)"
        />
        <IconDelete
          class="todo-item__delete"
          @click="deleteItem"
        />
      </div>
    </div>
    <ul class="todo-item__subitems subitems">
      <TodoSubItem
        v-if="todoItem.items"
        v-for="subItem in todoItem.items"
        :key="subItem.id"
        :item="subItem"
        @changeChecked="changeChecked"
        @changeTitle="changeTitle"
        @deleteSubItem="deleteSubItem"
      />
      <button
        class="todo-item__add"
        @click="addSubItem"
      >
        <svg viewBox="0 0 455 455">
          <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5
            455,242.5 "/>
        </svg>
      </button>
    </ul>
    <div class="todo-item__btns">
      <button
        class="todo-item__save btn"
        @click="saveChanges"
      >
        Сохранить изменения
      </button>
      <button
        class="todo-item__decline btn"
        @click="declineChanges"
      >
        Отменить редактирование
      </button>
    </div>
    <ModalAccept @accept="acceptAction" />
  </form>
</template>

<script setup>
import TodoSubItem from '@/components/TodoSubItem';
import IconDelete from '@/components/IconDelete';
import IconEdit from '@/components/IconEdit';
import ModalAccept from '@/components/ModalAccept';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { deepClone } from '@/helper';

const store = useStore();
const route = useRoute();
const router = useRouter();
const item = computed(() => store.state.todoList.find(item => item.id === +route.params.id) || {});
const isEditing = computed(() => store.state.isEditing);
const todoTitle = item.value.title ? ref(item.value.title) : ref('');
const initialTodoItem = {
  id: Date.now(),
  title: todoTitle.value || '',
  items: []
};
const todoItem = ref(initialTodoItem);
const actionType = ref('');

// Поменять состояние чекбокса
const changeChecked = ({subItemId, checked}) => {
  todoItem.value.items.find(item => item.id === subItemId).checked = checked;
};

// Поменять загаловок todo пункта
const changeTitle = ({subItemId, title}) => {
  todoItem.value.items.find(item => item.id === subItemId).title = title;
};

// Закрть модальное окно с подтверждением
const deleteItem = () => {
  actionType.value = 'delete';
  store.commit('toggleModal');
};

// Открыть модальное окно с подтверждением удаления
const acceptAction = () => {
  if (actionType.value === 'delete') {
    store.commit('deleteItem', todoItem.value.id);
    router.push('/');
  }
  if (actionType.value === 'decline') {
    if (item.value) {
      todoItem.value = deepClone(item.value);
    } else {
      todoItem.value = deepClone(initialTodoItem);
    }
  }
  store.commit('toggleModal');
};

const deleteSubItem = (id) => {
  todoItem.value.items = todoItem.value.items.filter(item => item.id !== id);
};

const setTodoTitle = () => {
  store.commit('setEdit', false);
  todoItem.value.title = todoTitle.value;
};

const addSubItem = () => {
  todoItem.value.items.push({
    id: Date.now(),
    title: '',
    checked: false
  })
};

const saveChanges = () => {
  if (route.params.id === 'create') {
    store.commit('addItem', todoItem.value);
  } else {
    store.commit('changeItem', todoItem.value);
  }
  router.push('/');
};

const declineChanges = () => {
  actionType.value = 'decline';
  store.commit('toggleModal');
};

onMounted(() => {
  if (route.params.id === 'create') {
    store.commit('setEdit', true);
  } else {
    store.commit('setEdit', false);
  }
  if (Object.keys(item.value).length) {
    todoItem.value = deepClone(item.value);
  }
});

onBeforeUnmount(() => {
  localStorage.setItem('todoList', JSON.stringify(store.state.todoList));
});
</script>

<style lang="scss" scoped>
.todo-item__add {
  width: 100%;
  padding: 1em 0;
  border: 1px dashed dimgray;
  background: rgba(105, 105, 105, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color .3s ease;

  &:hover {
    background: rgba(105, 105, 105, 0.2);
  }

  svg {
    width: 25px;
    height: 25px;
  }
}

.todo-item__btns {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.todo-item__save, .todo-item__decline {
  margin-top: 3em;
  padding: 0.5em;
  width: unset;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background: dimgray;
  }
}
</style>
