<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../buttons/Button.vue";
import Modal from "../modals/Modal.vue";
import type { ImageType, ManualItem } from "./types";
import FieldText from "../form/FieldText.vue";
import FieldRadio from "../form/FieldRadio.vue";
import SymbolIcon, {
  symbols,
  symbolTypes,
  type SymbolType,
} from "../SymbolIcon.vue";
import FieldColor from "../form/FieldColor.vue";

const props = defineProps<{ initialItem?: ManualItem }>();

const isOpen = defineModel<boolean>({ required: true });

const title = ref<string | undefined>(props.initialItem?.title);
const subtitle = ref<string | undefined>(props.initialItem?.subTitle);
const imageType = ref<ImageType>(props.initialItem?.imageType ?? "noImage");
const symbol = ref<SymbolType | undefined>(props.initialItem?.symbol);
const color = ref<string | undefined>(props.initialItem?.color);

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
      imageType: imageType.value,
      symbol: symbol.value,
      color: color.value,
    });
  } else {
    emit("add", {
      id: new Date().getTime(),
      title: title.value,
      subTitle: subtitle.value,
      imageType: imageType.value,
      symbol: symbol.value,
      color: color.value,
    });
  }

  isOpen.value = false;
}

const selectedSymbol = computed(() =>
  imageType.value === "symbol" && symbol.value
    ? symbols[symbol.value]
    : undefined,
);
</script>

<template>
  <Modal v-model="isOpen" :maxWidth="500">
    <h2 class="font-bold text-xl w-full">Add new card</h2>

    <FieldText name="title" label="Title" v-model="title" />

    <FieldText name="subtitle" label="Subtitle" v-model="subtitle" />

    <FieldRadio
      v-model="imageType"
      name="imageType"
      label="Image Type"
      :options="[
        { label: 'No image', value: 'noImage' },
        { label: 'Electronic symbol', value: 'symbol' },
      ]"
    />

    <div v-if="imageType === 'symbol'">
      <FieldRadio
        v-model="symbol"
        name="imageType"
        label="Symbol"
        :options="
          symbolTypes.map((symbol) => ({ label: symbol, value: symbol }))
        "
        :columns="3"
        highlight
      >
        <template #icon="{ option }">
          <SymbolIcon :type="option.value" class="text-3xl" />
        </template>
      </FieldRadio>

      <FieldColor
        v-if="selectedSymbol?.supportColor"
        v-model="color"
        name="color"
        label="Color"
      />
    </div>

    <div class="flex gap-4 justify-end">
      <Button @click="handleClose"> Close </Button>
      <Button @click="handleSave"> Save </Button>
    </div>
  </Modal>
</template>
