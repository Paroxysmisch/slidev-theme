<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { VueFlow, useVueFlow, Position } from '@vue-flow/core'

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 0, y: 30 },
    data: { label: 'Markdown' },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    position: { x: 200, y: 0 },
    data: { label: 'Parse AST' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    position: { x: 200, y: 80 },
    data: { label: 'Extract Frontmatter' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '4',
    position: { x: 430, y: 30 },
    data: { label: 'Vue SFC' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '5',
    position: { x: 620, y: 0 },
    data: { label: 'Apply Theme' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    position: { x: 620, y: 80 },
    data: { label: 'Compile Styles' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'output',
    position: { x: 850, y: 30 },
    data: { label: 'Presentation' },
    targetPosition: Position.Left,
  },
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6', animated: true },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e6-7', source: '6', target: '7' },
])

const { onPaneReady } = useVueFlow({ id: 'demo-flow' })
const wrapper = ref<HTMLElement>()

/**
 * Undo Slidev's scale transform on this wrapper so Vue Flow
 * lives in a 1:1 coordinate space where getBoundingClientRect()
 * and offsetWidth agree. We counter-scale and resize the wrapper
 * to fill the same visual area.
 */
function undoSlidevScale() {
  if (!wrapper.value) return
  const slideContent = wrapper.value.closest('.slidev-slide-content') as HTMLElement
  if (!slideContent) return

  const s = parseFloat(
    getComputedStyle(slideContent).getPropertyValue('--slidev-slide-container-scale').trim()
  )
  if (!s || Math.abs(s - 1) < 0.001) return

  const el = wrapper.value
  // Counter-scale: visually shrink by 1/s to undo the ancestor's scale(s)
  el.style.transform = `scale(${1 / s})`
  el.style.transformOrigin = 'top left'
  // Inflate dimensions so the counter-scaled element fills the same visual area
  el.style.width = `${s * 100}%`
  el.style.height = `${s * 300}px`
}

onMounted(async () => {
  await nextTick()
  undoSlidevScale()
})

onPaneReady((instance) => {
  instance.fitView({ padding: 0.2 })
})
</script>

<template>
  <div ref="wrapper" class="flowchart-wrapper">
    <VueFlow
      id="demo-flow"
      :nodes="nodes"
      :edges="edges"
      :zoom-on-scroll="false"
      :pan-on-scroll="false"
      :prevent-scrolling="false"
    />
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.flowchart-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}

.slidev-layout:has(.flowchart-wrapper) {
  overflow: visible;
}

.flowchart-wrapper .vue-flow {
  background: transparent !important;
}

/* Node styling */
.flowchart-wrapper .vue-flow__node-default,
.flowchart-wrapper .vue-flow__node-input,
.flowchart-wrapper .vue-flow__node-output {
  font-family: 'Archivo', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-align: center;
  color: var(--slidev-theme-ink);
  background: var(--slidev-theme-glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--slidev-theme-glass-border);
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: none;
}

.flowchart-wrapper .vue-flow__node.selected,
.flowchart-wrapper .vue-flow__node:focus,
.flowchart-wrapper .vue-flow__node:focus-visible {
  box-shadow: none;
  outline: none;
}

.flowchart-wrapper .vue-flow__node-default.selected,
.flowchart-wrapper .vue-flow__node-default:focus,
.flowchart-wrapper .vue-flow__node-default:focus-visible,
.flowchart-wrapper .vue-flow__node-input.selected,
.flowchart-wrapper .vue-flow__node-input:focus,
.flowchart-wrapper .vue-flow__node-input:focus-visible,
.flowchart-wrapper .vue-flow__node-output.selected,
.flowchart-wrapper .vue-flow__node-output:focus,
.flowchart-wrapper .vue-flow__node-output:focus-visible {
  border-color: var(--slidev-theme-glass-border);
}

.flowchart-wrapper .vue-flow__node-input {
  background: var(--slidev-theme-primary);
  color: white;
  border-color: var(--slidev-theme-primary);
}

.flowchart-wrapper .vue-flow__node-input.selected,
.flowchart-wrapper .vue-flow__node-input:focus,
.flowchart-wrapper .vue-flow__node-input:focus-visible {
  border-color: var(--slidev-theme-primary);
}

.flowchart-wrapper .vue-flow__node-output {
  background: var(--slidev-theme-secondary);
  color: white;
  border-color: var(--slidev-theme-secondary);
}

.flowchart-wrapper .vue-flow__node-output.selected,
.flowchart-wrapper .vue-flow__node-output:focus,
.flowchart-wrapper .vue-flow__node-output:focus-visible {
  border-color: var(--slidev-theme-secondary);
}

/* Edges */
.flowchart-wrapper .vue-flow__edge-path {
  stroke: var(--slidev-theme-ink-secondary);
  stroke-width: 1.5;
}

.flowchart-wrapper .vue-flow__edge.animated path {
  stroke: var(--slidev-theme-primary);
}

.flowchart-wrapper .vue-flow__edge.selected .vue-flow__edge-path {
  stroke: var(--slidev-theme-primary);
}

/* Handles */
.flowchart-wrapper .vue-flow__handle {
  width: 6px;
  height: 6px;
  background: var(--slidev-theme-ink-secondary);
  border: none;
  border-radius: 50%;
}

.flowchart-wrapper .vue-flow__node-input .vue-flow__handle {
  background: rgba(255, 255, 255, 0.7);
}

.flowchart-wrapper .vue-flow__node-output .vue-flow__handle {
  background: rgba(255, 255, 255, 0.7);
}

/* Hide chrome */
.flowchart-wrapper .vue-flow__controls,
.flowchart-wrapper .vue-flow__minimap,
.flowchart-wrapper .vue-flow__attribution {
  display: none;
}
</style>
