# Aurora

An editorial-inspired [Slidev](https://github.com/slidevjs/slidev) theme with atmospheric gradient backgrounds, frosted glass elements, and bold serif typography. Designed for developers presenting code, diagrams, charts, and technical content.

## Features

- **Animated backgrounds** — radial gradient blooms that smoothly shift between slides
- **Editorial typography** — Instrument Serif for display headings, Source Serif 4 for body text, Archivo for labels, JetBrains Mono for code
- **Frosted glass** — `.glass` utility class for translucent panels with backdrop blur
- **Full theming** — change primary, secondary, and accent colors via frontmatter
- **Light & dark mode** — first-class support for both, with tuned palettes
- **Charts** — built-in [Unovis](https://unovis.dev/) + [shadcn-vue](https://www.shadcn-vue.com/) chart components
- **Flowcharts** — [Vue Flow](https://vueflow.dev/) integration with themed nodes and edges
- **Progress bar** — bottom bar showing section name, author, slide number, and a gradient progress indicator
- **12 layouts** — cover, intro, default, center, section, statement, quote, fact, two-cols, image-right, image-left, end
- **Custom transitions** — `morph` (vertical shift + blur) and `glow` (scale + brightness)

## Install

### As a local theme

Clone this repository into your project:

```bash
git clone git@github.com:Paroxysmisch/slidev-theme.git
```

Then reference it in your `slides.md`:

```yaml
---
theme: ./slidev-theme
---
```

### From npm (once published)

Add the following frontmatter to your `slides.md`. Slidev will prompt you to install it automatically.

```yaml
---
theme: slidev-theme-aurora
---
```

## Quick Start

```yaml
---
theme: ./slidev-theme
title: My Presentation
transition: morph
themeConfig:
  primary: '#6366f1'
  secondary: '#06b6d4'
  accent: '#f59e0b'
  author: Your Name
---

# Hello World

This is my first slide.
```

## Configuration

All configuration goes in the `themeConfig` section of your frontmatter:

| Key | Default | Description |
|-----|---------|-------------|
| `primary` | `#6366f1` | Primary color — used for headings, links, gradients, bloom accents |
| `secondary` | `#06b6d4` | Secondary color — used for gradients, output nodes, progress bar |
| `accent` | `#f59e0b` | Accent color — used for the third background bloom |
| `author` | `""` | Author name — displayed on the cover slide and in the bottom bar |

### Example: Rose/Violet theme

```yaml
themeConfig:
  primary: '#e11d48'
  secondary: '#7c3aed'
  accent: '#f59e0b'
  author: Jane Doe
```

## Layouts

### `cover`

Title slide with large display serif heading, author name, geometric block tiles, and a gradient accent line. The bottom progress bar is hidden on this layout.

```yaml
---
layout: cover
---

# Presentation Title

Subtitle text
```

### `section`

Section divider with a large centered heading. Use this to introduce new topics.

```yaml
---
layout: section
---

# Section Name
```

### `default`

Standard content slide with a smaller heading, hairline rule separator, and body content.

### `center`

Centered content — good for single statements or closing thoughts.

### `two-cols`

Two-column layout. Use `::right::` to separate content.

```md
---
layout: two-cols
---

# Left Column

Content here.

::right::

Content on the right.
```

### `image-right` / `image-left`

Split layout with an image filling one half.

```yaml
---
layout: image-right
image: https://example.com/photo.jpg
---

# Content on the left
```

### `quote`

Editorial quote layout with serif italic blockquote and attribution.

```md
---
layout: quote
---

> The best way to predict the future is to invent it.

Alan Kay
```

### `fact`

Jumbo display for a single number or word with a gradient fill.

```md
---
layout: fact
---

# 60fps

Smooth transitions between every slide
```

### `statement`

Centered italic serif for a manifesto-style statement.

### `end`

Closing slide with a centered gradient line. Bottom progress bar is hidden.

## Transitions

Set globally in frontmatter or per-slide:

```yaml
---
transition: morph    # default — vertical shift with blur
---
```

```yaml
---
transition: glow     # scale with brightness bloom
---
```

## Components

### `AnimatedBackground`

Rendered automatically on every slide via `global-top.vue`. Three colored gradient blooms shift position per slide using GPU-composited `transform` animations.

### Footnotes

Use `<Ref>` for inline superscript marks and `<Footnote>` for the notes at the bottom of the slide:

```md
Some claim<Ref n="1" /> and another point<Ref n="2" />.

<Footnote n="1">Source: Author, Title, 2024</Footnote>
<Footnote n="2">See also: example.com/paper</Footnote>
```

Footnotes stack upward from the bottom of the slide. Up to 5 footnotes per slide are supported.

### Charts (Unovis + shadcn-vue)

The theme includes [shadcn-vue chart components](https://www.shadcn-vue.com/docs/components/chart) in `components/ui/chart/`. Build bar charts, line graphs, and more using Unovis:

```vue
<script setup>
import { VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { ChartContainer } from './ui/chart'

const data = [
  { month: 'Jan', value: 186 },
  { month: 'Feb', value: 305 },
]

const chartConfig = {
  value: { label: 'Revenue', color: 'var(--chart-1)' },
}
</script>

<template>
  <ChartContainer :config="chartConfig" style="height: 300px;">
    <VisXYContainer :data="data">
      <VisGroupedBar
        :x="(_, i) => i"
        :y="(d) => d.value"
        :color="chartConfig.value.color"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
```

Chart colors (`--chart-1` through `--chart-5`) are defined for both light and dark modes.

### Flowcharts (Vue Flow)

Use [Vue Flow](https://vueflow.dev/) for interactive node-based diagrams. See `components/DemoFlowchart.vue` for an example with themed nodes, edges, and Slidev scale correction.

## Utility Classes

### `.glass`

Apply frosted glass styling to any element:

```html
<div class="glass">
  Content with frosted glass background
</div>
```

### `.micro-label`

Editorial uppercase label in Archivo with wide tracking:

```html
<p class="micro-label">Section Label</p>
```

## CSS Variables

The full set of CSS variables available for custom styling:

| Variable | Description |
|----------|-------------|
| `--slidev-theme-primary` | Primary brand color |
| `--slidev-theme-secondary` | Secondary brand color |
| `--slidev-theme-accent` | Accent / third bloom color |
| `--slidev-theme-bg` | Page background |
| `--slidev-theme-ink` | Primary text color |
| `--slidev-theme-ink-secondary` | Secondary text color |
| `--slidev-theme-border` | Hairline rule color |
| `--slidev-theme-glass-bg` | Frosted glass background |
| `--slidev-theme-glass-border` | Frosted glass border |
| `--slidev-theme-glass-blur` | Backdrop blur radius |
| `--slidev-theme-pad-edge` | Edge padding (responsive) |
| `--chart-1` to `--chart-5` | Chart palette colors |

## Development

```bash
# Install dependencies
bun install

# Start dev server with example slides
bun run dev

# Build for production
bun run build

# Export to PDF
bun run export
```

## License

MIT
