<script setup lang="ts">
import { ref } from "vue";
import Button from "../buttons/Button.vue";
import Modal from "../modals/Modal.vue";
import FieldText from "../form/FieldText.vue";
import type { Sheet } from "./types";

const props = defineProps<{ sheet?: Sheet }>();

const isOpen = defineModel<boolean>({ required: true });

const name = ref<string | undefined>(props.sheet?.name);

const emit = defineEmits<{
  add: [item: Sheet];
  edit: [item: Sheet];
}>();

function handleClose() {
  isOpen.value = false;
}

function handleSave() {
  if (!name.value) {
    return;
  }

  if (props.sheet) {
    emit("edit", {
      id: props.sheet.id,
      name: name.value,
    });
  } else {
    emit("add", {
      id: new Date().getTime(),
      name: name.value,
    });
  }

  isOpen.value = false;
}
</script>

<template>
  <Modal v-model="isOpen" :maxWidth="500">
    <h2 class="font-bold text-xl w-full">
      <template v-if="props.sheet">
        Edit sheet
      </template>
      <template v-else>
        Add new sheet
      </template>
    </h2>

    <FieldText name="name" label="Name" v-model="name" />

    <div class="flex gap-4 justify-end">
      <Button @click="handleClose"> Close </Button>
      <Button @click="handleSave"> Save </Button>
    </div>
  </Modal>
</template>
