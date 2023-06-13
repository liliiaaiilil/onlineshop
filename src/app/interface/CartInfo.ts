import { CartProductInfo } from "./CartProductInfo"
export interface CartInfo{
    id: number,
    userId: number,
    date: string,
    products: CartProductInfo [],
    allCost?: number
}
