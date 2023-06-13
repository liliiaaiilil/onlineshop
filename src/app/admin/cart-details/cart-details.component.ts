import { Component } from '@angular/core';
import { ShopDataService } from '../../services/shop-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartInfo } from '../../interface/CartInfo';
import { CartProductInfo } from '../../interface/CartProductInfo';
import { ProductInfo } from '../../interface/ProductInfo';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  constructor(private router: Router,
    private shopService:ShopDataService,
    private activatedRoute:ActivatedRoute){}

  cartDetails!: CartInfo;
  products: ProductInfo [] = [];
  userProducts: ProductInfo [] = [];

  ngOnInit(){
    this.shopService.getProducts().subscribe((data: any) => {this.products = data; console.log(this.products); this.showCart(this.products)});
    this.activatedRoute.data.subscribe((data) => {this.cartDetails = data['data']; console.log(this.cartDetails['products'])})   
  }

  showCart(products: ProductInfo[]){
    let findItem;
    this.products = products;
    this.cartDetails['products'].forEach((el) => {console.log(el); findItem = this.products.find((item) => {return item.id === el.productId;})
      console.log(findItem);
      if(findItem){
      if(findItem.id === el.productId){
        findItem.price = findItem.price * el.quantity;
        findItem.quantity = el.quantity;
      }
      console.log(findItem);
      this.userProducts.push(findItem);
    }})
  }


  goBack(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
