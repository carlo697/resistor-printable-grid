<script setup lang="ts">
import FieldNumber from "../form/FieldNumber.vue";
import FieldRadio from "../form/FieldRadio.vue";
import ManualGenerator from "../manual-generator/ManualGenerator.vue";
import ResistorGenerator from "../resistor-generator/ResistorGenerator.vue";
import { useLocalStorage } from "@vueuse/core";
import type { Sheet } from "./types";

const props = defineProps<{
  sheet: Sheet;
}>();

const width = useLocalStorage(() => `${props.sheet.name}.width`, 22.5);
const height = useLocalStorage(() => `${props.sheet.name}.height`, 12.5);
const paddingTop = useLocalStorage(() => `${props.sheet.name}.paddingTop`, 0);
const paddingBottom = useLocalStorage(
  () => `${props.sheet.name}.paddingBottom`,
  1.875,
);
const paddingLeft = useLocalStorage(
  () => `${props.sheet.name}.paddingLeft`,
  1.875,
);
const paddingRight = useLocalStorage(
  () => `${props.sheet.name}.paddingRight`,
  1.875,
);
const mode = useLocalStorage<"resistor" | "manual">(
  () => `${props.sheet.name}.mode`,
  "resistor",
);
</script>

<template>
  <form class="grid grid-cols-1 gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldNumber name="width" label="Width" v-model="width" />
      <FieldNumber name="height" label="Height" v-model="height" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FieldNumber name="paddingTop" label="Padding Top" v-model="paddingTop" />
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
  <ResistorGenerator
    v-if="mode === 'resistor'"
    :width="width"
    :height="height"
    :paddingTop="paddingTop"
    :paddingBottom="paddingBottom"
    :paddingLeft="paddingLeft"
    :paddingRight="paddingRight"
  />
  <ManualGenerator
    v-else-if="mode === 'manual'"
    :sheet="sheet"
    :width="width"
    :height="height"
    :paddingTop="paddingTop"
    :paddingBottom="paddingBottom"
    :paddingLeft="paddingLeft"
    :paddingRight="paddingRight"
  />
</template>
