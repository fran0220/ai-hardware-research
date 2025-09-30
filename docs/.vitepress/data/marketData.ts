// 市场规模与增长数据 - 来自表1
export interface MarketCategory {
  id: string
  name: string
  data2024: number | null
  data2025: number | null
  data2030: number | null
  cagr: string
  maturity: string
}

export const marketCategories: MarketCategory[] = [
  {
    id: 'education',
    name: '儿童教育机器人',
    data2024: 1.65,
    data2025: 1.9,
    data2030: 5.84,
    cagr: '13.6-28.8%',
    maturity: '成长期'
  },
  {
    id: 'companion',
    name: '社交陪伴机器人',
    data2024: 2.09,
    data2025: 2.5,
    data2030: 30.38,
    cagr: '32.40%',
    maturity: '成长期'
  },
  {
    id: 'gaming',
    name: '游戏娱乐AI硬件',
    data2024: 3.89,
    data2025: 7.05,
    data2030: 37.89,
    cagr: '20.54%',
    maturity: '早期'
  },
  {
    id: 'pet',
    name: '宠物型机器人',
    data2024: 0.706,
    data2025: 1.07,
    data2030: 2.87,
    cagr: '12.3-18.5%',
    maturity: '早期'
  },
  {
    id: 'wearable',
    name: 'AI可穿戴(智能眼镜)',
    data2024: 0.879,
    data2025: 1.22,
    data2030: 4.13,
    cagr: '29.4%',
    maturity: '爆发期'
  },
  {
    id: 'audio',
    name: 'AI音频设备',
    data2024: 69,
    data2025: 92,
    data2030: 103,
    cagr: '8.27-12.5%',
    maturity: '成长期'
  },
  {
    id: 'creator',
    name: 'AI数字记录创作工具',
    data2024: 14.8,
    data2025: 20,
    data2030: 80.12,
    cagr: '32.5%',
    maturity: '爆发期'
  },
  {
    id: 'smarthome',
    name: '智能家居控制器',
    data2024: 116,
    data2025: 147,
    data2030: 350,
    cagr: '8.5-12%',
    maturity: '成长期'
  },
  {
    id: 'edge',
    name: '边缘AI消费设备',
    data2024: 24.9,
    data2025: 26.1,
    data2030: 66.5,
    cagr: '17.6-21.7%',
    maturity: '成长期'
  },
  {
    id: 'aipc',
    name: 'AI PC/笔记本',
    data2024: 41,
    data2025: 91.23,
    data2030: 260.43,
    cagr: '19.1-44%',
    maturity: '爆发期'
  },
  {
    id: 'neuromorphic',
    name: '神经形态消费硬件',
    data2024: 0.048,
    data2025: 0.21,
    data2030: 1.33,
    cagr: '89.7%',
    maturity: '实验期'
  },
  {
    id: 'agentic',
    name: '代理式AI设备(软件)',
    data2024: null,
    data2025: 7.55,
    data2030: 199.05,
    cagr: '43.84%',
    maturity: '爆发期'
  },
  {
    id: 'accelerator',
    name: 'AI加速器模块',
    data2024: null,
    data2025: 9.26,
    data2030: 60.37,
    cagr: '21.6%',
    maturity: '早期'
  },
  {
    id: 'sensor',
    name: '边缘AI智能传感器',
    data2024: null,
    data2025: 22.1,
    data2030: null,
    cagr: '41.6%',
    maturity: '早期'
  },
  {
    id: 'health',
    name: 'AI健康监测硬件',
    data2024: 71.92,
    data2025: 80,
    data2030: 323.47,
    cagr: '18.04%',
    maturity: '爆发期'
  }
]

// 提取数值型CAGR用于排序和可视化
export function parseCAGR(cagrString: string): number {
  const match = cagrString.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

// 按CAGR排序
export const marketCategoriesSortedByCAGR = [...marketCategories]
  .sort((a, b) => parseCAGR(b.cagr) - parseCAGR(a.cagr))

// 成熟度评分映射
export const maturityScore: Record<string, number> = {
  '实验期': 1,
  '早期': 2,
  '成长期': 3,
  '爆发期': 4
}

// 成熟度颜色映射
export const maturityColor: Record<string, string> = {
  '实验期': '#9333ea',
  '早期': '#3b82f6',
  '成长期': '#10b981',
  '爆发期': '#ef4444'
}