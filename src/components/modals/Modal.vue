<script setup lang="ts">
defineProps<{ maxWidth?: number }>();

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <Teleport to="#modals">
    <div
      v-show="isOpen"
      class="fixed top-0 left-0 w-full h-full bg-gray-800/50 flex items-center justify-center p-6"
    >
      <div
        class="bg-white rounded-xl p-6 grid grid-cols-1 gap-4 grow"
        :style="{ maxWidth: `${maxWidth}px` }"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
