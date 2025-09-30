// 8个品类40+产品价格数据 - 来自表12
export interface Product {
  id: string
  name: string
  category: string
  price: number // 美元
  priceRange?: [number, number] // 价格区间
  subscription?: number // 月订阅费
  rating: number
  status: 'success' | 'failure' | 'struggling'
}

export const products: Product[] = [
  // 1. 儿童教育机器人
  { id: 'miko3', name: 'Miko 3', category: 'education', price: 310, priceRange: [199, 420], subscription: 8.25, rating: 4.7, status: 'success' },
  { id: 'mbot', name: 'Makeblock mBot', category: 'education', price: 124, priceRange: [99, 149], rating: 4.5, status: 'success' },
  { id: 'lego-spike', name: 'LEGO SPIKE Prime', category: 'education', price: 389, priceRange: [329, 449], rating: 4.8, status: 'success' },
  { id: 'sphero', name: 'Sphero BOLT+', category: 'education', price: 179, rating: 4.4, status: 'success' },
  { id: 'dash', name: 'Wonder Workshop Dash', category: 'education', price: 179, rating: 4.6, status: 'success' },
  { id: 'ozobot', name: 'Ozobot Evo', category: 'education', price: 114, priceRange: [99, 129], rating: 4.3, status: 'success' },

  // 2. 社交陪伴机器人
  { id: 'elliq', name: 'ElliQ', category: 'companion', price: 599, rating: 4.6, status: 'success' },
  { id: 'loona', name: 'Loona Petbot', category: 'companion', price: 475, priceRange: [450, 500], rating: 4.4, status: 'success' },
  { id: 'tombot', name: 'Tombot Jennie', category: 'companion', price: 374, priceRange: [299, 449], rating: 4.7, status: 'success' },
  { id: 'vector2', name: 'Vector 2.0', category: 'companion', price: 324, priceRange: [299, 349], subscription: 8.25, rating: 4.2, status: 'success' },
  { id: 'lovot', name: 'Lovot', category: 'companion', price: 2900, rating: 4.5, status: 'success' },
  { id: 'jibo', name: 'Jibo', category: 'companion', price: 899, rating: 0, status: 'failure' }, // 失败案例

  // 3. AI可穿戴硬件(智能眼镜)
  { id: 'rayban', name: 'Meta Ray-Ban', category: 'wearable', price: 279, priceRange: [179, 379], rating: 4.5, status: 'success' },
  { id: 'solos', name: 'Solos AirGo Vision', category: 'wearable', price: 249, rating: 4.3, status: 'success' },
  { id: 'halliday', name: 'Halliday Glasses', category: 'wearable', price: 324, priceRange: [299, 349], rating: 4.4, status: 'success' },
  { id: 'rokid', name: 'Rokid AR Lite', category: 'wearable', price: 449, rating: 4.0, status: 'success' },
  { id: 'xreal', name: 'Xreal Air 2 Pro', category: 'wearable', price: 424, priceRange: [399, 449], rating: 4.2, status: 'success' },
  { id: 'brilliant', name: 'Brilliant Labs Frame', category: 'wearable', price: 349, rating: 3.9, status: 'success' },
  { id: 'google-glass', name: 'Google Glass', category: 'wearable', price: 1500, rating: 0, status: 'failure' }, // 失败案例

  // 4. AI PC笔记本
  { id: 'acer-ai', name: 'Acer Aspire 14 AI', category: 'aipc', price: 699, rating: 4.3, status: 'success' },
  { id: 'asus-zenbook', name: 'ASUS Zenbook A14', category: 'aipc', price: 899, rating: 4.7, status: 'success' },
  { id: 'surface7', name: 'Surface Laptop 7', category: 'aipc', price: 999, rating: 4.7, status: 'success' },
  { id: 'hp-omnibook', name: 'HP OmniBook X', category: 'aipc', price: 1099, rating: 4.5, status: 'success' },
  { id: 'samsung-book4', name: 'Samsung Galaxy Book4 Edge', category: 'aipc', price: 949, rating: 4.4, status: 'success' },

  // 5. 代理式AI设备
  { id: 'humane', name: 'Humane AI Pin', category: 'agentic', price: 699, subscription: 24, rating: 1.5, status: 'failure' }, // 失败案例
  { id: 'rabbit', name: 'Rabbit R1', category: 'agentic', price: 199, rating: 2.5, status: 'struggling' },
  { id: 'limitless', name: 'Limitless Pendant', category: 'agentic', price: 99, subscription: 19, rating: 3.8, status: 'success' },
  { id: 'plaud', name: 'Plaud NotePin', category: 'agentic', price: 169, subscription: 6.58, rating: 4.2, status: 'success' },

  // 6. AI健康监测硬件
  { id: 'oura', name: 'Oura Ring', category: 'health', price: 349, subscription: 6, rating: 4.7, status: 'success' },
  { id: 'samsung-ring', name: 'Samsung Galaxy Ring', category: 'health', price: 399, rating: 4.4, status: 'success' },
  { id: 'ultrahuman', name: 'Ultrahuman Ring Air', category: 'health', price: 349, rating: 4.3, status: 'success' },
  { id: 'amazfit', name: 'Amazfit Helio Ring', category: 'health', price: 299, rating: 4.0, status: 'success' },
  { id: 'ringconn', name: 'RingConn Gen 2', category: 'health', price: 279, rating: 4.1, status: 'success' },
  { id: 'movano', name: 'Movano Evie Ring', category: 'health', price: 269, rating: 3.9, status: 'success' },

  // 7. 宠物型机器人
  { id: 'aibo', name: 'Sony Aibo', category: 'pet', price: 2899, rating: 4.6, status: 'success' },
  { id: 'loona-pet', name: 'Loona', category: 'pet', price: 475, priceRange: [450, 500], rating: 4.4, status: 'success' },
  { id: 'anki', name: 'Anki Vector', category: 'pet', price: 249, rating: 0, status: 'failure' }, // 失败案例

  // 8. 游戏娱乐AI硬件
  { id: 'senserobot', name: 'SenseRobot Chess', category: 'gaming', price: 400, priceRange: [300, 500], rating: 4.5, status: 'success' },
  { id: 'square-off', name: 'Square Off Grand Kingdom', category: 'gaming', price: 1499, rating: 4.3, status: 'success' },
  { id: 'chessnut', name: 'ChessNut Air+', category: 'gaming', price: 649, rating: 4.4, status: 'success' },
  { id: 'rtx5090', name: 'NVIDIA RTX 5090', category: 'gaming', price: 1999, rating: 4.8, status: 'success' },
  { id: 'rx8900', name: 'AMD RX 8900 XT', category: 'gaming', price: 899, rating: 4.5, status: 'success' }
]

