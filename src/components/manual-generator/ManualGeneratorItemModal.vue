<script setup lang="ts">
import { ref } from "vue";
import Button from "../buttons/Button.vue";
import Modal from "../modals/Modal.vue";
import type { ManualItem } from "./types";
import FieldText from "../form/FieldText.vue";

const props = defineProps<{ initialItem?: ManualItem }>();

const isOpen = defineModel<boolean>({ required: true });

const title = ref<string | undefined>(props.initialItem?.title);
const subtitle = ref<string | undefined>(props.initialItem?.subTitle);

const emit = defineEmits<{
  add: [item: ManualItem];
  edit: [item: ManualItem];
}>();

function handleClose() {
  isOpen.value = false;
}

function handleSave() {
  if (props.initialItem) {
    emit("edit", {
      id: props.initialItem.id,
      title: title.value,
      subTitle: subtitle.value,
    });
  } else {
    emit("add", {
      id: new Date().getTime(),
      title: title.value,
      subTitle: subtitle.value,
    });
  }

  isOpen.value = false;
}
</script>

<template>
  <Modal v-model="isOpen" :maxWidth="400">
    <h2 class="font-bold text-xl w-full">Add new card</h2>

    <FieldText name="title" label="Title" v-model="title" />
    <FieldText name="subtitle" label="Subtitle" v-model="subtitle" />

    <div class="flex gap-4 justify-end">
      <Button @click="handleClose"> Close </Button>
      <Button @click="handleSave"> Save </Button>
    </div>
  </Modal>
</template>
