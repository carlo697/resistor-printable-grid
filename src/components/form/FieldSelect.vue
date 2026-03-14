<script setup lang="ts" generic="T">
import FieldLabel from "./FieldLabel.vue";
import type { BaseFieldProps } from "./types";

type Option<T> = { label: string; value: T };

interface Props extends BaseFieldProps {
  options: Option<T>[];
}

defineProps<Props>();
const model = defineModel<T | undefined>();
</script>

<template>
  <div>
    <FieldLabel :for="name">{{ label }} </FieldLabel>

    <select
      :id="name"
      v-model="model"
      class="bg-gray-200 w-full rounded-sm p-1"
    >
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
