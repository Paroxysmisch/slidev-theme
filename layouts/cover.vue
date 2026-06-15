<script setup lang="ts">
import { handleBackground } from '../composables/background'
import { computed } from 'vue'

const props = defineProps({
  background: {
    type: String,
    default: undefined,
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <!-- Geometric block tiles behind content (poster underprint) -->
    <div class="cover-tiles" aria-hidden="true">
      <div class="tile tile-1" />
      <div class="tile tile-2" />
      <div class="tile tile-3" />
    </div>

    <div class="my-auto w-full relative z-4">
      <slot />
    </div>

    <!-- Frosted glass footer band with gradient accent line -->
    <div class="cover-footer" aria-hidden="true">
      <div class="footer-line" />
    </div>
  </div>
</template>

<style scoped>
.cover-tiles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 1fr);
  z-index: 1;
}

.tile {
  background: rgba(var(--slidev-theme-primary-rgb), 0.06);
}

html.dark .tile {
  background: rgba(var(--slidev-theme-primary-rgb), 0.04);
}

.tile-1 { grid-column: 1; grid-row: 5 / 8; }
.tile-2 { grid-column: 4; grid-row: 1 / 3; }
.tile-3 { grid-column: 2 / 4; grid-row: 7 / 9; background: rgba(var(--slidev-theme-secondary-rgb), 0.04); }

html.dark .tile-3 { background: rgba(var(--slidev-theme-secondary-rgb), 0.03); }

.cover-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 5;
}

.footer-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--slidev-theme-primary) 0%,
    var(--slidev-theme-secondary) 50%,
    transparent 100%
  );
  opacity: 0.6;
}
</style>
