<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import type { Sheet } from "./components/sheets/types";
import Button from "./components/buttons/Button.vue";
import SheetContent from "./components/sheets/SheetContent.vue";
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import SheetModal from "./components/sheets/SheetModal.vue";

const sheets = useLocalStorage<Sheet[]>("sheets", []);
const selectedSheetId = useLocalStorage<string | undefined>(
  "currentSheetId",
  undefined,
);
const selectedSheet = computed(() =>
  sheets.value.find((sheet) => sheet.name === selectedSheetId.value),
);

const isSheetModalOpen = ref(false);
const targetModalItem = ref<Sheet | undefined>(undefined);

function add(item: Sheet) {
  sheets.value = [...sheets.value, item];
}

function edit(item: Sheet) {
  sheets.value = sheets.value.map((_item) =>
    _item.id === item.id ? item : _item,
  );
}
</script>

<template>
  <div class="print:hidden">
    <div
      class="sticky top-0 p-2 border-b border-gray-200 bg-gray-100 flex gap-1"
    >
      <Button
        v-for="sheet in sheets"
        @click="selectedSheetId = sheet.name"
        :color="selectedSheetId === sheet.name ? 'primary' : 'default'"
      >
        {{ sheet.name }}
      </Button>

      <Button @click="isSheetModalOpen = true">
        <Icon icon="tabler-plus" />
      </Button>
    </div>

    <div
      v-if="selectedSheet"
      class="container px-4 mx-auto py-8 grid grid-cols-1 gap-8"
    >
      <SheetContent :sheet="selectedSheet" />
    </div>

    <SheetModal
      v-if="isSheetModalOpen"
      v-model="isSheetModalOpen"
      :sheet="targetModalItem"
      @add="add"
      @edit="edit"
    />
  </div>
</template>
