// import type { Plugin } from 'vue'
import { getToken } from '@/utils/auth'
import { REQUEST_TOKEN_KEY } from '@/config/axios/config'
import { REQUEST_URL } from '@/config/axios/config'

/**
 *
 * @param component 需要注册的组件
 * @param alias 组件别名
 * @returns any
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: any) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export const underlineToHump = (str: string): string => {
  return str.replace(/\-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase()
  })
}

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
// eslint-disable-next-line
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

export const trim = (str: string) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * @param {Date | number | string} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export const formatTime = (time: Date | number | string, fmt: string) => {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
}

/**
 * 生成随机字符串
 */
export const toAnyString = () => {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

/**
 * @description: 时间数字处理
 * @return {*}
 */
export const dateNumFormat = (num) => {
  if (!num) return ''
  const str = String(num)
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6, 8)
  const hour = str.substring(8, 10)
  const minute = str.substring(10, 12)
  return `${year}-${month}-${day} ${hour}:${minute}`
}

/**
 * @description: 金额处理
 * @return {*}
 */
export const moneyFormat = (num) => {
  if (!num) return ''
  num = Number(num)
  return `¥ ${(num / 100).toFixed(2)}`
}

/**
 * @description: get参数编码
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export const formatUrl = (url, params) => {
  url += '?'
  const keys = Object.keys(params)
  for (const key of keys) {
    if (params[key] !== void 0 && params[key] !== null) {
      url += `${key}=${encodeURIComponent(params[key])}&`
    }
  }
  return url.substring(0, url.length - 1)
}

/**
 * @description: 导出excel
 * @param {any} res
 * @param {string} type
 * @param {string} fileName
 * @return {*}
 */
export const exportFile = (params) => {
  let url = `${REQUEST_URL}/api/tourist_order/export`
  url = formatUrl(url, params)
  console.log('fetch------url', url)
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      [REQUEST_TOKEN_KEY]: getToken()!
    }
  }).then((res) => {
    res.blob().then((blob) => {
      // 创建a标签，并处理二级制数据
      const aLink = document.createElement('a')

      // 设置下载文件名称，使用正则取出名称
      const pat = new RegExp('filename=([^;]+\\.[^\\.;]+)')
      //浏览器问题可能会出现 content-disposition 匹配不到
      const contentDisposition =
        res.headers['content-disposition'] || res.headers['Content-Disposition']
      const result = pat.exec(contentDisposition)
      let fileName = result && result[1]
      // 如果Content-Disposition没有暴露，给文件一个默认名字
      if (fileName == null) fileName = '商品订单.xlsx'

      // 生成下载链接
      const URL = window.URL || window.webkitURL
      aLink.href = URL.createObjectURL(blob)
      aLink.setAttribute('download', fileName)
      // 下载
      document.body.appendChild(aLink)
      aLink.click()
      // 释放URL对象
      window.URL.revokeObjectURL(aLink.href)
      document.body.removeChild(aLink)
    })
  })
}
