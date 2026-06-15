<script setup lang="ts">
/**
 * Footnote component — renders a numbered footnote at the bottom of the slide.
 *
 * Usage in slides.md:
 *
 *   Some claim<Ref n="1" /> and another<Ref n="2" />.
 *
 *   <Footnote n="1">Source: Author, 2024</Footnote>
 *   <Footnote n="2">See also: example.com</Footnote>
 */
defineProps<{
  n: string | number
}>()
</script>

<template>
  <div class="footnote-item">
    <span class="footnote-n">{{ n }}</span>
    <span class="footnote-text"><slot /></span>
  </div>
</template>

<style>
.footnote-item {
  position: absolute;
  bottom: calc(28px + (var(--footnote-index, 0)) * 1.6em);
  left: var(--slidev-theme-pad-edge, 40px);
  right: var(--slidev-theme-pad-edge, 40px);
  display: flex;
  align-items: baseline;
  gap: 0.5em;
  font-family: 'Source Serif 4', 'Source Serif Pro', Georgia, serif;
  font-size: clamp(10px, 0.72vw, 12px);
  color: var(--slidev-theme-ink-secondary);
  opacity: 0.6;
  z-index: 10;
}

.footnote-n {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.85em;
  font-weight: 500;
  min-width: 1.2em;
}

.footnote-text {
  line-height: 1.5;
}

/* Stack multiple footnotes from bottom up */
.footnote-item:nth-last-of-type(1) { --footnote-index: 0; }
.footnote-item:nth-last-of-type(2) { --footnote-index: 1; }
.footnote-item:nth-last-of-type(3) { --footnote-index: 2; }
.footnote-item:nth-last-of-type(4) { --footnote-index: 3; }
.footnote-item:nth-last-of-type(5) { --footnote-index: 4; }
</style>
