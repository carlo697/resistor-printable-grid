<script setup lang="ts">
import { computed, ref } from "vue";
import { type Tolerance } from "./components/resistors/ResistorCard.vue";
import ResistorGrid from "./components/resistors/ResistorGrid.vue";
import FieldNumber from "./components/form/FieldNumber.vue";
import FieldRadio from "./components/form/FieldRadio.vue";

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

const width = ref(22.5);
const height = ref(12.5);
const paddingTop = ref(0);
const paddingBottom = ref(1.875);
const paddingLeft = ref(1.875);
const paddingRight = ref(1.875);
const mode = ref<"resistor" | "manual">("resistor");
</script>

<template>
  <main class="container px-4 mx-auto py-8 grid grid-cols-1 gap-8 print:hidden">
    <div>
      <h1 class="text-4xl font-semibold">
        Printable Electric Symbol Generator
      </h1>
    </div>

    <form class="grid grid-cols-1 gap-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldNumber name="width" label="Width" v-model="width" />
        <FieldNumber name="height" label="Height" v-model="height" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FieldNumber
          name="paddingTop"
          label="Padding Top"
          v-model="paddingTop"
        />
        <FieldNumber
          name="paddingBottom"
          label="Padding Bottom"
          v-model="paddingBottom"
        />
        <FieldNumber
          name="paddingLeft"
          label="Padding Left"
          v-model="paddingLeft"
        />
        <FieldNumber
          name="paddingRight"
          label="Padding Right"
          v-model="paddingRight"
        />
      </div>

      <div>
        <FieldRadio
          v-model="mode"
          name="mode"
          label="Mode"
          :options="[
            { label: 'Resistor', value: 'resistor' },
            { label: 'Manual', value: 'manual' },
          ]"
        />
      </div>
    </form>

    <!-- Preview grid -->
    <ResistorGrid
      v-if="mode === 'resistor'"
      :values="valuesToUse"
      :width="width"
      :height="height"
      :paddingTop="paddingTop"
      :paddingBottom="paddingBottom"
      :paddingLeft="paddingLeft"
      :paddingRight="paddingRight"
    />
  </main>

  <!-- Printable grid -->
  <div class="flex flex-wrap not-print:hidden">
    <ResistorGrid
      v-if="mode === 'resistor'"
      :values="valuesToUse"
      :width="width"
      :height="height"
      :paddingTop="paddingTop"
      :paddingBottom="paddingBottom"
      :paddingLeft="paddingLeft"
      :paddingRight="paddingRight"
    />
  </div>
</template>
