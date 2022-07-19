import { QueueTerminalData } from '@/api/adminQueueManager/queueTerminal/types'
import type { TouristInfoData } from '@/api/adminTouristManager/touristInfo/types'

export type QueueInfoData = {
  id: number
  dataState: number
  dataVersion: number
  entryTime: string
  number: number
  queuingDevice: QueueTerminalData
  queuingNumberFrom: 'mp' | 'device'
  queuingNumberState: 'normal' | 'overed'
  taskNumberTime: string
  tourist: TouristInfoData
}
