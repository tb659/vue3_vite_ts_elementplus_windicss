import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'
import { appModules, prefix } from '@/config/app'
import type { AppState, LayoutType, ThemeTypes } from '@/config/app'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage } from 'element-plus'

const { wsCache } = useCache()

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
  persist: {
    enabled: true
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getUsername(): string {
      return this.username
    },
    getPassword(): string {
      return this.password
    },
    getRemember(): string {
      return this.remember
    },
    getIParkRememberTime(): number {
      return this.iParkRememberTime
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ElememtPlusSize {
      return this.currentSize
    },
    getSizeMap(): ElememtPlusSize[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): ThemeTypes {
      return this.theme
    },
    getFooter(): boolean {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
      wsCache.set(`${prefix}_breadcrumb`, this.breadcrumb)
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
      wsCache.set(`${prefix}_breadcrumbIcon`, this.breadcrumbIcon)
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
      wsCache.set(`${prefix}_collapse`, this.collapse)
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
      wsCache.set(`${prefix}_uniqueOpened`, this.uniqueOpened)
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
      wsCache.set(`${prefix}_hamburger`, this.hamburger)
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
      wsCache.set(`${prefix}_screenfull`, this.screenfull)
    },
    setSize(size: boolean) {
      this.size = size
      wsCache.set(`${prefix}_size`, this.size)
    },
    setLocale(locale: boolean) {
      this.locale = locale
      wsCache.set(`${prefix}_locale`, this.locale)
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
      wsCache.set(`${prefix}_tagsView`, this.tagsView)
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
      wsCache.set(`${prefix}_tagsViewIcon`, this.tagsViewIcon)
    },
    setLogo(logo: boolean) {
      this.logo = logo
      wsCache.set(`${prefix}_logo`, this.logo)
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
      wsCache.set(`${prefix}_fixedHeader`, this.fixedHeader)
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
      wsCache.set(`${prefix}_greyMode`, this.greyMode)
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
      wsCache.set(`${prefix}_pageLoading`, this.pageLoading)
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      wsCache.set(`${prefix}_layout`, this.layout)
    },
    setTitle(title: string) {
      this.title = title
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set(`${prefix}_isDark`, this.isDark)
    },
    setCurrentSize(currentSize: ElememtPlusSize) {
      this.currentSize = currentSize
      wsCache.set(`${prefix}_currentSize`, this.currentSize)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
      wsCache.set(`${prefix}_mobile`, this.mobile)
    },
    setTheme(theme: ThemeTypes) {
      this.theme = Object.assign(this.theme, theme)
      wsCache.set(`${prefix}_theme`, this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer: boolean) {
      this.footer = footer
      wsCache.set(`${prefix}_footer`, this.footer)
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
