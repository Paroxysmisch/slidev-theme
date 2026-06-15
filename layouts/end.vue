<template>
  <div class="slidev-layout cover h-full grid place-content-center text-center">
    <div class="relative z-4">
      <slot />
    </div>
    <div class="end-line" aria-hidden="true" />
  </div>
</template>

<style scoped>
.end-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--slidev-theme-primary) 25%,
    var(--slidev-theme-secondary) 75%,
    transparent 100%
  );
  opacity: 0.5;
}
</style>
