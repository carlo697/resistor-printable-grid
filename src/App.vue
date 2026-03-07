<script setup lang="ts">
import FieldNumber from "./components/form/FieldNumber.vue";
import FieldRadio from "./components/form/FieldRadio.vue";
import ResistorGenerator from "./components/resistors/ResistorGenerator.vue";
import { useLocalStorage } from "@vueuse/core";

const width = useLocalStorage("width", 22.5);
const height = useLocalStorage("height", 12.5);
const paddingTop = useLocalStorage("paddingTop", 0);
const paddingBottom = useLocalStorage("paddingBottom", 1.875);
const paddingLeft = useLocalStorage("paddingLeft", 1.875);
const paddingRight = useLocalStorage("paddingRight", 1.875);
const mode = useLocalStorage<"resistor" | "manual">("mode", "resistor");
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
    <ResistorGenerator
      v-if="mode === 'resistor'"
      :width="width"
      :height="height"
      :paddingTop="paddingTop"
      :paddingBottom="paddingBottom"
      :paddingLeft="paddingLeft"
      :paddingRight="paddingRight"
    />
  </main>
</template>
