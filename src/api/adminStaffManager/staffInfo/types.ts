import { EpartmentData } from '@/api/adminStaffManager/epartment/types'

export type StaffInfoData = {
  id: number
  crtTime: number
  dataState: number
  dataVersion: number
  dismisses: boolean
  dutyGroup: EpartmentData
  dutyGroupId: number
  merchantId: number[]
  merchantIds: string
  name: string
  workNo: string
  empNo: string
  handset: string
  dismissed: boolean
}
