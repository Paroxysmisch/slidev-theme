<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// Load Source Serif 4 from Google Fonts
onMounted(() => {
  if (typeof document !== 'undefined' && !document.querySelector('link[data-aurora-fonts]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.dataset.auroraFonts = ''
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap'
    document.head.appendChild(link)
  }
})

// Inject transparent background styles into Mermaid shadow roots
const mermaidStyle = `
  svg { background: transparent !important; }
  .background { fill: transparent !important; }
  rect.background { fill: transparent !important; }
  svg > rect:first-child { fill: transparent !important; }
  svg[id^="mermaid"] { max-width: 100%; height: auto; }
`

let observer: MutationObserver | null = null

function injectMermaidStyles(root: Element) {
  const shadowRoot = root.shadowRoot
  if (!shadowRoot) return
  if (shadowRoot.querySelector('style[data-aurora]')) return
  const style = document.createElement('style')
  style.dataset.aurora = ''
  style.textContent = mermaidStyle
  shadowRoot.prepend(style)
}

function scanMermaidElements() {
  document.querySelectorAll('.mermaid').forEach(injectMermaidStyles)
}

onMounted(() => {
  if (typeof document === 'undefined') return
  scanMermaidElements()
  observer = new MutationObserver(() => scanMermaidElements())
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <AnimatedBackground />
</template>
