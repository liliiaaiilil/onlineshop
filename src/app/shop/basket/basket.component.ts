import { Component, Input } from '@angular/core';
import { OrderCostService } from 'src/app/services/order-cost.service';
import { ChangeDetectorRef } from '@angular/core';
import { BasketServiceService } from 'src/app/services/basket-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  inputs: ['basket']
})
export class BasketComponent {
  constructor(
    private orderService:OrderCostService,
    private busketServ:BasketServiceService,
    private cdRef:ChangeDetectorRef
  ){}
  basket: any [] = [];
  totalPrice: number = 0;

  ngOnInit(){    
   this.basket = this.busketServ.busket;
  }

  ngAfterViewChecked(){
    this.basket = this.busketServ.busket;
    this.orderService.busketProducts = this.basket;
    this.totalPrice = this.orderService.countTotalPrice();
    this.cdRef.detectChanges();
  }

  decrease(item: any){
    console.log(item)   
    if(item.quantity === 1){
      this.basket.forEach((el, i) => {if(el.id === item.id){this.basket.splice(i, 1)}})
    }
    else{
    item.quantity -= 1;
    }
  }

  increase(item: any){
    console.log(item)
    item.quantity += 1;
  }
}
