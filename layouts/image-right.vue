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
  <div class="slidev-layout image-right">
    <div class="flex flex-col justify-center" style="padding: var(--slidev-theme-pad-edge);">
      <slot />
    </div>
    <div class="w-full h-full" :style="style" />
  </div>
</template>
