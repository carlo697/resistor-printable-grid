<script setup lang="ts">
interface ButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "error";
}

withDefaults(defineProps<ButtonProps>(), { size: "lg", color: "default" });
</script>

<template>
  <button
    class="border leading-none rounded-lg hover:brightness-90 flex items-center gap-1"
    :class="{
      'text-sm px-2 py-1': size === 'sm',
      'text-base px-3 py-1.5': size === 'md',
      'text-lg px-4 py-2': size === 'lg',

      'border-gray-200 bg-white': color === 'default',
      'border-transparent bg-red-500 text-white': color === 'error',
      'border-transparent bg-mauve-500 text-white': color === 'primary',
    }"
  >
    <slot />
  </button>
</template>
