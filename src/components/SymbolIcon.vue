<script lang="ts">
import type { Component } from "vue";
import led_diode from "../assets/led_diode.svg?component";
import zener_diode from "../assets/zener_diode.svg?component";
import npn_bjt from "../assets/npn_bjt.svg?component";
import pnp_bjt from "../assets/pnp_bjt.svg?component";
import ldr from "../assets/ldr.svg?component";

export const symbolTypes = [
  "led_diode",
  "zener_diode",
  "npn_bjt",
  "pnp_bjt",
  "ldr",
] as const;
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
  npn_bjt: {
    svg: npn_bjt,
  },
  pnp_bjt: {
    svg: pnp_bjt,
  },
  ldr: {
    svg: ldr,
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
    width="100%"
  />
</template>
