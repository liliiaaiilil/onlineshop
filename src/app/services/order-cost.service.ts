import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderCostService {

  constructor() { }

  busketProducts: any [] = [];

  countTotalPrice(){   
      let cost = 0;
      this.busketProducts.forEach(el => {cost = cost + el.price * el.quantity; console.log(cost)});
      return cost    
  }
}
