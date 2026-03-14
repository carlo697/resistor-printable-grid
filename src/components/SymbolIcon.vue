<script lang="ts">
import type { Component } from "vue";
import capacitor from "../assets/capacitor.svg?component";
import potentiometer from "../assets/potentiometer.svg?component";
import quartz from "../assets/quartz.svg?component";
import button from "../assets/button.svg?component";
import multi_switch from "../assets/multi_switch.svg?component";
import _switch from "../assets/_switch.svg?component";
import limit_switch from "../assets/limit_switch.svg?component";
import relay from "../assets/relay.svg?component";
import diode from "../assets/diode.svg?component";
import led_diode from "../assets/led_diode.svg?component";
import zener_diode from "../assets/zener_diode.svg?component";
import npn_bjt from "../assets/npn_bjt.svg?component";
import pnp_bjt from "../assets/pnp_bjt.svg?component";
import thyristor from "../assets/thyristor.svg?component";
import diac from "../assets/diac.svg?component";
import triac from "../assets/triac.svg?component";
import ldr from "../assets/ldr.svg?component";
import op_amp from "../assets/op_amp.svg?component";
import schmitt_trigger from "../assets/schmitt_trigger.svg?component";
import and from "../assets/and.svg?component";
import nand from "../assets/nand.svg?component";
import or from "../assets/or.svg?component";
import nor from "../assets/nor.svg?component";
import d_flip_flop from "../assets/d_flip_flop.svg?component";
import jk_flip_flop from "../assets/jk_flip_flop.svg?component";
import sr_flip_flop from "../assets/sr_flip_flop.svg?component";
import dip_8 from "../assets/dip_8.svg?component";
import dip_14 from "../assets/dip_14.svg?component";
import dip_16 from "../assets/dip_16.svg?component";
import dip_32 from "../assets/dip_32.svg?component";
import to_92 from "../assets/to_92.svg?component";
import to_220 from "../assets/to_220.svg?component";

export const symbolTypes = [
  "capacitor",
  "potentiometer",
  "quartz",
  "button",
  "switch",
  "multi_switch",
  "limit_switch",
  "relay",
  "diode",
  "led_diode",
  "zener_diode",
  "npn_bjt",
  "pnp_bjt",
  "thyristor",
  "diac",
  "triac",
  "ldr",
  "op_amp",
  "schmitt_trigger",
  "and",
  "nand",
  "or",
  "nor",
  "d_flip_flop",
  "jk_flip_flop",
  "sr_flip_flop",
  "dip_8",
  "dip_14",
  "dip_16",
  "dip_32",
  "to_92",
  "to_220",
] as const;
export type SymbolType = (typeof symbolTypes)[number];

export const symbols: Record<
  SymbolType,
  { svg?: Component; supportColor?: true }
> = {
  capacitor: {
    svg: capacitor,
  },
  potentiometer: {
    svg: potentiometer,
  },
  quartz: {
    svg: quartz,
  },
  button: {
    svg: button,
  },
  switch: {
    svg: _switch,
  },
  multi_switch: {
    svg: multi_switch,
  },
  limit_switch: {
    svg: limit_switch,
  },
  relay: {
    svg: relay,
  },
  diode: {
    svg: diode,
  },
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
  thyristor: {
    svg: thyristor,
  },
  diac: {
    svg: diac,
  },
  triac: {
    svg: triac,
  },
  ldr: {
    svg: ldr,
  },
  op_amp: {
    svg: op_amp,
  },
  schmitt_trigger: {
    svg: schmitt_trigger,
  },
  and: {
    svg: and,
  },
  nand: {
    svg: nand,
  },
  or: {
    svg: or,
  },
  nor: {
    svg: nor,
  },
  d_flip_flop: {
    svg: d_flip_flop,
  },
  jk_flip_flop: {
    svg: jk_flip_flop,
  },
  sr_flip_flop: {
    svg: sr_flip_flop,
  },
  dip_8: {
    svg: dip_8,
  },
  dip_14: {
    svg: dip_14,
  },
  dip_16: {
    svg: dip_16,
  },
  dip_32: {
    svg: dip_32,
  },
  to_92: {
    svg: to_92,
  },
  to_220: {
    svg: to_220,
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
