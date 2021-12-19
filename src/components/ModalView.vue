<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import useKeyDown from "@/composables/use-keydown";

export default {
  setup(_, { emit }) {
    useKeyDown([
      {
        tecla: "Escape",
        fn: () => {
          emit("closeModal");
        }
      }
    ]);

    return {
      emit
    };
  }
};
</script>
