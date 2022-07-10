import { EpartmentData } from '@/api/adminStaffManager/epartment/types'

export type StaffInfoData = {
  id: number
  crtTime: number
  dataState: number
  dataVersion: number
  dismisses: boolean
  dutyGroup: EpartmentData
}
