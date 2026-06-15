<script setup lang="ts">
import type { ChartConfig } from './ui/chart'
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from './ui/chart'

const data = [
  { month: 'Jan', latency: 320, throughput: 120 },
  { month: 'Feb', latency: 280, throughput: 145 },
  { month: 'Mar', latency: 245, throughput: 168 },
  { month: 'Apr', latency: 190, throughput: 195 },
  { month: 'May', latency: 165, throughput: 220 },
  { month: 'Jun', latency: 142, throughput: 248 },
]
type Data = (typeof data)[number]

const chartConfig = {
  latency: { label: 'p95 Latency (ms)', color: 'var(--chart-1)' },
  throughput: { label: 'Throughput (rps)', color: 'var(--chart-2)' },
} satisfies ChartConfig

const months = data.map(d => d.month)
</script>

<template>
  <ChartContainer :config="chartConfig" class="w-full" style="height: 300px;">
    <VisXYContainer :data="data" :padding="{ top: 10 }">
      <VisLine
        :x="(_: Data, i: number) => i"
        :y="(d: Data) => d.latency"
        :color="chartConfig.latency.color"
        curve-type="monotoneX"
      />
      <VisLine
        :x="(_: Data, i: number) => i"
        :y="(d: Data) => d.throughput"
        :color="chartConfig.throughput.color"
        curve-type="monotoneX"
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
        :color="[chartConfig.latency.color, chartConfig.throughput.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
