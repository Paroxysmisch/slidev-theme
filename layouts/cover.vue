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
    <div class="my-auto w-full">
      <slot />
    </div>
    <div class="cover-decoration" aria-hidden="true">
      <div class="cover-line" />
      <div class="cover-line cover-line-2" />
    </div>
  </div>
</template>

<style scoped>
.cover-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  overflow: hidden;
}

.cover-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40%;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--slidev-theme-primary),
    var(--slidev-theme-secondary)
  );
  border-radius: 3px;
  opacity: 0.8;
}

.cover-line-2 {
  left: auto;
  right: 0;
  width: 20%;
  opacity: 0.3;
}
</style>
