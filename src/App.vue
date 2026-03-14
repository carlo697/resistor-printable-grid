<script setup lang="ts">
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import type { Sheet } from "./components/sheets/types";
import Button from "./components/buttons/Button.vue";
import SheetContent from "./components/sheets/SheetContent.vue";
import { computed, ref } from "vue";
import SheetModal from "./components/sheets/SheetModal.vue";

const sheets = useLocalStorage<Sheet[]>("sheets", []);
const selectedSheetId = useLocalStorage<number | undefined>(
  "currentSheetId",
  undefined,
  { serializer: StorageSerializers.number },
);
const selectedSheet = computed(() =>
  sheets.value.find((sheet) => sheet.id === selectedSheetId.value),
);

const isModalOpen = ref(false);
const targetModalItem = ref<Sheet | undefined>(undefined);

function handleAddItem() {
  targetModalItem.value = undefined;
  isModalOpen.value = true;
}

function handleEditItem(item: Sheet) {
  targetModalItem.value = item;
  isModalOpen.value = true;
}

function add(item: Sheet) {
  sheets.value = [...sheets.value, item];
}

function edit(item: Sheet) {
  sheets.value = sheets.value.map((_item) =>
    _item.id === item.id ? item : _item,
  );
}

function handlePrint() {
  window.print();
}
</script>

<template>
  <div class="print:hidden">
    <div
      class="sticky top-0 p-2 border-b border-gray-200 bg-gray-100 flex gap-1"
    >
      <Button
        v-for="sheet in sheets"
        @click="selectedSheetId = sheet.id"
        :color="selectedSheetId === sheet.id ? 'primary' : 'default'"
      >
        {{ sheet.name }}
      </Button>

      <Button @click="handleAddItem" icon="tabler-plus" />

      <div
        v-if="selectedSheet"
        class="absolute top-16 right-4 grid grid-cols-1 gap-2"
      >
        <Button
          size="lg"
          square
          shadow
          icon="tabler-edit"
          @click="handleEditItem(selectedSheet)"
        />

        <Button
          @click="handlePrint"
          size="lg"
          square
          shadow
          icon="tabler-printer"
        />
      </div>
    </div>

    <div v-if="selectedSheet">
      <div class="container px-4 mx-auto py-8 grid grid-cols-1 gap-8">
        <SheetContent :sheet="selectedSheet" />
      </div>
    </div>

    <SheetModal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :sheet="targetModalItem"
      @add="add"
      @edit="edit"
    />
  </div>
</template>
