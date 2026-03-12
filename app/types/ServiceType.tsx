export interface BaseService {
  id: number
  name: string
  price: string
}

export interface ServiceItem extends BaseService {
  description: string
}

export type DrinkItem = BaseService

export interface ServicesData {
  combo: ServiceItem[]
  medicure: ServiceItem[]
  pedicure: ServiceItem[]
  effect: ServiceItem[]
  drink: DrinkItem[]
}

export interface Testimonial {
  id: number
  name: string
  avatar: string
  image: string
  text: string
}

export interface Technician {
  name: string
  avatar: string
}

export interface CartItem {
  id: string
  parentId?: string | null
  name: string
  price: number
  quantity: number
  image?: string
  duration?: number
  hasQuantityControl?: boolean
}
