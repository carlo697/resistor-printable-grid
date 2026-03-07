<script setup lang="ts" generic="T extends unknown">
import FieldLabel from "./FieldLabel.vue";
import type { BaseFieldProps } from "./types";

interface FieldRadioProps extends BaseFieldProps {
  options: { value: T; label: string }[];
}

defineProps<FieldRadioProps>();

const model = defineModel<T | undefined>();
</script>

<template>
  <div>
    <FieldLabel :for="name">{{ label }} </FieldLabel>

    <div v-for="option in options" class="flex gap-2 items-center">
      <input
        :id="option.label"
        :value="option.value"
        type="radio"
        v-model="model"
      />

      <label :for="option.label" class="block">
        {{ option.label }}

        <slot name="icon" :option="option" />
      </label>
    </div>
  </div>
</template>
