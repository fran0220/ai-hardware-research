<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">AI硬件市场规模增长趋势 (2024-2030)</h3>
    <div class="chart-container">
      <ClientOnly>
        <v-chart
          v-if="mounted"
          :option="chartOption"
          :theme="chartTheme"
          autoresize
          class="chart"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useData } from 'vitepress'
import { marketCategories } from '../../data/marketData'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
])

const { isDark } = useData()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const chartTheme = computed(() => isDark.value ? 'dark' : undefined)

// 准备图表数据
const categories = marketCategories.filter(c => c.data2024 && c.data2025 && c.data2030)

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: (params: any) => {
      let result = `<b>${params[0].axisValue}年</b><br/>`
      params.forEach((item: any) => {
        result += `${item.marker} ${item.seriesName}: $${item.value}B<br/>`
      })
      return result
    }
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    top: 10,
    data: categories.map(c => c.name)
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: 80,
    containLabel: true
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      bottom: 10
    }
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2024', '2025', '2030']
  },
  yAxis: {
    type: 'log',
    name: '市场规模(十亿美元, 对数刻度)',
    nameLocation: 'middle',
    nameGap: 50,
    axisLabel: {
      formatter: '${value}B'
    }
  },
  series: categories.map(category => ({
    name: category.name,
    type: 'line',
    smooth: true,
    data: [category.data2024, category.data2025, category.data2030],
    emphasis: {
      focus: 'series'
    },
    lineStyle: {
      width: 2
    },
    showSymbol: true,
    symbolSize: 8
  }))
}))
</script>

<style scoped>
.chart-wrapper {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.chart-title {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: center;
}

.chart-container {
  width: 100%;
  min-height: 500px;
}

.chart {
  width: 100%;
  height: 500px;
}

@media (max-width: 768px) {
  .chart {
    height: 400px;
  }

  .chart-container {
    min-height: 400px;
  }
}
</style>