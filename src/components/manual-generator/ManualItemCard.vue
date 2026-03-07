<script setup lang="ts">
import Button from "../buttons/Button.vue";
import Card from "../cards/Card.vue";
import type { ManualItem } from "./types";

defineProps<{ item: ManualItem }>();

const emit = defineEmits<{ edit: []; delete: [] }>();
</script>

<template>
  <Card>
    <h2>
      {{ item.title }}
    </h2>

    <h3>
      {{ item.subTitle }}
    </h3>

    <div class="flex gap-2 justify-between">
      <Button size="md" @click="emit('edit')">Edit</Button>

      <Button size="md" color="error" @click="emit('delete')">Delete</Button>
    </div>
  </Card>
</template>
