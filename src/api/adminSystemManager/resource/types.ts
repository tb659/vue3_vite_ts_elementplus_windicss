export type ResourceData = {
  id: number
  code: string
  domain: string
  href: string
  name: string
  permissions: string
  defaultAssign: number
  parentId: number
  status: number
  type: number
  children: ResourceData[]
}
