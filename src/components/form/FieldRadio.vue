<script setup lang="ts">
import FieldLabel from "./FieldLabel.vue";
import type { BaseFieldProps } from "./types";

interface FieldRadioProps extends BaseFieldProps {
  options: { value: unknown; label: string }[];
}

defineProps<FieldRadioProps>();

const model = defineModel<unknown | undefined>();
</script>

<template>
  <div>
    <FieldLabel :for="name">{{ label }} </FieldLabel>

    <div v-for="option in options" class="flex gap-2">
      <input
        :id="option.label"
        :value="option.value"
        type="radio"
        v-model="model"
      />

      <label :for="option.label" class="block mb-1">{{ option.label }} </label>
    </div>
  </div>
</template>
