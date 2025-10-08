import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI硬件市场调研报告 2025',
  description: '30个AI硬件品类深度市场调研与投资机会分析',
  lang: 'zh-CN',

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '数据汇总', link: '/summary/' },
      { text: '综合分析', link: '/analysis/' },
      {
        text: '品类报告',
        items: [
          { text: '儿童教育机器人', link: '/categories/education-robots' },
          { text: '社交陪伴机器人', link: '/categories/companion-robots' },
          { text: '宠物型机器人', link: '/categories/pet-robots' },
          { text: 'AI可穿戴硬件', link: '/categories/smart-glasses' },
          { text: 'AI PC笔记本', link: '/categories/ai-pc' },
          { text: '代理式AI设备', link: '/categories/agentic-devices' },
          { text: 'AI健康监测硬件', link: '/categories/health-wearables' },
          { text: 'AI健身智能镜', link: '/categories/fitness-mirror' },
          { text: 'AI智能婴儿监控器', link: '/categories/baby-monitor' },
          { text: 'AI智能音箱/显示屏', link: '/categories/smart-speaker-display' },
          { text: 'AI便携翻译机', link: '/categories/portable-translator' },
          { text: 'AI智能睡眠枕头/床垫', link: '/categories/sleep-pillow-mattress' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/summary/': [
        {
          text: '数据汇总',
          items: [
            { text: '对比表总览', link: '/summary/' }
          ]
        }
      ],
      '/analysis/': [
        {
          text: '综合分析',
          items: [
            { text: '机会地图', link: '/analysis/' }
          ]
        }
      ],
      '/categories/': [
        {
          text: 'AI硬件品类 (12个)',
          collapsed: false,
          items: [
            { text: '儿童教育机器人', link: '/categories/education-robots' },
            { text: '社交陪伴机器人', link: '/categories/companion-robots' },
            { text: '宠物型机器人', link: '/categories/pet-robots' },
            { text: 'AI可穿戴硬件', link: '/categories/smart-glasses' },
            { text: 'AI PC笔记本', link: '/categories/ai-pc' },
            { text: '代理式AI设备', link: '/categories/agentic-devices' },
            { text: 'AI健康监测硬件', link: '/categories/health-wearables' },
            { text: 'AI健身智能镜', link: '/categories/fitness-mirror' },
            { text: 'AI智能婴儿监控器', link: '/categories/baby-monitor' },
            { text: 'AI智能音箱/显示屏', link: '/categories/smart-speaker-display' },
            { text: 'AI便携翻译机', link: '/categories/portable-translator' },
            { text: 'AI智能睡眠枕头/床垫', link: '/categories/sleep-pillow-mattress' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fran0220/ai-hardware-research' }
    ],

    // 页脚
    footer: {
      message: 'AI硬件市场调研报告',
      copyright: 'Copyright © 2025'
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // Markdown配置
  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // Head配置
  head: [
    ['meta', { name: 'keywords', content: 'AI硬件,市场调研,投资分析,人工智能,硬件产品' }],
    ['meta', { name: 'author', content: 'fan' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/theme/custom.css' }]
  ],

  // 构建配置
  lastUpdated: true,
  cleanUrls: true
})