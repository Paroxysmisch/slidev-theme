<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo } = useNav()

function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123
  return x - Math.floor(x)
}

/**
 * Each bloom uses a fixed size and position via CSS,
 * then we shift them with transform: translate + scale.
 * Only `transform` is animated — pure GPU compositing, no layout.
 */
const primaryTransform = computed(() => {
  const s = currentSlideNo.value
  const tx = -20 + seeded(s) * 60        // -20vw to +40vw
  const ty = -15 + seeded(s + 50) * 40   // -15vh to +25vh
  const scale = 0.8 + seeded(s + 100) * 0.6
  return { transform: `translate(${tx}vw, ${ty}vh) scale(${scale})` }
})

const secondaryTransform = computed(() => {
  const s = currentSlideNo.value
  const tx = 10 + seeded(s + 200) * 50
  const ty = 10 + seeded(s + 250) * 50
  const scale = 0.7 + seeded(s + 300) * 0.6
  return { transform: `translate(${tx}vw, ${ty}vh) scale(${scale})` }
})

const accentTransform = computed(() => {
  const s = currentSlideNo.value
  const tx = -10 + seeded(s + 400) * 30
  const ty = 20 + seeded(s + 450) * 40
  const scale = 0.6 + seeded(s + 500) * 0.5
  return { transform: `translate(${tx}vw, ${ty}vh) scale(${scale})` }
})
</script>

<template>
  <div class="aurora-bg" aria-hidden="true">
    <div class="bloom bloom-primary" :style="primaryTransform" />
    <div class="bloom bloom-secondary" :style="secondaryTransform" />
    <div class="bloom bloom-accent" :style="accentTransform" />

    <div class="grid-pattern" />
    <div class="noise-layer" />
  </div>
</template>

<style scoped>
.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--slidev-theme-bg);
  overflow: hidden;
}

.bloom {
  position: absolute;
  left: 0;
  top: 0;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  transition: transform 1.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.bloom-primary {
  background: rgba(var(--slidev-theme-primary-rgb), 0.18);
}

.bloom-secondary {
  background: rgba(var(--slidev-theme-secondary-rgb), 0.14);
}

.bloom-accent {
  background: rgba(var(--slidev-theme-accent-rgb), 0.10);
}

.grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.25;
  background-image: radial-gradient(
    circle 0.8px at center,
    var(--slidev-theme-border) 0.8px,
    transparent 0.8px
  );
  background-size: 40px 40px;
  mask-image: radial-gradient(
    ellipse 75% 65% at 50% 50%,
    black 20%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 75% 65% at 50% 50%,
    black 20%,
    transparent 100%
  );
}

.noise-layer {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  pointer-events: none;
}
</style>
