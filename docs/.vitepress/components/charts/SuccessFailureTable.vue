<template>
  <div class="table-wrapper">
    <h3 class="table-title">成功 vs 失败产品对比分析</h3>
    <p class="table-subtitle">12个关键维度对比 | 绿色=成功因素 | 红色=失败因素</p>

    <div class="table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="dimension-col">维度</th>
            <th v-for="product in products" :key="product.id" :class="[product.status === 'success' ? 'success-col' : 'failure-col']">
              {{ product.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dim, index) in dimensions" :key="index">
            <td class="dimension-cell">
              <div class="dimension-name">{{ dim.name }}</div>
              <div class="dimension-weight">({{ dim.weight }})</div>
            </td>
            <td v-for="product in products" :key="product.id" :class="getCellClass(dim.id, product.id)">
              <div class="cell-content">
                <div class="cell-icon">{{ getCellIcon(dim.id, product.id) }}</div>
                <div class="cell-value">{{ getCellValue(dim.id, product.id) }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="key-insights">
      <div class="insight-section">
        <h4>✅ 成功模式</h4>
        <ul>
          <li><strong>定价策略</strong>: &lt;$179入门 或 $450-600中端+订阅 或 &gt;$2,500高端</li>
          <li><strong>硬件毛利</strong>: &gt;40% (Sony Aibo 50%+)</li>
          <li><strong>订阅费</strong>: $6/月甜蜜点 (Oura成功模式)</li>
          <li><strong>产品定位</strong>: 垂直场景 (会议记录/健康监测/时尚配饰)</li>
          <li><strong>技术成熟度</strong>: 续航&gt;7h, 无过热问题</li>
          <li><strong>形态设计</strong>: 时尚优先 (Meta+Ray-Ban品牌合作)</li>
        </ul>
      </div>
      <div class="insight-section failure">
        <h4>❌ 失败陷阱</h4>
        <ul>
          <li><strong>定价灾难</strong>: $179-249死亡区间 (Anki), $699+$24/月 (Humane)</li>
          <li><strong>硬件毛利</strong>: &lt;30% 无法持续 (Anki破产)</li>
          <li><strong>产品定位</strong>: "取代手机"陷阱 (Humane/Rabbit共同失败)</li>
          <li><strong>技术不成熟</strong>: 续航2-3h (Google Glass/Humane)</li>
          <li><strong>云依赖</strong>: 服务器关闭=产品死亡 (Jibo变砖头)</li>
          <li><strong>社交尴尬</strong>: 胸针形态 (Humane), "Glasshole"污名 (Google Glass)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 对比产品列表
const products = [
  // 成功案例
  { id: 'oura', name: 'Oura Ring', status: 'success' },
  { id: 'aibo', name: 'Sony Aibo', status: 'success' },
  { id: 'rayban', name: 'Meta Ray-Ban', status: 'success' },
  // 失败案例
  { id: 'humane', name: 'Humane AI Pin', status: 'failure' },
  { id: 'anki', name: 'Anki Vector', status: 'failure' },
  { id: 'glass', name: 'Google Glass', status: 'failure' }
]

// 对比维度
const dimensions = [
  { id: 'pricing', name: '定价策略', weight: '⭐⭐⭐⭐⭐' },
  { id: 'margin', name: '硬件毛利率', weight: '⭐⭐⭐⭐⭐' },
  { id: 'subscription', name: '订阅模式', weight: '⭐⭐⭐⭐' },
  { id: 'battery', name: '续航/功耗', weight: '⭐⭐⭐⭐' },
  { id: 'positioning', name: '产品定位', weight: '⭐⭐⭐⭐⭐' },
  { id: 'form', name: '形态设计', weight: '⭐⭐⭐⭐' },
  { id: 'privacy', name: '隐私保护', weight: '⭐⭐⭐' },
  { id: 'market', name: '市场规模判断', weight: '⭐⭐⭐⭐' },
  { id: 'cloud', name: '云依赖风险', weight: '⭐⭐⭐' },
  { id: 'funding', name: '融资节奏', weight: '⭐⭐⭐' },
  { id: 'ecosystem', name: '生态建设', weight: '⭐⭐⭐⭐' },
  { id: 'feedback', name: '用户反馈', weight: '⭐⭐⭐⭐' }
]

// 对比数据
const comparisonData: Record<string, Record<string, { value: string; status: 'good' | 'bad' | 'neutral' }>> = {
  pricing: {
    oura: { value: '$349+$6/月', status: 'good' },
    aibo: { value: '$2,899高端', status: 'good' },
    rayban: { value: '$179-379', status: 'good' },
    humane: { value: '$699+$24/月', status: 'bad' },
    anki: { value: '$249死亡区', status: 'bad' },
    glass: { value: '$1,500过高', status: 'bad' }
  },
  margin: {
    oura: { value: '>40%', status: 'good' },
    aibo: { value: '50%+', status: 'good' },
    rayban: { value: '~45%', status: 'good' },
    humane: { value: '~35%', status: 'bad' },
    anki: { value: '30%致命', status: 'bad' },
    glass: { value: '未知', status: 'neutral' }
  },
  subscription: {
    oura: { value: '$6/月成功', status: 'good' },
    aibo: { value: '可选', status: 'good' },
    rayban: { value: '无(免费AI)', status: 'good' },
    humane: { value: '$24/月过高', status: 'bad' },
    anki: { value: '无收入', status: 'bad' },
    glass: { value: '无', status: 'neutral' }
  },
  battery: {
    oura: { value: '7天续航', status: 'good' },
    aibo: { value: '2h+充电', status: 'good' },
    rayban: { value: '4-6h适中', status: 'good' },
    humane: { value: '2-3h差', status: 'bad' },
    anki: { value: '3-4h', status: 'neutral' },
    glass: { value: '2-3h差', status: 'bad' }
  },
  positioning: {
    oura: { value: '睡眠垂直', status: 'good' },
    aibo: { value: '高端宠物', status: 'good' },
    rayban: { value: '时尚配饰', status: 'good' },
    humane: { value: '取代手机❌', status: 'bad' },
    anki: { value: '定位模糊', status: 'bad' },
    glass: { value: '定位不明', status: 'bad' }
  },
  form: {
    oura: { value: '戒指时尚', status: 'good' },
    aibo: { value: '可爱机器狗', status: 'good' },
    rayban: { value: 'Ray-Ban品牌', status: 'good' },
    humane: { value: '胸针尴尬', status: 'bad' },
    anki: { value: '桌面受限', status: 'bad' },
    glass: { value: '科技感强', status: 'bad' }
  },
  privacy: {
    oura: { value: '无隐私问题', status: 'good' },
    aibo: { value: '本地处理', status: 'good' },
    rayban: { value: 'LED指示', status: 'good' },
    humane: { value: '投影隐私', status: 'neutral' },
    anki: { value: '无问题', status: 'good' },
    glass: { value: 'Glasshole', status: 'bad' }
  },
  market: {
    oura: { value: '准确($11B)', status: 'good' },
    aibo: { value: '小众精准', status: 'good' },
    rayban: { value: '210% YoY', status: 'good' },
    humane: { value: '误判', status: 'bad' },
    anki: { value: '高估', status: 'bad' },
    glass: { value: '过早', status: 'bad' }
  },
  cloud: {
    oura: { value: '本地+云', status: 'good' },
    aibo: { value: '可选云', status: 'good' },
    rayban: { value: '本地优先', status: 'good' },
    humane: { value: '云依赖高', status: 'bad' },
    anki: { value: '云依赖', status: 'bad' },
    glass: { value: '云依赖', status: 'bad' }
  },
  funding: {
    oura: { value: '$875M合理', status: 'good' },
    aibo: { value: 'Sony支持', status: 'good' },
    rayban: { value: 'Meta支持', status: 'good' },
    humane: { value: '$240M烧完', status: 'bad' },
    anki: { value: '$200M失败', status: 'bad' },
    glass: { value: 'Google砍', status: 'bad' }
  },
  ecosystem: {
    oura: { value: '健康生态', status: 'good' },
    aibo: { value: 'Sony生态', status: 'good' },
    rayban: { value: 'Meta生态', status: 'good' },
    humane: { value: '无生态', status: 'bad' },
    anki: { value: '无生态', status: 'bad' },
    glass: { value: '生态弱', status: 'bad' }
  },
  feedback: {
    oura: { value: '4.7/5高', status: 'good' },
    aibo: { value: '4.6/5高', status: 'good' },
    rayban: { value: '4.5/5高', status: 'good' },
    humane: { value: '1.5/5差', status: 'bad' },
    anki: { value: '破产N/A', status: 'bad' },
    glass: { value: '负面多', status: 'bad' }
  }
}

function getCellValue(dimId: string, productId: string): string {
  return comparisonData[dimId]?.[productId]?.value || '-'
}

function getCellClass(dimId: string, productId: string): string {
  const status = comparisonData[dimId]?.[productId]?.status || 'neutral'
  return `cell-${status}`
}

function getCellIcon(dimId: string, productId: string): string {
  const status = comparisonData[dimId]?.[productId]?.status
  if (status === 'good') return '✅'
  if (status === 'bad') return '❌'
  return '⚪'
}
</script>

<style scoped>
.table-wrapper {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.table-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: center;
}

.table-subtitle {
  margin: 0 0 1.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.comparison-table thead th {
  background-color: var(--vp-c-bg);
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

.dimension-col {
  text-align: left !important;
  min-width: 150px;
  font-weight: 600;
}

.success-col {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-text-1);
}

.failure-col {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-text-1);
}

.dimension-cell {
  text-align: left;
  font-weight: 500;
}

.dimension-name {
  color: var(--vp-c-text-1);
}

.dimension-weight {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

.cell-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.cell-icon {
  font-size: 1.2rem;
}

.cell-value {
  font-size: 0.85rem;
  line-height: 1.3;
}

.cell-good {
  background-color: rgba(16, 185, 129, 0.15);
}

.cell-bad {
  background-color: rgba(239, 68, 68, 0.15);
}

.cell-neutral {
  background-color: rgba(107, 114, 128, 0.1);
}

.key-insights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.insight-section h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.insight-section ul {
  margin: 0;
  padding-left: 1.25rem;
  list-style: none;
}

.insight-section li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  position: relative;
}

.insight-section li::before {
  content: "•";
  position: absolute;
  left: -1rem;
  color: var(--vp-c-brand);
}

.insight-section strong {
  color: var(--vp-c-text-1);
}

.insight-section.failure li::before {
  color: #ef4444;
}

@media (max-width: 1024px) {
  .key-insights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .table-wrapper {
    padding: 1rem;
  }

  .comparison-table {
    font-size: 0.8rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem 0.25rem;
  }

  .dimension-col {
    min-width: 120px;
  }

  .cell-value {
    font-size: 0.75rem;
  }
}
</style>