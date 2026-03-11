<script setup lang="ts">
import { computed } from "vue";
import PrintableCard from "../cards/PrintableCard.vue";
import SymbolIcon from "../SymbolIcon.vue";
import type { ManualItem } from "./types";

export type Tolerance = 5;

const props = defineProps<{
  item: ManualItem;
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();

const imageBase64 = computed(() =>
  props.item.imageBase64
    ? `data:image/png;${props.item.imageBase64}`
    : undefined,
);
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
    <div class="manual-item-card-title font-semibold leading-none">
      {{ item.title }}
    </div>

    <div
      class="manual-item-card-subtitle font-medium leading-none text-gray-600"
    >
      {{ item.subTitle }}
    </div>

    <SymbolIcon
      v-if="item.imageType === 'symbol' && item.symbol"
      :type="item.symbol"
      :class="{
        'symbol-icon-no-subtitle': !item.subTitle,
        'symbol-icon': item.subTitle,
      }"
      :color="item.color"
    />
    <img
      v-else-if="item.imageType === 'base64' && item.imageBase64"
      :src="imageBase64"
      class="h-[1em]"
      :class="{
        'symbol-icon-no-subtitle': !item.subTitle,
        'symbol-icon': item.subTitle,
      }"
    />
  </PrintableCard>
</template>

<style scoped>
.manual-item-card-title {
  font-size: 30cqh;
}

.manual-item-card-subtitle {
  font-size: 20cqh;
}

.symbol-icon {
  font-size: 50cqh;
}

.symbol-icon-no-subtitle {
  font-size: 70cqh;
}
</style>
