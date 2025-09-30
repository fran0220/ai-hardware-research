import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // ClientOnly组件已由VitePress内置提供
    // vue-echarts组件按需导入,无需全局注册
  }
} satisfies Theme