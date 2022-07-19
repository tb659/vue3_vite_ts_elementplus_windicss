import { StaffInfoData } from '@/api/adminStaffManager/staffInfo/types'

export type WorkOrderData = {
  id: number
  actualFinishTime: string
  assigner: StaffInfoData
  assignerId: number
  crtTime: number
  dataState: number
  dataVersion: number
  scheduledFinishTime: string
  submitter: StaffInfoData
  submitterId: number
  workOrderContent: string
  workOrderExecutionContent: string
  workOrderExecutionImg1: string
  workOrderExecutionImg2: string
  workOrderExecutionImg3: string
  workOrderExecutionImg4: string
  workOrderExecutionImg5: string
  workOrderExecutionImg6: string
  imgs: string
  imgList: { name: string; uid: number; url: string }[]
  workOrderStatus: 'unprocessed' | 'processed' | 'suspended' // suspended(挂起无法处理),unprocessed(未处理), processed（已处理）,
  workOrderTitle: string
  workOrderType: string
}
