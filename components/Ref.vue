<script setup lang="ts">
/**
 * Inline footnote reference mark — renders a superscript number.
 *
 * Usage:
 *   Some text<Ref n="1" /> with a reference.
 */
defineProps<{
  n: string | number
}>()
</script>

<template>
  <sup class="footnote-ref">{{ n }}</sup>
</template>

<style>
.footnote-ref {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65em;
  font-weight: 600;
  color: var(--slidev-theme-primary);
  margin-left: 1px;
  margin-right: 1px;
  cursor: default;
  vertical-align: super;
  line-height: 0;
}
</style>
