import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopDataService } from '../services/shop-data.service';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { ProductInfo } from '../interface/ProductInfo';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products: ProductInfo [] = [];
  categories: string [] = [];
  busket: any [] = [];
  showProducts: ProductInfo [] = [];
  categorie: string ='';
  bool: boolean = true;
  constructor(
    private router: Router,
    private shopService:ShopDataService,
    private busketServ:BasketServiceService,
    private activatedRoute:ActivatedRoute
    ){}

  ngOnInit(){
    this.shopService.getProducts().subscribe(res => {console.log(res); this.products = res; this.createList(this.products)});
    this.shopService.getCategories().subscribe(res => {console.log(res); this.categories = res});
  }

  createList(productList: any){
    console.log(productList);
    if(productList.length){
    this.showProducts = productList.slice(0,5);
    console.log(this.showProducts);}
  }

  createPage(event: any){
    console.log(event);
    console.log(this.products);
    if(event.target.innerHTML === "1"){
      this.showProducts = this.products.slice(0,5);
    }
    if(event.target.innerHTML === "2"){
      this.showProducts = this.products.slice(5,10);
    }
    if(event.target.innerHTML === "3"){
      this.showProducts = this.products.slice(10,15);
    }
    if(event.target.innerHTML === "4"){
      this.showProducts = this.products.slice(15,19);
    }
  }

  showSortedByType(option:any){
    this.bool = false;
    console.log(option);
    this.categorie = option;
    this.shopService.getSortedByType(this.categorie).subscribe(data => {console.log(data); this.showProducts = data});
  }
  
  showSortedByPrice(param:any){
    this.bool = false;
    console.log(param.originalTarget.innerText);
    console.log(this.categorie);
    if(param.originalTarget.innerText === 'increasing' && this.categorie){
      this.shopService.getSortedByType(this.categorie).subscribe((data: any) => {console.log(data); data.sort(function(a: any, b: any){return a.price - b.price}); this.showProducts = data})
    };
    if(param.originalTarget.innerText === 'decreasing' && this.categorie){
      this.shopService.getSortedByType(this.categorie).subscribe((data: any) => {console.log(data); data.sort(function(a: any, b: any){return b.price - a.price}); this.showProducts = data})
    }; 
    if(param.originalTarget.innerText === 'increasing'){
      this.shopService.getSortedByPriceMinMax().subscribe(data => {console.log(data); this.showProducts = data})
    };
    if(param.originalTarget.innerText === 'decreasing'){
      this.shopService.getSortedByPriceMaxMin().subscribe(data => {console.log(data); this.showProducts = data})
    };
  }

  showDetails(item: any){
    this.router.navigate([item.id], {relativeTo: this.activatedRoute});
  }

  addToCart(item: any){
    this.busketServ.addToCart(item);
  }
}
