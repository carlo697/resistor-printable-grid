<script setup lang="ts">
import Button from "../buttons/Button.vue";
import Card from "../cards/Card.vue";
import SymbolIcon from "../SymbolIcon.vue";
import type { ManualItem } from "./types";

defineProps<{ item: ManualItem }>();

const emit = defineEmits<{ edit: []; delete: [] }>();
</script>

<template>
  <Card>
    <h2 class="font-semibold">
      {{ item.title }}
    </h2>

    <h3 class="font-medium text-gray-600">
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
