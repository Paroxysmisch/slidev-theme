<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import configs from '#slidev/configs'

const nav = useNav()

const currentSlideNo = computed(() => nav.currentSlideNo.value)
const totalSlides = computed(() => nav.total.value)
const progress = computed(() => (currentSlideNo.value / totalSlides.value) * 100)

const presentationTitle = computed(() => configs.slidesTitle || 'Untitled')

const currentLayout = computed(() => {
  const route = nav.slides.value?.[currentSlideNo.value - 1]
  return route?.meta?.layout || (currentSlideNo.value === 1 ? 'cover' : 'default')
})

/**
 * Walk backwards from the current slide to find the most recent
 * section/cover heading to use as the current section name.
 */
const currentSection = computed(() => {
  const allSlides = nav.slides.value
  if (!allSlides) return presentationTitle.value

  for (let i = currentSlideNo.value - 1; i >= 0; i--) {
    const route = allSlides[i]
    const layout = route?.meta?.layout || (i === 0 ? 'cover' : 'default')
    if (layout === 'section' || layout === 'cover') {
      const title = route?.meta?.slide?.title
      if (title) return title
    }
  }
  return presentationTitle.value
})

const hidden = computed(() => {
  return currentLayout.value === 'cover' || currentLayout.value === 'end'
})
</script>

<template>
  <div v-if="!hidden" class="aurora-bottom-bar">
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${progress}%` }" />
    </div>
    <div class="bar-content">
      <span class="bar-section">{{ currentSection }}</span>
      <span class="bar-page">
        {{ String(currentSlideNo).padStart(2, '0') }}
        <span class="bar-sep">/</span>
        {{ String(totalSlides).padStart(2, '0') }}
      </span>
    </div>
  </div>
</template>

<style>
.aurora-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  pointer-events: none;
}

.progress-track {
  height: 2px;
  background: var(--slidev-theme-border-soft);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--slidev-theme-primary),
    var(--slidev-theme-secondary)
  );
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px clamp(24px, 2.4vw, 48px);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: clamp(10px, 0.72vw, 12px);
  letter-spacing: 0.04em;
  color: var(--slidev-theme-ink-secondary);
  opacity: 0.6;
}

.bar-section {
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: clamp(9px, 0.65vw, 11px);
}

.bar-sep {
  opacity: 0.4;
  margin: 0 0.3em;
}

.bar-page {
  font-variant-numeric: tabular-nums;
}
</style>