// 按品类分组
export const productsByCategory = {
  education: products.filter(p => p.category === 'education'),
  companion: products.filter(p => p.category === 'companion'),
  wearable: products.filter(p => p.category === 'wearable'),
  aipc: products.filter(p => p.category === 'aipc'),
  agentic: products.filter(p => p.category === 'agentic'),
  health: products.filter(p => p.category === 'health'),
  pet: products.filter(p => p.category === 'pet'),
  gaming: products.filter(p => p.category === 'gaming')
}

// 品类名称映射
export const categoryNames: Record<string, string> = {
  education: '儿童教育机器人',
  companion: '社交陪伴机器人',
  wearable: 'AI可穿戴硬件',
  aipc: 'AI PC笔记本',
  agentic: '代理式AI设备',
  health: 'AI健康监测',
  pet: '宠物型机器人',
  gaming: '游戏娱乐硬件'
}

// 计算价格统计
export function calculatePriceStats(categoryProducts: Product[]) {
  const prices = categoryProducts.map(p => p.price).sort((a, b) => a - b)
  const n = prices.length

  return {
    min: prices[0],
    q1: prices[Math.floor(n * 0.25)],
    median: prices[Math.floor(n * 0.5)],
    q3: prices[Math.floor(n * 0.75)],
    max: prices[n - 1],
    mean: prices.reduce((a, b) => a + b, 0) / n
  }
}

// 死亡区间常量
export const DEATH_ZONE = {
  min: 179,
  max: 249,
  reason: 'Anki教训: 成本$120→售价$179, 毛利率仅30%',
  examples: ['Anki Vector $249 (破产)', 'Solos AirGo $249 (边缘)', 'Humane $699 (失败)']
}

// 成功价格区间
export const SUCCESS_ZONES = [
  {
    name: '入门区',
    range: [0, 179],
    examples: ['Makeblock mBot $99-149', 'Limitless Pendant $99', 'Sphero $179'],
    strategy: '薄利多销,生态变现'
  },
  {
    name: '中端区',
    range: [450, 600],
    examples: ['Loona $450-500', 'ElliQ $599', 'Meta Ray-Ban $179-379'],
    strategy: '需配合订阅/品牌溢价'
  },
  {
    name: '高端区',
    range: [2500, 5000],
    examples: ['Sony Aibo $2,899', 'Lovot $2,900+'],
    strategy: '高毛利率(>50%), 精品路线'
  }
]