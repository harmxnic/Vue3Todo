<template>
  <Transition name="modal">
    <div
      class="modal"
      v-if="isModalVisible"
      @click.self="closeModal"
    >
      <div class="modal__block">
        <div class="modal__header">Вы уверены?</div>
        <div class="modal__btns">
          <button
            class="modal__accept btn"
            @click="$emit('accept')"
          >
            Да
          </button>
          <button
            class="modal__decline btn"
            @click="closeModal"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

defineEmits(['accept']);

const store = useStore();

const isModalVisible = computed(() => store.state.isModalVisible);

const closeModal = () => {
  store.commit('toggleModal');
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.5);

  &__block {
    padding: 2em;
    background: #ffffff;
  }

  &__header {
    margin-bottom: 1em;
  }

  &__btns {
    display: flex;
    gap: 0.5em;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
