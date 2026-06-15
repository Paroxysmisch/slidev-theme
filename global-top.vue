<script setup lang="ts">
import { onMounted } from 'vue'

// Load Source Serif 4 from Google Fonts (not available via Slidev's font slots)
onMounted(() => {
  if (typeof document !== 'undefined' && !document.querySelector('link[data-aurora-fonts]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.dataset.auroraFonts = ''
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap'
    document.head.appendChild(link)
  }
})
</script>

<template>
  <AnimatedBackground />
</template>
