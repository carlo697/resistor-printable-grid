<script setup lang="ts">
import { ref } from "vue";
import Button from "../buttons/Button.vue";
import Modal from "../modals/Modal.vue";
import type { Sheet } from "../sheets/types";
import { useLocalStorage } from "@vueuse/core";
import FieldSelect from "../form/FieldSelect.vue";
import type { ManualItem } from "./types";

const props = defineProps<{ item: ManualItem; currentSheet: Sheet }>();

const isOpen = defineModel<boolean>({ required: true });

const sheets = useLocalStorage<Sheet[]>("sheets", []);
const targetSheetId = ref<number>(props.currentSheet.id);

const emit = defineEmits<{
  move: [item: ManualItem, newSheetId: number];
}>();

function handleClose() {
  isOpen.value = false;
}

function handleSave() {
  emit("move", props.item, targetSheetId.value);
  isOpen.value = false;
}
</script>

<template>
  <Modal v-model="isOpen" :maxWidth="500">
    <h2 class="font-bold text-xl w-full">Move to sheet</h2>

    <FieldSelect
      name="sheet"
      label="Sheet"
      v-model="targetSheetId"
      :options="sheets.map((sheet) => ({ label: sheet.name, value: sheet.id }))"
    />

    <div class="flex gap-4 justify-end">
      <Button @click="handleClose"> Close </Button>
      <Button @click="handleSave"> Move </Button>
    </div>
  </Modal>
</template>
