<script setup lang="ts">
import ResistorCard from './ResistorCard.vue';

defineProps<{
  values: number[];
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();
</script>

<template>
  <div class="flex flex-wrap">
    <ResistorCard
      v-for="value in values"
      :value="value"
      :tolerance="5"
      :style="{
        width: `${width}mm`,
        height: `${height}mm `,
        paddingLeft: `${paddingLeft}mm`,
        paddingRight: `${paddingRight}mm`,
        paddingTop: `${paddingTop}mm`,
        paddingBottom: `${paddingBottom}mm`,
      }"
    />
  </div>
</template>
