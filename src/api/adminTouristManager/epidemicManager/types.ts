import type { TouristInfoData } from '@/api/adminTouristManager/touristInfo/types'

export type EpidemicManager = {
  auditTime: string
  crtTime: number
  dataState: number
  dataVersion: number
  id: number
  imgs: string
  imgList: { name: string; uid: number; url: string }[]
  imagePath1: string
  imagePath2: string
  imagePath3: string
  imagePath4: string
  submitTime: string
  tourist: TouristInfoData
  touristId: number
}
