<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">AI硬件价格分布与"死亡区间"分析</h3>
    <p class="chart-subtitle">8个品类40+产品价格分布 | 标注$179-249失败陷阱</p>
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
    <div class="insights-grid">
      <div class="insight-card death-zone">
        <div class="insight-title">⚠️ 死亡区间</div>
        <div class="insight-value">$179-249</div>
        <div class="insight-detail">Anki $249破产 | 毛利率仅30%</div>
      </div>
      <div class="insight-card success-zone">
        <div class="insight-title">✅ 入门成功区</div>
        <div class="insight-value">&lt;$179</div>
        <div class="insight-detail">mBot $99 | Limitless $99</div>
      </div>
      <div class="insight-card success-zone">
        <div class="insight-title">✅ 中端成功区</div>
        <div class="insight-value">$450-600</div>
        <div class="insight-detail">Loona $475 | ElliQ $599</div>
      </div>
      <div class="insight-card success-zone">
        <div class="insight-title">✅ 高端成功区</div>
        <div class="insight-value">&gt;$2,500</div>
        <div class="insight-detail">Sony Aibo $2,899 (50%+毛利)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BoxplotChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useData } from 'vitepress'
import { productsByCategory, categoryNames, calculatePriceStats, DEATH_ZONE } from '../../data/productsData'

use([
  CanvasRenderer,
  BoxplotChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
])

const { isDark } = useData()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const chartTheme = computed(() => isDark.value ? 'dark' : undefined)

// 准备箱线图数据
const categories = Object.keys(productsByCategory) as Array<keyof typeof productsByCategory>
const categoryLabels = categories.map(cat => categoryNames[cat])

// 计算每个品类的箱线图数据 [min, Q1, median, Q3, max]
const boxData = categories.map(category => {
  const stats = calculatePriceStats(productsByCategory[category])
  return [stats.min, stats.q1, stats.median, stats.q3, stats.max]
})

// 标记超出死亡区间的异常值
const outliers = categories.flatMap((category, catIndex) => {
  return productsByCategory[category]
    .filter(p => p.status === 'failure' || (p.price >= DEATH_ZONE.min && p.price <= DEATH_ZONE.max))
    .map(p => ({
      name: p.name,
      value: [catIndex, p.price],
      status: p.status
    }))
})

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params: any) => {
      if (params.componentSubType === 'boxplot') {
        const [min, q1, median, q3, max] = params.data
        return `
          <b>${categoryLabels[params.dataIndex]}</b><br/>
          最高: $${max}<br/>
          Q3(75%): $${q3}<br/>
          中位数: $${median}<br/>
          Q1(25%): $${q1}<br/>
          最低: $${min}
        `
      } else if (params.componentSubType === 'scatter') {
        const status = params.data.status === 'failure' ? '❌ 失败' : '⚠️ 警告'
        return `
          <b>${params.data.name}</b><br/>
          价格: $${params.data.value[1]}<br/>
          状态: ${status}
        `
      }
      return params.name
    }
  },
  grid: {
    left: '15%',
    right: '5%',
    top: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: categoryLabels,
    axisLabel: {
      interval: 0,
      rotate: 30,
      fontSize: 11
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: '价格 (美元)',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLabel: {
      formatter: '${value}'
    }
  },
  series: [
    // 死亡区间背景标注
    {
      type: 'line',
      markArea: {
        silent: true,
        itemStyle: {
          color: 'rgba(239, 68, 68, 0.15)'
        },
        data: [
          [
            {
              name: '死亡区间',
              yAxis: DEATH_ZONE.min
            },
            {
              yAxis: DEATH_ZONE.max
            }
          ]
        ],
        label: {
          show: true,
          position: 'insideTop',
          formatter: '死亡区间 $179-249',
          fontSize: 12,
          color: '#dc2626',
          fontWeight: 'bold'
        }
      }
    },
    // 箱线图
    {
      name: '价格分布',
      type: 'boxplot',
      data: boxData,
      itemStyle: {
        color: '#3b82f6',
        borderColor: '#1e40af'
      },
      emphasis: {
        itemStyle: {
          color: '#60a5fa',
          borderColor: '#2563eb',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      }
    },
    // 失败产品标注
    {
      name: '失败/警告产品',
      type: 'scatter',
      data: outliers,
      symbolSize: 12,
      itemStyle: {
        color: (params: any) => {
          return params.data.status === 'failure' ? '#ef4444' : '#f97316'
        }
      },
      emphasis: {
        scale: 1.5,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      z: 2
    }
  ]
}))
</script>

<style scoped>
.chart-wrapper {
  margin: 2rem 0;
  padding: 1.5rem;
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
  margin-bottom: 1.5rem;
}

.chart {
  width: 100%;
  height: 500px;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.insight-card {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s;
}

.insight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.death-zone {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 2px solid #ef4444;
}

.success-zone {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
  border: 2px solid #10b981;
}

.insight-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.death-zone .insight-title {
  color: #dc2626;
}

.success-zone .insight-title {
  color: #059669;
}

.insight-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.death-zone .insight-value {
  color: #ef4444;
}

.success-zone .insight-value {
  color: #10b981;
}

.insight-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .chart {
    height: 450px;
  }

  .chart-container {
    min-height: 450px;
  }

  .insights-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .chart-wrapper {
    padding: 1rem;
  }
}
</style>