export type UserListData = {
  dataVersion: number
  id: string
  userId: string
  roleList: number[]
  status: number
  username: string
  password: string
  newPassword: string
  confirmPassword: string
}

export type PasswordData = {
  userId: string
  newPassword: string
}

export type putListData = {
  dataVersion: number
  id: string
  roleList: number[]
  status: number
  username: string
}
