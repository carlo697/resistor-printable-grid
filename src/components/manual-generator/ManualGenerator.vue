<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import PrintableGrid from "../PrintableGrid.vue";
import ManualItemPreviewCard from "./ManualItemPreviewCard.vue";
import type { ManualItem } from "./types";
import Card from "../cards/Card.vue";
import ManualGeneratorItemModal from "./ManualGeneratorItemModal.vue";
import { ref } from "vue";
import ManualItemPrintableCard from "./ManualItemPrintableCard.vue";
import type { Sheet } from "../sheets/types";

const props = defineProps<{
  sheet: Sheet;
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();

const items = useLocalStorage<ManualItem[]>(
  () => `${props.sheet.name}.manualItems`,
  [],
);
const isModalOpen = ref(false);
const targetModalItem = ref<ManualItem | undefined>(undefined);

function add(item: ManualItem) {
  items.value = [...items.value, item];
}

function edit(item: ManualItem) {
  items.value = items.value.map((_item) =>
    _item.id === item.id ? item : _item,
  );
}

function handleAddItem() {
  targetModalItem.value = undefined;
  isModalOpen.value = true;
}

function handleEditItem(item: ManualItem) {
  targetModalItem.value = item;
  isModalOpen.value = true;
}

function handleDeleteItem(item: ManualItem) {
  items.value = items.value.filter((_item) => _item.id !== item.id);
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Cards</h1>

    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 mb-8 gap-2">
      <ManualItemPreviewCard
        v-for="item in items"
        :item="item"
        @edit="handleEditItem(item)"
        @delete="handleDeleteItem(item)"
      />

      <Card is="button" @click="handleAddItem" class="hover:bg-gray-200">
        Add new
      </Card>
    </div>

    <template v-if="items.length > 0">
      <h1 class="text-2xl font-semibold mb-4">Results</h1>

      <PrintableGrid>
        <ManualItemPrintableCard
          v-for="item in items"
          :item="item"
          :width="width"
          :height="height"
          :paddingTop="paddingTop"
          :paddingBottom="paddingBottom"
          :paddingLeft="paddingLeft"
          :paddingRight="paddingRight"
        />
      </PrintableGrid>
    </template>

    <ManualGeneratorItemModal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :initialItem="targetModalItem"
      @add="add"
      @edit="edit"
    />
  </div>
</template>
