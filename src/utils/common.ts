import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

export const ticketStatus = [
  { label: t('common.payed'), value: 'payed' },
  { label: t('common.used'), value: 'used' },
  { label: t('common.expired'), value: 'expired' },
  { label: t('common.invalid'), value: 'invalid' }
]

/**
 * @description: 订单状态 1: 待支付,2:支付成功,3:支付失败,4:已核销
 * @return {*}
 */
export const orderStatus = [
  { label: t('common.waittingToPay'), value: 1 },
  { label: t('common.paySuccess'), value: 2 },
  { label: t('common.payFaild'), value: 3 },
  { label: t('common.approved'), value: 4 }
]

export const workOrderStatus = [
  { label: t('common.untreated'), value: 'unprocessed' },
  { label: t('common.processed'), value: 'processed' },
  { label: t('common.canNotDispose'), value: 'suspended' }
]
