import { useCache } from '@/hooks/web/useCache'

import { config } from '@/config/axios/config'

const { result_code } = config

const { wsCache } = useCache()

export const prefix = 'ipark'

export type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'

export type ThemeTypes = {
  elColorPrimary?: string
  leftMenuBorderColor?: string
  leftMenuBgColor?: string
  leftMenuBgLightColor?: string
  leftMenuBgActiveColor?: string
  leftMenuCollapseBgActiveColor?: string
  leftMenuTextColor?: string
  leftMenuTextActiveColor?: string
  logoTitleTextColor?: string
  logoBorderColor?: string
  topHeaderBgColor?: string
  topHeaderTextColor?: string
  topHeaderHoverColor?: string
  topToolBorderColor?: string
}
export interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  uniqueOpened: boolean
  hamburger: boolean
  screenfull: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  tagsViewIcon: boolean
  logo: boolean
  fixedHeader: boolean
  greyMode: boolean
  pageLoading: boolean
  layout: LayoutType
  title: string
  isDark: boolean
  currentSize: ElememtPlusSize
  sizeMap: ElememtPlusSize[]
  mobile: boolean
  footer: boolean
  theme: ThemeTypes
  userInfo: string
  username: string
  password: string
  remember: string
  iParkRememberTime: number
}

export const appModules: AppState = {
  userInfo: `${prefix}_userInfo`, // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  username: `${prefix}_username`, // 登录状态存储字段-建议每个项目换一个字段，避免与其他项目冲突
  password: `${prefix}_password`, // 登录状态存储字段-建议每个项目换一个字段，避免与其他项目冲突
  remember: `${prefix}_remember`, // 登录状态存储字段-建议每个项目换一个字段，避免与其他项目冲突
  iParkRememberTime: 30, // 登录状态存储30天
  sizeMap: ['default', 'large', 'small'],
  mobile: wsCache.get(`${prefix}_mobile`) || false, // 是否是移动端
  title: import.meta.env.VITE_APP_TITLE, // 标题
  pageLoading: wsCache.get(`${prefix}_pageLoading`) || false, // 路由跳转loading

  breadcrumb: wsCache.get(`${prefix}_breadcrumb`) || true, // 面包屑
  breadcrumbIcon: wsCache.get(`${prefix}_breadcrumbIcon`) || true, // 面包屑图标
  collapse: wsCache.get(`${prefix}_collapse`) || false, // 折叠菜单
  uniqueOpened: wsCache.get(`${prefix}_uniqueOpened`) || false, // 是否只保持一个子菜单的展开
  hamburger: wsCache.get(`${prefix}_hamburger`) || true, // 折叠图标
  screenfull: wsCache.get(`${prefix}_screenfull`) || true, // 全屏图标
  size: wsCache.get(`${prefix}_size`) || true, // 尺寸图标
  locale: wsCache.get(`${prefix}_locale`) || true, // 多语言图标
  tagsView: wsCache.get(`${prefix}_tagsView`) || true, // 标签页
  tagsViewIcon: wsCache.get(`${prefix}_tagsViewIcon`) || true, // 是否显示标签图标
  logo: wsCache.get(`${prefix}_logo`) || true, // logo
  fixedHeader: wsCache.get(`${prefix}_fixedHeader`) || true, // 固定toolheader
  footer: wsCache.get(`${prefix}_footer`) || false, // 显示页脚
  greyMode: wsCache.get(`${prefix}_greyMode`) || false, // 是否开始灰色模式，用于特殊悼念日

  layout: wsCache.get(`${prefix}_layout`) || 'classic', // layout布局
  isDark: wsCache.get(`${prefix}_isDark`) || false, // 是否是暗黑模式
  currentSize: wsCache.get('default') || 'default', // 组件尺寸
  theme: wsCache.get(`${prefix}_theme`) || {
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit',
    // 头部背景颜色
    topHeaderBgColor: '#fff',
    // 头部字体颜色
    topHeaderTextColor: 'inherit',
    // 头部悬停颜色
    topHeaderHoverColor: '#f6f6f6',
    // 头部边框颜色
    topToolBorderColor: '#eee'
  }
}

const dictObj: Recordable = {
  importance: [
    {
      value: 0,
      label: 'tableDemo.commonly'
    },
    {
      value: 1,
      label: 'tableDemo.good'
    },
    {
      value: 2,
      label: 'tableDemo.important'
    }
  ]
}

export const dictRes = {
  code: result_code,
  data: dictObj
}

export const printObj = {
  //打印区域 Dom ID
  id: 'printMe',
  popTitle: '打印页面标题文字',
  extraCss: 'https://www.google.com,https://www.google.com',
  // 可以传进去  style tag 标签；注意要逗号分隔   解决特定区域不显示问题；
  extraHead:
    '<meta http-equiv="Content-Language"content="zh-cn"/>,<style> #printMe { height: auto !important; } <style>'
}

export const printContent = `
  <header class="leading-loose">
    <h1 class="text-center text-2xl mb-10px">订单小票</h1>
    <p>
      <span>订单编号：</span>
      <span>{{ printData.order.id }}</span>
    </p>
    <p>
      <span>下单时间：</span>
      <span>{{ printData.order.crtTime }}</span>
    </p>
  </header>
  <div class="w-full whitespace-nowrap overflow-hidden my-10px">
    --------------------------------------
  </div>
  <div>
    <div class="flex mb-10px">
      <span class="flex-1">名称</span>
      <span class="w-40px text-right">单价</span>
      <span class="w-40px text-right">数量</span>
      <span class="w-50px text-right">小计</span>
    </div>
    <div class="w-full whitespace-nowrap overflow-hidden my-10px">
      --------------------------------------
    </div>
    <div class="flex leading-loose" v-for="item in printData.items" :key="item.id">
      <span class="flex-1 truncate">{{ item.productName }}</span>
      <span class="w-40px text-right">{{ item.productPrice }}</span>
      <span class="w-40px text-right">{{ item.productCount }}</span>
      <span class="w-50px text-right">{{ item['totalPrice'] }}</span>
    </div>
  </div>
  <div class="w-full whitespace-nowrap overflow-hidden my-10px">
    --------------------------------------
  </div>
  <!-- 总计 -->
  <div class="text-right">
    <span>总计：</span>
    <span>{{ printData['total'] }}</span>
  </div>
  <div class="w-full whitespace-nowrap overflow-hidden my-10px">
    --------------------------------------
  </div>
  <div class="text-2xl">
    {{ printData.order.mchName }}
  </div>
`
