import { Injectable } from '@angular/core';
import { ShopDataService } from './shop-data.service';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {

  constructor(
    private shopService:ShopDataService,
  ) { }

  busket: any [] = [];

  addToCart(item: any){
    console.log(item)
    item.quantity = 1;
    let findItem;

    if(this.busket.length > 0){
    findItem = this.busket.find((elem) => elem.id === item.id)
    if(findItem){ 
    findItem.quantity += 1; 
    console.log(findItem);
    this.shopService.postProduct(this.busket).subscribe((data: any) => {console.log(data);    
        this.busket = data.products;})}
    else{
      this.busket.push(item);
      this.shopService.postProduct(this.busket).subscribe((data: any) => {console.log(data);    
        this.busket = data.products;})
    }}   
    else{this.busket.push(item);
      this.shopService.postProduct(this.busket).subscribe((data: any) => {console.log(data);    
        this.busket = data.products;   
    })
    } 
}

}
