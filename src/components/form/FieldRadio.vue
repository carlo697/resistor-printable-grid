<script setup lang="ts" generic="T extends unknown">
import FieldLabel from "./FieldLabel.vue";
import type { BaseFieldProps } from "./types";

interface FieldRadioProps extends BaseFieldProps {
  highlight?: boolean;
  columns?: 1 | 2 | 3;
  options: { value: T; label: string }[];
}

withDefaults(defineProps<FieldRadioProps>(), { highlight: false, columns: 1 });

const model = defineModel<T | undefined>();
</script>

<template>
  <div>
    <FieldLabel :for="name">{{ label }} </FieldLabel>

    <div
      class="grid gap-1"
      :class="{
        ' grid-cols-1': columns === 1,
        ' grid-cols-2': columns === 2,
        ' grid-cols-3': columns === 3,
      }"
    >
      <div
        v-for="option in options"
        class="inline-flex gap-2 items-center px-2 py-1"
        :class="{
          'bg-gray-100 rounded-lg': highlight && model === option.value,
        }"
      >
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
  </div>
</template>
