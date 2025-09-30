// 失败案例详细数据 - 来自表13
export interface FailureCase {
  id: string
  name: string
  funding: number // 融资总额(百万美元)
  valuation: number // 峰值估值(百万美元)
  failureDate: string
  outcome: string
  lossAmount: number // 投资者损失(百万美元)
  returnRate?: number // 退货率(%)
  failureReasons: FailureReason[]
  lessons: string[]
  category: string
}

export interface FailureReason {
  id: number
  title: string
  detail: string
  impact: 'critical' | 'major' | 'moderate'
}

export const failureCases: FailureCase[] = [
  {
    id: 'humane',
    name: 'Humane AI Pin',
    funding: 240,
    valuation: 850,
    failureDate: '2025年3月',
    outcome: 'HP以$116M收购',
    lossAmount: 724,
    returnRate: 10,
    category: '代理式AI设备',
    failureReasons: [
      {
        id: 1,
        title: '产品定位错误',
        detail: '"取代手机"定位错误,现实是所有功能手机都能做',
        impact: 'critical'
      },
      {
        id: 2,
        title: '技术不成熟',
        detail: '过热问题,仅2-3小时续航,用户体验极差',
        impact: 'critical'
      },
      {
        id: 3,
        title: '价格定位灾难',
        detail: '$699硬件+$24/月订阅=$1,275两年成本',
        impact: 'critical'
      },
      {
        id: 4,
        title: '形态因素失败',
        detail: '胸针形态社交尴尬,佩戴场景受限',
        impact: 'major'
      },
      {
        id: 5,
        title: '营销过度承诺',
        detail: 'TED演讲展示未实现功能,期望值管理失败',
        impact: 'major'
      }
    ],
    lessons: [
      '垂直场景>通用平台',
      '技术成熟度优先',
      '价格理性($199以下)',
      '形态要社交可接受'
    ]
  },
  {
    id: 'anki',
    name: 'Anki (Vector/Cozmo)',
    funding: 200,
    valuation: 1000,
    failureDate: '2019年破产',
    outcome: '完全破产,资产清算',
    lossAmount: 200,
    category: '宠物型机器人',
    failureReasons: [
      {
        id: 1,
        title: '硬件成本失控',
        detail: 'Cozmo成本$120→售价$179,毛利率仅30%',
        impact: 'critical'
      },
      {
        id: 2,
        title: '无订阅收入模式',
        detail: '一次性销售,用户买完就不再付费,无持续收入',
        impact: 'critical'
      },
      {
        id: 3,
        title: '产品定位模糊',
        detail: '既是玩具又是科技产品,两头不讨好',
        impact: 'major'
      },
      {
        id: 4,
        title: '市场规模误判',
        detail: '愿意买$179-249机器人宠物的人远少于预期',
        impact: 'critical'
      },
      {
        id: 5,
        title: '融资timing失败',
        detail: '"Last minute"融资deal失败,现金流断裂',
        impact: 'critical'
      }
    ],
    lessons: [
      '硬件毛利必须>40%',
      '订阅收入不可或缺',
      '定位清晰(高端/低端)',
      '$179-249是"死亡区间"'
    ]
  },
  {
    id: 'google-glass',
    name: 'Google Glass',
    funding: 500, // 估算
    valuation: 0, // Google内部项目
    failureDate: '2015年停售',
    outcome: '产品停售,转向企业市场',
    lossAmount: 500,
    category: 'AI可穿戴硬件',
    failureReasons: [
      {
        id: 1,
        title: '隐私噩梦',
        detail: '"Glasshole"一词诞生,佩戴者被驱逐出酒吧/餐厅',
        impact: 'critical'
      },
      {
        id: 2,
        title: '价格离谱',
        detail: '$1,500定价远超消费者承受范围',
        impact: 'critical'
      },
      {
        id: 3,
        title: '技术不成熟',
        detail: '仅2-3小时续航,发热严重',
        impact: 'major'
      },
      {
        id: 4,
        title: '缺乏杀手应用',
        detail: '功能演示炫酷,但日常使用场景不明确',
        impact: 'major'
      },
      {
        id: 5,
        title: '设计太"科技感"',
        detail: '外观科技感强,但不符合时尚审美',
        impact: 'moderate'
      }
    ],
    lessons: [
      '隐私LED必须明显',
      '时尚品牌合作(Ray-Ban)',
      '价格$179-379',
      '先做内容捕捉后做AR'
    ]
  },
  {
    id: 'jibo',
    name: 'Jibo',
    funding: 72.6,
    valuation: 100, // 估算
    failureDate: '2019年服务器关闭',
    outcome: '服务器关闭,机器人变"砖头"',
    lossAmount: 72.6,
    category: '社交陪伴机器人',
    failureReasons: [
      {
        id: 1,
        title: '价格过高',
        detail: '$899定价 vs $50的Amazon Echo智能音箱',
        impact: 'critical'
      },
      {
        id: 2,
        title: '移动性缺失',
        detail: '固定桌面,互动场景受限',
        impact: 'major'
      },
      {
        id: 3,
        title: '云依赖致命',
        detail: '服务器关闭后机器人完全无法使用',
        impact: 'critical'
      },
      {
        id: 4,
        title: '功能不足',
        detail: '功能不如Alexa,价格却是18倍',
        impact: 'major'
      },
      {
        id: 5,
        title: '市场timing错误',
        detail: '智能音箱爆发期,固定机器人失去竞争力',
        impact: 'major'
      }
    ],
    lessons: [
      '云服务必须有本地备份',
      '移动性提升互动',
      '价格竞争智能音箱',
      'B2G模式更稳定(ElliQ)'
    ]
  },
  {
    id: 'rabbit-r1',
    name: 'Rabbit R1',
    funding: 30,
    valuation: 100, // 估算
    failureDate: '2024年差评如潮',
    outcome: '降价$199→$99,挣扎自救中',
    lossAmount: 0, // 尚未破产
    category: '代理式AI设备',
    failureReasons: [
      {
        id: 1,
        title: 'LAM技术不成熟',
        detail: 'Large Action Model执行成功率低',
        impact: 'critical'
      },
      {
        id: 2,
        title: '安全隐患',
        detail: '明文存储用户密码,被安全研究员曝光',
        impact: 'critical'
      },
      {
        id: 3,
        title: 'APP能做同样的事',
        detail: '所有功能手机APP都能实现,硬件无价值',
        impact: 'critical'
      },
      {
        id: 4,
        title: '初期bug太多',
        detail: '发布时功能不完整,bug频发',
        impact: 'major'
      },
      {
        id: 5,
        title: '"取代手机"定位错误',
        detail: '与Humane同样的错误,定位过于激进',
        impact: 'critical'
      }
    ],
    lessons: [
      '快速迭代可自救',
      '降价+功能更新',
      '承认错误,调整定位',
      '⚠️ 仍在观察中'
    ]
  }
]

