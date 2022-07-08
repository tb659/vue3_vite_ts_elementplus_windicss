export type RoleListData = {
  id: string
  code: string
  corpId: number
  crtTime: number
  crtUser: number
  dataState: number
  dataVersion: number
  embed: number
  modTime: number
  modUser: number
  name: string
  note: string
  resourceList: { id: number; permissions: string }[] | undefined
  sequence: null
  status: number
}
