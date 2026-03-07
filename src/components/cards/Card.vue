<script setup lang="ts">
import type { Component } from "vue";

withDefaults(defineProps<{ is?: string | Component }>(), { is: "div" });
</script>

<template>
  <component :is="is" class="border rounded-lg border-gray-200 p-2">
    <slot />
  </component>
</template>
