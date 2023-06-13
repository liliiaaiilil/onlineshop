import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ProductInfo } from '../interface/ProductInfo';
import { CartInfo } from '../interface/CartInfo';
import { CartProductInfo } from '../interface/CartProductInfo';


@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  from: string = '';
  to: string = '';
  constructor(private http:HttpClient) { }

  getProducts():Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>("https://fakestoreapi.com/products")
  }

  getCategories():Observable<any>{
    return this.http.get<any>("https://fakestoreapi.com/products/categories")
  }

  getSortedByType(categorie: string):Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>(`https://fakestoreapi.com/products/category/${categorie}`)
  }

  getSortedByPriceMinMax():Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>("https://fakestoreapi.com/products").pipe(map((res: any) => res.sort(function(a: any, b: any){return a.price - b.price})))
  }

  getSortedByPriceMaxMin():Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>("https://fakestoreapi.com/products").pipe(map((res: any) => res.sort(function(a: any, b: any){return b.price - a.price})))
  }

  getCardId(idCard: number):Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>(`https://fakestoreapi.com/products/${idCard}`)
  }
  
  postProduct(busket: any):Observable<ProductInfo[]>{
    console.log(busket);
    return this.http.post<ProductInfo[]>(`https://fakestoreapi.com/carts`,
          {
              userId:5,
              date:2020-0o2-0o3,
              products:busket
          }
      )
  }

  getAllCarts():Observable<CartInfo[]>{
    return this.http.get<CartInfo[]>("https://fakestoreapi.com/carts")
  }

  getCartId(idCart: number):Observable<CartInfo[]>{
    return this.http.get<CartInfo[]>(`https://fakestoreapi.com/carts/${idCart}`)   
  }

  getDateSortedCarts(array: any):Observable<CartInfo[]>{
    this.from = array[0];
    this.to = array[1];
    console.log(this.from)
    return this.http.get<CartInfo[]>(`https://fakestoreapi.com/carts?startdate=${this.from}&enddate=${this.to}`)
  }
}
