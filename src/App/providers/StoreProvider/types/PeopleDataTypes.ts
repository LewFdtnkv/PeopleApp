export interface IPeopleProps{
  id?: string
  name: string
  email: string
  avatar: string
  description: string
  createdAt?: string
  onClick?: (id:string)=>void
}
export interface PeopleState {
  loading: boolean
  error: string | null
  page: number
  pages: Record<number, IPeopleProps[]>;
  limit: number
  totalUsers: number
  
}