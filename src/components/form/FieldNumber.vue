<script setup lang="ts">
import type { BaseFieldProps } from "./types";

defineProps<BaseFieldProps>();
const model = defineModel<number | undefined>();
</script>

<template>
  <div>
    <label :for="name" class="block mb-1">{{ label }} </label>

    <input
      :id="name"
      type="number"
      v-model="model"
      class="bg-gray-200 w-full rounded-sm p-1"
    />
  </div>
</template>
