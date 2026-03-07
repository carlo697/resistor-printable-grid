<script setup lang="ts">
import FieldLabel from "./FieldLabel.vue";
import type { BaseFieldProps } from "./types";

defineProps<BaseFieldProps>();
const model = defineModel<string | undefined>();
</script>

<template>
  <div>
    <FieldLabel :for="name">{{ label }} </FieldLabel>

    <input
      :id="name"
      type="color"
      v-model="model"
      class="bg-gray-200 w-full rounded-sm p-1"
    />
  </div>
</template>
