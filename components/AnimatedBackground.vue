<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo } = useNav()

/**
 * Deterministic pseudo-random from a seed.
 * Each slide gets a unique but consistent bloom arrangement.
 */
function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123
  return x - Math.floor(x)
}

/**
 * Primary bloom — large radial gradient of the theme's primary color.
 * Inspired by the "sun-bloom" from Biennale Yellow, but using theme colors.
 */
const primaryBloom = computed(() => {
  const s = currentSlideNo.value
  const cx = 30 + seeded(s) * 45         // 30%–75% horizontal
  const cy = 20 + seeded(s + 50) * 40    // 20%–60% vertical
  const rx = 38 + seeded(s + 100) * 18   // 38%–56% width
  const ry = 32 + seeded(s + 150) * 16   // 32%–48% height

  return {
    background: `radial-gradient(
      ellipse ${rx}% ${ry}% at ${cx}% ${cy}%,
      rgba(var(--slidev-theme-primary-rgb), 0.22) 0%,
      rgba(var(--slidev-theme-primary-rgb), 0.12) 35%,
      rgba(var(--slidev-theme-primary-rgb), 0.04) 60%,
      transparent 85%
    )`,
  }
})

/**
 * Secondary bloom — smaller, placed opposite the primary.
 * Counter-temperature accent like the "ember-bloom".
 */
const secondaryBloom = computed(() => {
  const s = currentSlideNo.value
  const cx = 65 + seeded(s + 200) * 30   // opposite quadrant
  const cy = 55 + seeded(s + 250) * 35
  const size = 320 + seeded(s + 300) * 280

  return {
    background: `radial-gradient(
      circle ${size}px at ${cx}% ${cy}%,
      rgba(var(--slidev-theme-secondary-rgb), 0.14) 0%,
      rgba(var(--slidev-theme-secondary-rgb), 0.05) 45%,
      transparent 75%
    )`,
  }
})

/**
 * Accent bloom — subtle warm touch in a corner.
 */
const accentBloom = computed(() => {
  const s = currentSlideNo.value
  const cx = 10 + seeded(s + 400) * 20
  const cy = 70 + seeded(s + 450) * 25
  const size = 280 + seeded(s + 500) * 200

  return {
    background: `radial-gradient(
      circle ${size}px at ${cx}% ${cy}%,
      rgba(var(--slidev-theme-accent-rgb), 0.10) 0%,
      transparent 65%
    )`,
  }
})
</script>

<template>
  <div class="aurora-bg" aria-hidden="true">
    <!-- Atmospheric gradient blooms — shift per slide -->
    <div class="bloom bloom-primary" :style="primaryBloom" />
    <div class="bloom bloom-secondary" :style="secondaryBloom" />
    <div class="bloom bloom-accent" :style="accentBloom" />

    <!-- Subtle dot grid pattern -->
    <div class="grid-pattern" />

    <!-- Fine noise texture for printed-paper depth -->
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
  inset: 0;
  pointer-events: none;
  transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: background;
}

/* Dot grid — subtle editorial structure */
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

/* Noise overlay — extremely subtle for depth */
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
