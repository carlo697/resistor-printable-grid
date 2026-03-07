<template>
  <div class="flex flex-wrap">
    <slot />
  </div>

  <Teleport to="#printable">
    <div class="flex flex-wrap not-print:hidden">
      <slot />
    </div>
  </Teleport>
</template>
