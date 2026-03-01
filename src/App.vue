<script setup lang="ts">
import { computed, ref } from "vue";
import ResistorCard, { type Tolerance } from "./components/ResistorCard.vue";

const series: Record<Tolerance, number[]> = {
  5: [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9,
    4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
  ],
};

const multipliers = [
  0.1, 1, 10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000,
];

const tolerance = ref<Tolerance>(5);
const seriesToUse = computed(() => series[tolerance.value]);
</script>

<template>
  <div class="flex flex-wrap">
    <template v-for="multiplier in multipliers">
      <ResistorCard
        v-for="value in seriesToUse"
        :value="value * multiplier"
        :tolerance="5"
        style="
          width: 18mm;
          height: 10mm;
          padding-left: 1.5mm;
          padding-right: 1.5mm;
          padding-bottom: 1.5mm;
        "
      />
    </template>
  </div>
</template>
