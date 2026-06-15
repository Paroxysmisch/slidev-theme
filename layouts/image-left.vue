<script setup lang="ts">
import { handleBackground } from '../composables/background'
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: undefined,
  },
})

const style = computed(() => handleBackground(props.image, false))
</script>

<template>
  <div class="slidev-layout image-left">
    <div class="w-full h-full" :style="style" />
    <div class="p-10 flex flex-col justify-center">
      <slot />
    </div>
  </div>
</template>
