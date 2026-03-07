<script lang="ts">
import type { Component } from "vue";
import led_diode from "../assets/led_diode.svg?component";
import zener_diode from "../assets/zener_diode.svg?component";

export const symbolTypes = ["led_diode", "zener_diode"] as const;
export type SymbolType = (typeof symbolTypes)[number];

export const symbols: Record<
  SymbolType,
  { svg?: Component; supportColor?: true }
> = {
  led_diode: {
    svg: led_diode,
    supportColor: true,
  },
  zener_diode: {
    svg: zener_diode,
  },
};
</script>

<script setup lang="ts">
defineProps<{ type: SymbolType; color?: string }>();
</script>

<template>
  <component
    :is="symbols[type].svg"
    :icon="type"
    :style="{ color: color }"
    height="1em"
    width="auto"
  />
</template>
