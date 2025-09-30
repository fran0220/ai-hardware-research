<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">AI硬件品类CAGR增长率对比</h3>
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
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useData } from 'vitepress'
import { marketCategoriesSortedByCAGR, parseCAGR } from '../../data/marketData'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
])

const { isDark } = useData()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const chartTheme = computed(() => isDark.value ? 'dark' : undefined)

const chartOption = computed(() => {
  const categories = marketCategoriesSortedByCAGR
  const names = categories.map(c => c.name)
  const cagrValues = categories.map(c => parseCAGR(c.cagr))

  // 根据CAGR值设置颜色
  const colors = cagrValues.map(value => {
    if (value >= 30) return '#ef4444' // 红色 - 爆发期
    if (value >= 20) return '#f97316' // 橙色 - 高增长
    if (value >= 15) return '#eab308' // 黄色 - 中增长
    return '#10b981' // 绿色 - 稳定增长
  })

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const item = params[0]
        const category = categories[item.dataIndex]
        return `
          <b>${item.name}</b><br/>
          CAGR: <b>${category.cagr}</b><br/>
          成熟度: ${category.maturity}
        `
      }
    },
    grid: {
      left: '25%',
      right: '5%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'CAGR增长率 (%)',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLabel: {
        fontSize: 12,
        interval: 0
      }
    },
    series: [
      {
        name: 'CAGR',
        type: 'bar',
        data: cagrValues,
        itemStyle: {
          color: (params: any) => colors[params.dataIndex]
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontSize: 11
        },
        emphasis: {
          focus: 'self',
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
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
  min-height: 600px;
}

.chart {
  width: 100%;
  height: 600px;
}

@media (max-width: 768px) {
  .chart {
    height: 800px;
  }

  .chart-container {
    min-height: 800px;
  }

  .chart-wrapper {
    padding: 0.5rem;
  }
}
</style>