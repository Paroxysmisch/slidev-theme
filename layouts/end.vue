<template>
  <div class="slidev-layout cover h-full grid place-content-center text-center">
    <div>
      <slot />
    </div>
    <div class="end-decoration" aria-hidden="true">
      <div class="end-gradient" />
    </div>
  </div>
</template>

<style scoped>
.end-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.end-gradient {
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--slidev-theme-primary) 30%,
    var(--slidev-theme-secondary) 70%,
    transparent 100%
  );
  opacity: 0.6;
}
</style>
