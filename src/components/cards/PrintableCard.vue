<script setup lang="ts">
defineProps<{
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}>();
</script>

<template>
  <div
    class="border-[0.5px] printable-card"
    :style="{
      width: `${width}mm`,
      height: `${height}mm `,
      paddingLeft: `${paddingLeft}mm`,
      paddingRight: `${paddingRight}mm`,
      paddingTop: `${paddingTop}mm`,
      paddingBottom: `${paddingBottom}mm`,
    }"
  >
    <div class="resistor-card flex flex-col items-center"><slot /></div>
  </div>
</template>

<style scoped>
.printable-card {
  width: 100%;
  height: 100%;
  container-type: size;
}
</style>
