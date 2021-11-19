export interface Institution {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface Role {
  description: string
  id: string
  name: string
  type: string
  updatedAt: string
  username: string
  __v: number
  _id: string
}
export interface Employee {
  _id: string
  empName: string
  empNo: string
  email: string
  nrc: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: string
  created_by: string
  updated_by: string
  id: string
}

export interface User {
  blocked: boolean
  confirmed: boolean
  createdAt: string
  email: string
  id: string
  institution: Institution
  provider: string
  role: Role
  updatedAt: string
  username: string
  __v: number
  _id: string
}
