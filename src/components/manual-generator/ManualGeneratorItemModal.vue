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
import { useFileDialog } from "@vueuse/core";

const props = defineProps<{ initialItem?: ManualItem }>();

const isOpen = defineModel<boolean>({ required: true });

const title = ref<string | undefined>(props.initialItem?.title);
const subtitle = ref<string | undefined>(props.initialItem?.subTitle);
const imageType = ref<ImageType>(props.initialItem?.imageType ?? "noImage");
const symbol = ref<SymbolType | undefined>(props.initialItem?.symbol);
const color = ref<string | undefined>(props.initialItem?.color);
const imageBase64 = ref<string | undefined>(props.initialItem?.imageBase64);
const imageBase64Src = computed(() =>
  imageBase64.value ? `data:image/png;${imageBase64.value}` : undefined,
);

const { open, onChange } = useFileDialog({
  accept: "image/*",
});

async function blobToBase64(blob: Blob): Promise<string> {
  return await new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

onChange(async (files) => {
  const file = files?.item(0);
  if (file) {
    imageBase64.value = await blobToBase64(file);
  }
});

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
      imageBase64: imageType.value === "base64" ? imageBase64.value : undefined,
    });
  } else {
    emit("add", {
      id: new Date().getTime(),
      title: title.value,
      subTitle: subtitle.value,
      imageType: imageType.value,
      symbol: symbol.value,
      color: color.value,
      imageBase64: imageType.value === "base64" ? imageBase64.value : undefined,
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
        { label: 'Custom Image', value: 'base64' },
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

    <div v-if="imageType === 'base64'">
      <Button type="button" @click="open"> Choose file </Button>

      <img v-if="imageBase64Src" :src="imageBase64Src" />
    </div>

    <div class="flex gap-4 justify-end">
      <Button @click="handleClose"> Close </Button>
      <Button @click="handleSave"> Save </Button>
    </div>
  </Modal>
</template>
