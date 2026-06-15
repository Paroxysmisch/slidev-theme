<script setup lang="ts">
import { handleBackground } from '../composables/background'
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: undefined,
  },
  backgroundSize: {
    type: String,
    default: 'cover',
  },
})

const style = computed(() => handleBackground(props.image, false, props.backgroundSize))
</script>

<template>
  <div class="slidev-layout image-left" style="grid-template-columns: 1fr 1fr; padding: 0;">
    <div class="w-full h-full" :style="style" />
    <div class="flex flex-col justify-center" style="padding: var(--slidev-theme-pad-edge);">
      <slot />
    </div>
  </div>
</template>
