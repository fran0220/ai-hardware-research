<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">失败产品资金流向分析 - $1B+投资损失路径</h3>
    <p class="chart-subtitle">追踪Humane/Anki/Google Glass/Jibo的资金流向与最终结局</p>
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
    <div class="failure-stats">
      <div class="stat-item">
        <div class="stat-value">$1B+</div>
        <div class="stat-label">总投资损失</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">5个</div>
        <div class="stat-label">重大失败案例</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">200+</div>
        <div class="stat-label">员工失业(仅Anki)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">$724M</div>
        <div class="stat-label">最大单项损失(Humane)</div>
      </div>
    </div>
    <div class="key-lessons">
      <h4>核心教训</h4>
      <div class="lessons-grid">
        <div v-for="(pattern, key) in failurePatterns" :key="key" class="lesson-card">
          <div class="lesson-title">{{ pattern.title }}</div>
          <div class="lesson-content">{{ pattern.lesson }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useData } from 'vitepress'
import { generateSankeyData, failurePatterns } from '../../data/failureCasesData'

use([
  CanvasRenderer,
  SankeyChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const { isDark } = useData()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const chartTheme = computed(() => isDark.value ? 'dark' : undefined)

const sankeyData = generateSankeyData()

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `
          <b>${params.data.source}</b><br/>
          → ${params.data.target}<br/>
          金额: <b>$${params.data.value}M</b>
        `
      } else {
        return `<b>${params.data.name}</b>`
      }
    }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: sankeyData.nodes,
      links: sankeyData.links,
      lineStyle: {
        color: 'gradient',
        curveness: 0.5,
        opacity: 0.6
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: isDark.value ? '#333' : '#fff'
      },
      label: {
        fontSize: 11,
        color: isDark.value ? '#e5e7eb' : '#1f2937',
        formatter: (params: any) => {
          return params.name
        }
      },
      levels: [
        {
          depth: 0,
          itemStyle: {
            color: '#3b82f6'
          },
          lineStyle: {
            color: 'source',
            opacity: 0.5
          }
        },
        {
          depth: 1,
          itemStyle: {
            color: '#ef4444'
          },
          lineStyle: {
            color: 'source',
            opacity: 0.5
          }
        },
        {
          depth: 2,
          itemStyle: {
            color: '#dc2626'
          },
          lineStyle: {
            color: 'source',
            opacity: 0.5
          }
        },
        {
          depth: 3,
          itemStyle: {
            color: '#6b7280'
          },
          lineStyle: {
            color: 'target',
            opacity: 0.3
          }
        }
      ]
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
  min-height: 600px;
  margin-bottom: 1.5rem;
}

.chart {
  width: 100%;
  height: 600px;
}

.failure-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.key-lessons {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.key-lessons h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.lesson-card {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.lesson-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.lesson-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.lesson-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .chart {
    height: 500px;
  }

  .chart-container {
    min-height: 500px;
  }

  .failure-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .lessons-grid {
    grid-template-columns: 1fr;
  }

  .chart-wrapper {
    padding: 1rem;
  }
}
</style>