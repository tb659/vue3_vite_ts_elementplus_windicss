import { defineStore } from 'pinia'
import { store } from '../index'

export interface CommonState {
  payQrCode: string
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): CommonState => ({
    payQrCode: ''
  }),
  persist: {
    enabled: true
  },
  getters: {
    getPayQrCode(): string {
      return this.payQrCode
    }
  },
  actions: {
    setPayQrCode(payQrCode: string) {
      this.payQrCode = payQrCode
    }
  }
})

export const useCommonStoreWithOut = () => {
  return useCommonStore(store)
}
