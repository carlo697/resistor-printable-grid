<script setup lang="ts">
import { computed } from "vue";
import resistorImage from "../../assets/resistor.png";
import PrintableCard from "../cards/PrintableCard.vue";

export type Tolerance = 5;

const props = defineProps<{
  value: number;
  tolerance: Tolerance;
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();

const formattedValue = computed(() => {
  let prefix = "";
  let value = props.value;

  if (props.value >= 1_000_000_000) {
    value = props.value / 1_000_000_000;
    prefix = "G";
  } else if (props.value >= 1_000_000) {
    value = props.value / 1_000_000;
    prefix = "M";
  } else if (props.value >= 1_000) {
    value = props.value / 1_000;
    prefix = "k";
  }

  return `${parseFloat(value.toFixed(4))} ${prefix}Ω`;
});

const black = "#000";
const brown = "#964b00";
const red = "#ff0000";
const orange = "#ffa500";
const yellow = "#ffff00";
const green = "#9acd32";
const blue = "#6495ed";
const violet = "#9400d3";
const grey = "#a0a0a0";
const white = "#fff";

const gold = "#cfb53b";
const silver = "#c0c0c0";

const numberToColor: Record<number, string> = {
  0: black,
  1: brown,
  2: red,
  3: orange,
  4: yellow,
  5: green,
  6: blue,
  7: violet,
  8: grey,
  9: white,
};

const toleranceToColor: Record<Tolerance, string> = {
  5: gold,
};

const numericPart = computed(() => {
  let number = props.value;
  if (number < 1) {
    number =
      props.value * Math.pow(10, Math.ceil(Math.abs(Math.log10(number))));
  }

  return number.toString().replace(/[^0-9]/g, "");
});

const band1Color = computed(() => {
  const number = numericPart.value[0];
  return numberToColor[number ? parseInt(number) : 0];
});

const band2Color = computed(() => {
  const number = numericPart.value[1];
  return numberToColor[number ? parseInt(number) : 0];
});

const logarithmToColor: Record<number, string> = {
  [-1]: silver,
  [0]: gold,
  [1]: black,
  2: brown,
  3: red,
  4: orange,
  5: yellow,
  6: green,
  7: blue,
  8: violet,
  9: grey,
  10: white,
};

const multiplierColor = computed(() => {
  const logarithm = Math.log10(props.value);
  const rounded = Math.floor(logarithm);

  return logarithmToColor[rounded];
});
</script>

<template>
  <PrintableCard
    :width="width"
    :height="height"
    :paddingTop="paddingTop"
    :paddingBottom="paddingBottom"
    :paddingLeft="paddingLeft"
    :paddingRight="paddingRight"
  >
    <div class="resistor-card-value font-semibold">{{ formattedValue }}</div>

    <div class="resistor-card-tolerance font-medium">±{{ tolerance }}% (J)</div>

    <div class="resistor-card-img aspect-300/61 relative">
      <img :src="resistorImage" />

      <div class="band band-1" :style="{ backgroundColor: band1Color }"></div>

      <div class="band band-2" :style="{ backgroundColor: band2Color }"></div>

      <div
        class="band band-3"
        :style="{ backgroundColor: multiplierColor }"
      ></div>

      <div
        class="band band-4"
        :style="{ backgroundColor: toleranceToColor[props.tolerance] }"
      ></div>
    </div>
  </PrintableCard>
</template>

<style scoped>
.resistor-card-value {
  font-size: 40cqh;
  line-height: 1;
}

.resistor-card-tolerance {
  font-size: 20cqh;
  line-height: 1;
}

.resistor-card-img {
  height: 40cqh;
}

.band {
  position: absolute;
  width: 4%;
}

.band-1 {
  height: 96%;
  top: 2.5%;
  left: 25%;
}

.band-2 {
  height: 80%;
  top: 10%;
  left: 37%;
}

.band-3 {
  height: 80%;
  top: 10%;
  left: 48%;
}

.band-4 {
  height: 80%;
  top: 10%;
  left: 66%;
}
</style>
