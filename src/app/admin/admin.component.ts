import { Component } from '@angular/core';
import { ShopDataService } from '../services/shop-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartInfo } from '../interface/CartInfo';
import { ProductInfo } from '../interface/ProductInfo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private router: Router,
    private shopService:ShopDataService,
    private activatedRoute:ActivatedRoute
  ){}
  userCarts: CartInfo [] = [];
  products: ProductInfo [] = [];
  totalOfCarts: any;
  date: string [] = [];
  sortedByDate: any [] = [];
  
  ngOnInit(){
    let findItem: any;
    this.shopService.getProducts().subscribe((data: any) => {this.products = data; console.log(this.products)});
    this.shopService.getAllCarts().subscribe((data: any) => {this.userCarts = data; console.log(this.userCarts);
    this.userCarts.forEach(el => {console.log(el.products); el.products.forEach((el: any) => {console.log(el.productId); findItem = this.products.find((item: any) => item.id === el.productId);
    if(findItem){
      console.log(findItem.price);
      el.products = findItem.price * el.quantity;
      
      console.log(this.userCarts);
      this.userCarts.forEach((element: any) => {console.log(element.products); element.products.reduce((a: any, b: any) => element.allCost = a + b.products, 0);
      this.totalOfCarts = this.userCarts.reduce((a: any, b: any) => a + b.allCost, 0);
      })
    }})})});
    
  }

  showDetails(item: any){
    console.log(item)
    this.router.navigate([item.id], {relativeTo: this.activatedRoute});
  }

  sortDate(date: any){
    let obj: object = {};
    console.log(date)
    console.log(date.explicitOriginalTarget.value);
    console.log(this.products);
    console.log(this.userCarts);
    this.userCarts.forEach(el => {obj = {id: el.id, userId: el.userId, allCost: el.allCost}; this.sortedByDate.push(obj); console.log(this.sortedByDate)})
    
    this.date.push(date.explicitOriginalTarget.value);
    console.log(this.date)
    if(this.date.length === 2){
    this.shopService.getDateSortedCarts(this.date).subscribe((data: any) => {this.userCarts = data;
      this.userCarts.forEach(el => {this.sortedByDate.forEach(elem => {if(el.userId === elem.userId){el.allCost = elem.allCost}})});
      this.totalOfCarts = this.userCarts.reduce((a: any, b: any) => a + b.allCost, 0);
      })         
    }
  }
}
