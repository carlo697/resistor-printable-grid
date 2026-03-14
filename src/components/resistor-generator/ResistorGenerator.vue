<script setup lang="ts">
import { computed, ref } from "vue";
import PrintableGrid from "../PrintableGrid.vue";
import type { Tolerance } from "./ResistoPrintableCard.vue";
import ResistoPrintableCard from "./ResistoPrintableCard.vue";

defineProps<{
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();

const series: Record<Tolerance, number[]> = {
  5: [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9,
    4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
  ],
};

const multipliers = [
  0.1, 1, 10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000,
];

const tolerance = ref<Tolerance>(5);
const seriesToUse = computed(() => series[tolerance.value]);

const valuesToUse = computed(() =>
  multipliers.flatMap((multiplier) =>
    seriesToUse.value.map((series) => series * multiplier),
  ),
);
</script>

<template>
  <PrintableGrid>
    <ResistoPrintableCard
      v-for="value in valuesToUse"
      :value="value"
      :tolerance="5"
      :width="width"
      :height="height"
      :paddingTop="paddingTop"
      :paddingBottom="paddingBottom"
      :paddingLeft="paddingLeft"
      :paddingRight="paddingRight"
    />
  </PrintableGrid>
</template>
