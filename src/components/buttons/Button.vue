<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "error";
  square?: boolean;
  shadow?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "lg",
  color: "default",
  square: false,
  shadow: false,
});
</script>

<template>
  <button
    class="border leading-none rounded-lg hover:brightness-90 flex items-center gap-1 justify-center"
    :class="{
      'text-sm ': size === 'sm',
      'text-base ': size === 'md',
      'text-lg ': size === 'lg',

      'px-1 py-1': size === 'sm' && !square,
      'px-3 py-1.5': size === 'md' && !square,
      'px-4 py-2': size === 'lg' && !square,

      'px-4 py-4': size === 'sm' && square,
      'px-6 py-1.6': size === 'md' && square,
      'h-10 w-10': size === 'lg' && square,

      'border-gray-200 bg-white text-black': color === 'default',
      ' bg-red-500 text-white': color === 'error',
      ' bg-mauve-500 text-white': color === 'primary',

      'shadow-sm': props.shadow,
    }"
  >
    <Icon v-if="icon" :icon="icon" />

    <slot />
  </button>
</template>
