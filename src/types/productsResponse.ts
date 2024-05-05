export type ProductResponse={
    color: string
  currency: string
  gender: string
  id: number
  imageURL: string
  name: string
  price: number
  quantity: number
  type: string
}

export type FilterTypes={
  colour:string[],
  type:string[],
  price:string[],
  gender:string[]
  [key: string]: string[]
}

export enum FiltersEnum{
  colour='Colour',
  type='Type',
  price='Price',
  gender='Gender',
}

export type ProductToCart={
  color: string
  currency: string
  gender: string
  id: number
  imageURL: string
  name: string
  price: number
  quantity: number
  type: string
  cartQuantity:number
}