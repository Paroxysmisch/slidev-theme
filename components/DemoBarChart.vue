<script setup lang="ts">
import type { ChartConfig } from './ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from './ui/chart'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]
type Data = (typeof data)[number]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

const months = data.map(d => d.month)
</script>

<template>
  <ChartContainer :config="chartConfig" class="w-full" style="height: 300px;">
    <VisXYContainer :data="data" :padding="{ top: 10 }">
      <VisGroupedBar
        :x="(_: Data, i: number) => i"
        :y="[(d: Data) => d.desktop, (d: Data) => d.mobile]"
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
        :bar-padding="0.2"
        :rounded-corners="4"
      />
      <VisAxis
        type="x"
        :x="(_: Data, i: number) => i"
        :tick-format="(i: number) => months[i] ?? ''"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
      />
      <VisAxis
        type="y"
        :tick-line="false"
        :domain-line="false"
        :grid-line="true"
        :tick-format="(d: number) => d > 0 ? `${d}` : ''"
      />
      <ChartTooltip />
      <ChartCrosshair
        :template="componentToString(chartConfig, ChartTooltipContent)"
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
