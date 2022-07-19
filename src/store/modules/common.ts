import { defineStore } from 'pinia'
import { store } from '../index'

export interface CommonState {
  num: number
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): CommonState => ({
    num: 0
  }),
  persist: {
    enabled: true
  },
  getters: {
    getNum(): number {
      return this.num
    }
  },
  actions: {
    setNum(num: number) {
      this.num += num
    }
  }
})

export const useCommonStoreWithOut = () => {
  return useCommonStore(store)
}
