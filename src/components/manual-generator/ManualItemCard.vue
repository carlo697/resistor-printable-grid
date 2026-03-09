<script setup lang="ts">
import Button from "../buttons/Button.vue";
import Card from "../cards/Card.vue";
import SymbolIcon from "../SymbolIcon.vue";
import type { ManualItem } from "./types";

defineProps<{ item: ManualItem }>();

const emit = defineEmits<{ edit: []; delete: [] }>();
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

    <div class="flex gap-2 justify-between">
      <Button size="md" @click="emit('edit')">Edit</Button>

      <Button size="md" color="error" @click="emit('delete')">Delete</Button>
    </div>
  </Card>
</template>
