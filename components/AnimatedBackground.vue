<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo, clicks } = useNav()

/**
 * Generate a pseudo-random number from a seed (deterministic per slide).
 * This ensures each slide gets a unique but consistent blob arrangement.
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123
  return x - Math.floor(x)
}

const blobPositions = computed(() => {
  const slide = currentSlideNo.value
  const s1 = seededRandom(slide)
  const s2 = seededRandom(slide + 100)
  const s3 = seededRandom(slide + 200)
  const s4 = seededRandom(slide + 300)

  return {
    blob1: {
      x: 10 + s1 * 40,
      y: 10 + s2 * 30,
      scale: 0.8 + s3 * 0.6,
      rotation: s4 * 360,
    },
    blob2: {
      x: 50 + s2 * 40,
      y: 50 + s3 * 40,
      scale: 0.7 + s1 * 0.5,
      rotation: s2 * 360,
    },
    blob3: {
      x: 20 + s3 * 60,
      y: 60 + s4 * 30,
      scale: 0.6 + s4 * 0.6,
      rotation: s3 * 360,
    },
  }
})

const blob1Style = computed(() => {
  const b = blobPositions.value.blob1
  return {
    left: `${b.x}%`,
    top: `${b.y}%`,
    transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.rotation}deg)`,
  }
})

const blob2Style = computed(() => {
  const b = blobPositions.value.blob2
  return {
    left: `${b.x}%`,
    top: `${b.y}%`,
    transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.rotation}deg)`,
  }
})

const blob3Style = computed(() => {
  const b = blobPositions.value.blob3
  return {
    left: `${b.x}%`,
    top: `${b.y}%`,
    transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.rotation}deg)`,
  }
})
</script>

<template>
  <div class="animated-bg" aria-hidden="true">
    <!-- Gradient blobs that move per slide -->
    <div class="blob blob-primary" :style="blob1Style" />
    <div class="blob blob-secondary" :style="blob2Style" />
    <div class="blob blob-accent" :style="blob3Style" />

    <!-- Subtle grid pattern overlay -->
    <div class="grid-overlay" />

    <!-- Noise texture for depth -->
    <div class="noise-overlay" />
  </div>
</template>

<style scoped>
.animated-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--slidev-theme-bg);
  overflow: hidden;
}

.blob {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, left, top;
}

html.dark .blob {
  opacity: 0.12;
}

.blob-primary {
  background: radial-gradient(
    circle,
    var(--slidev-theme-primary) 0%,
    transparent 70%
  );
}

.blob-secondary {
  background: radial-gradient(
    circle,
    var(--slidev-theme-secondary) 0%,
    transparent 70%
  );
}

.blob-accent {
  background: radial-gradient(
    circle,
    var(--slidev-theme-accent, var(--slidev-theme-primary)) 0%,
    transparent 70%
  );
  opacity: 0.08;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--slidev-theme-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--slidev-theme-border) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.4;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
}

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
</style>