// 桑基图数据结构
export interface SankeyNode {
  name: string
  itemStyle?: {
    color?: string
  }
}

export interface SankeyLink {
  source: string
  target: string
  value: number
  lineStyle?: {
    color?: string
  }
}

// 生成桑基图数据
export function generateSankeyData(): { nodes: SankeyNode[]; links: SankeyLink[] } {
  const nodes: SankeyNode[] = [
    // 融资来源
    { name: '风险投资', itemStyle: { color: '#3b82f6' } },

    // 失败产品
    { name: 'Humane AI Pin\n$240M融资', itemStyle: { color: '#ef4444' } },
    { name: 'Anki\n$200M融资', itemStyle: { color: '#ef4444' } },
    { name: 'Google Glass\n$500M投入', itemStyle: { color: '#ef4444' } },
    { name: 'Jibo\n$72.6M融资', itemStyle: { color: '#ef4444' } },

    // 中间节点
    { name: '产品失败', itemStyle: { color: '#dc2626' } },
    { name: '破产清算', itemStyle: { color: '#7f1d1d' } },
    { name: '停售转型', itemStyle: { color: '#92400e' } },

    // 最终结果
    { name: 'HP收购$116M', itemStyle: { color: '#6b7280' } },
    { name: '投资者损失$724M', itemStyle: { color: '#1f2937' } },
    { name: '资产清算', itemStyle: { color: '#1f2937' } },
    { name: '员工失业200+', itemStyle: { color: '#1f2937' } },
    { name: '品牌受损', itemStyle: { color: '#1f2937' } },
    { name: '机器人变砖', itemStyle: { color: '#1f2937' } }
  ]

  const links: SankeyLink[] = [
    // Humane路径
    { source: '风险投资', target: 'Humane AI Pin\n$240M融资', value: 240 },
    { source: 'Humane AI Pin\n$240M融资', target: '产品失败', value: 240 },
    { source: '产品失败', target: 'HP收购$116M', value: 116 },
    { source: '产品失败', target: '投资者损失$724M', value: 724 },

    // Anki路径
    { source: '风险投资', target: 'Anki\n$200M融资', value: 200 },
    { source: 'Anki\n$200M融资', target: '破产清算', value: 200 },
    { source: '破产清算', target: '资产清算', value: 100 },
    { source: '破产清算', target: '员工失业200+', value: 100 },

    // Google Glass路径
    { source: '风险投资', target: 'Google Glass\n$500M投入', value: 500 },
    { source: 'Google Glass\n$500M投入', target: '停售转型', value: 500 },
    { source: '停售转型', target: '品牌受损', value: 500 },

    // Jibo路径
    { source: '风险投资', target: 'Jibo\n$72.6M融资', value: 72.6 },
    { source: 'Jibo\n$72.6M融资', target: '产品失败', value: 72.6 },
    { source: '产品失败', target: '机器人变砖', value: 72.6 }
  ]

  return { nodes, links }
}

// 失败模式分类
export const failurePatterns = {
  pricing: {
    title: '价格失败模式',
    cases: ['Google Glass $1,500', 'Humane $699', 'Jibo $899'],
    deathZone: '$179-249',
    lesson: '成功定价: 入门<$179, 高端>$2,500, 中端$450+订阅'
  },
  technology: {
    title: '技术不成熟模式',
    cases: ['续航2-3h (Glass/Humane)', '过热问题 (Humane)', '云依赖 (Jibo)'],
    lesson: '技术成熟度是产品发布的前提'
  },
  business: {
    title: '商业模式失败',
    cases: ['无订阅+低毛利 (Anki 30%)', '过度订阅 (Whoop $30/月)'],
    lesson: '硬件毛利>40% + 合理订阅($6/月)'
  },
  positioning: {
    title: '产品定位错误',
    cases: ['"取代手机"陷阱 (Humane/Rabbit)', '定位模糊 (Anki)'],
    lesson: '专注垂直场景,不做通用平台'
  },
  social: {
    title: '社会/文化失败',
    cases: ['隐私噩梦 (Glass "Glasshole")', '形态尴尬 (Humane胸针)'],
    lesson: '时尚优先 + 隐私LED + 社交可接受'
  }
}