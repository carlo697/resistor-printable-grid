<script setup lang="ts">
import { computed } from "vue";
import Button from "../buttons/Button.vue";
import Card from "../cards/Card.vue";
import SymbolIcon from "../SymbolIcon.vue";
import type { ManualItem } from "./types";

const props = defineProps<{ item: ManualItem }>();

const emit = defineEmits<{ edit: []; delete: []; move: [] }>();

const imageBase64 = computed(() =>
  props.item.imageBase64
    ? `data:image/png;${props.item.imageBase64}`
    : undefined,
);
</script>

<template>
  <Card class="grid grid-cols-1 gap-1">
    <h2 class="font-semibold leading-none">
      {{ item.title }}
    </h2>

    <h3 v-if="item.subTitle" class="font-medium text-gray-600 leading-none">
      {{ item.subTitle }}
    </h3>

    <SymbolIcon
      v-if="item.imageType === 'symbol' && item.symbol"
      :type="item.symbol"
      class="text-[64px]"
      :color="item.color"
    />
    <img
      v-else-if="item.imageType === 'base64' && item.imageBase64"
      :src="imageBase64"
      class="mx-auto max-w-full"
    />

    <div class="flex flex-col lg:flex-row gap-2">
      <Button @click="emit('edit')" icon="tabler-edit" />
      <Button size="md" @click="emit('move')" icon="tabler:file-arrow-right">Move</Button>

      <div class="grow"></div>

      <Button
        size="md"
        color="error"
        icon="tabler-trash"
        @click="emit('delete')"
      />
    </div>
  </Card>
</template>
