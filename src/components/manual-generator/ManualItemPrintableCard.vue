<script setup lang="ts">
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

    <div class="manual-item-card-subtitle font-medium leading-none">
      {{ item.subTitle }}
    </div>

    <SymbolIcon
      v-if="item.imageType === 'symbol' && item.symbol"
      :type="item.symbol"
      class="symbol-icon"
      :color="item.color"
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
</style>
