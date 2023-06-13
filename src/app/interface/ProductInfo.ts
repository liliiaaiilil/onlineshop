export interface ProductInfo{
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity: number;
    rating: {rate: number, count: number},
    allCost?: number
}