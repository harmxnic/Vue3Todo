<template>
  <li class="subitems__item">
    <label
      class="subitems__check"
      :class="{ edit: isTodoEditing }"
    >
      <input
        type="checkbox"
        :checked="item.checked"
        @change="$emit('changeChecked', { subItemId: item.id, checked: !item.checked })"
      >
      <input
        v-if="isTitleEditing"
        type="text"
        v-model="title"
        @blur="setTitle"
      >
      <span
        v-else
        class="subitems__title"
      >
        {{ item.title }}
      </span>
    </label>
    <div class="subitems__actions">
      <button
        v-if="isTodoEditing"
        class="subitems__edit"
        @click="toggleEditTitle"
      >
        <IconEdit />
      </button>
      <button
        v-if="isTodoEditing"
        class="subitems__delete"
        @click="$emit('deleteSubItem', item.id)"
      >
        <IconDelete />
      </button>
    </div>
  </li>
</template>

<script setup>
import IconEdit from '@/components/IconEdit';

import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import IconDelete from '@/components/IconDelete';

const emits = defineEmits(['changeChecked', 'changeTitle', 'deleteSubItem']);
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});

const route = useRoute();

const isTitleEditing = ref(false);
const isTodoEditing = ref(false);
const title = ref(props.item.title);

const toggleEditTitle = () => {
  isTitleEditing.value = !isTitleEditing.value;
};

const setTitle = () => {
  emits('changeTitle', {subItemId: props.item.id, title: title.value});
  toggleEditTitle();
};

onMounted(() => {
  isTodoEditing.value = route.name === 'todo';
  isTitleEditing.value = !props.item.title;
});
</script>

<style lang="scss" scoped>
.subitems {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.3em;
  }

  &__check {
    display: block;
    padding: 0.3em 0;
    pointer-events: none;

    &.edit {
      cursor: pointer;
      pointer-events: unset;
    }
  }

  &__check input[type="checkbox"] {
    display: none;
  }

  &__title {
    position: relative;
    padding-left: 1.5em;
  }

  &__title:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border: 1px solid dimgray;
    border-radius: 50%;
  }

  &__check input[type="checkbox"]:checked + &__title:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    background: dimgray;
    border-radius: 50%;
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

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
}
</style>
