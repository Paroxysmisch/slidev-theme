import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    themeVariables: {
      background: 'transparent',
      mainBkg: 'transparent',
      fontFamily: 'Archivo, sans-serif',
      fontSize: '14px',
    },
    xyChart: {
      backgroundColor: 'transparent',
      plotColorPalette: '#6366f1,#06b6d4,#f59e0b,#e11d48,#7c3aed,#10b981',
    },
  }
})
