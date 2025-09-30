<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">技术成熟度 × 市场规模投资矩阵</h3>
    <p class="chart-subtitle">气泡大小代表CAGR增长率 | 点击气泡查看详细报告</p>
    <div class="chart-container">
      <ClientOnly>
        <v-chart
          v-if="mounted"
          :option="chartOption"
          :theme="chartTheme"
          autoresize
          class="chart"
          @click="handleChartClick"
        />
      </ClientOnly>
    </div>
    <div class="legend-info">
      <div class="legend-item">
        <span class="dot" style="background: #9333ea;"></span>
        <span>实验期</span>
      </div>
      <div class="legend-item">
        <span class="dot" style="background: #3b82f6;"></span>
        <span>早期</span>
      </div>
      <div class="legend-item">
        <span class="dot" style="background: #10b981;"></span>
        <span>成长期</span>
      </div>
      <div class="legend-item">
        <span class="dot" style="background: #ef4444;"></span>
        <span>爆发期</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useData, useRouter } from 'vitepress'
import { marketCategories, maturityScore, maturityColor, parseCAGR } from '../../data/marketData'

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
])

const { isDark } = useData()
const router = useRouter()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const chartTheme = computed(() => isDark.value ? 'dark' : undefined)

// 品类ID到路由的映射
const categoryRoutes: Record<string, string> = {
  'education': '/categories/education-robots',
  'companion': '/categories/companion-robots',
  'gaming': '/categories/gaming-hardware',
  'pet': '/categories/pet-robots',
  'wearable': '/categories/smart-glasses',
  'aipc': '/categories/ai-pc',
  'agentic': '/categories/agentic-devices',
  'health': '/categories/health-wearables'
}

const handleChartClick = (params: any) => {
  if (params.componentType === 'series') {
    const category = marketCategories[params.dataIndex]
    const route = categoryRoutes[category.id]
    if (route) {
      router.go(route)
    }
  }
}

const chartOption = computed(() => {
  // 准备数据: [成熟度评分, 2025市场规模, CAGR, 品类名, 成熟度名称]
  const bubbleData = marketCategories
    .filter(c => c.data2025)
    .map(c => ({
      value: [
        maturityScore[c.maturity] || 0,
        c.data2025 || 0,
        parseCAGR(c.cagr),
        c.name,
        c.maturity
      ],
      itemStyle: {
        color: maturityColor[c.maturity] || '#666'
      }
    }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const [maturity, marketSize, cagr, name, maturityName] = params.value
        return `
          <b>${name}</b><br/>
          成熟度: ${maturityName}<br/>
          2025市场规模: $${marketSize}B<br/>
          CAGR: ${cagr}%<br/>
          <i style="color: #999; font-size: 11px;">点击查看详细报告</i>
        `
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      name: '技术成熟度',
      nameLocation: 'middle',
      nameGap: 30,
      data: ['', '实验期', '早期', '成长期', '爆发期'],
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'log',
      name: '2025年市场规模 (十亿美元, 对数刻度)',
      nameLocation: 'middle',
      nameGap: 60,
      axisLabel: {
        formatter: '${value}B'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'AI硬件品类',
        type: 'scatter',
        symbolSize: (data: number[]) => {
          // 气泡大小根据CAGR设置 (索引2是CAGR)
          return Math.sqrt(data[2]) * 3 + 10
        },
        data: bubbleData,
        emphasis: {
          focus: 'self',
          scale: 1.2
        },
        label: {
          show: true,
          formatter: (params: any) => params.value[3], // 显示品类名
          position: 'top',
          fontSize: 10
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
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: center;
}

.chart-subtitle {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.chart-container {
  width: 100%;
  min-height: 500px;
}

.chart {
  width: 100%;
  height: 500px;
  cursor: pointer;
}

.legend-info {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 768px) {
  .chart {
    height: 400px;
  }

  .chart-container {
    min-height: 400px;
  }

  .legend-info {
    gap: 1rem;
  }
}
</style>