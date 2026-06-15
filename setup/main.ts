import { defineAppSetup } from '@slidev/types'

/**
 * On mount, compute RGB triplet versions of theme colors
 * so we can use rgba() in CSS. Slidev auto-maps themeConfig
 * keys to --slidev-theme-* CSS vars, but we need the RGB split.
 */
function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

function syncRgbVars() {
  const root = document.documentElement
  const style = getComputedStyle(root)

  for (const key of ['primary', 'secondary']) {
    const value = style.getPropertyValue(`--slidev-theme-${key}`).trim()
    if (value) {
      const rgb = hexToRgb(value)
      if (rgb) root.style.setProperty(`--slidev-theme-${key}-rgb`, rgb)
    }
  }
}

export default defineAppSetup(({ app }) => {
  if (typeof window !== 'undefined') {
    // Sync once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncRgbVars)
    } else {
      syncRgbVars()
    }
    // Re-sync when dark mode toggles (colors might change)
    const observer = new MutationObserver(syncRgbVars)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
})
