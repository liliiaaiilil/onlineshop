import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { ProductInfo } from '../../interface/ProductInfo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private busketServ:BasketServiceService
  ){}
  
  cardDetails!: ProductInfo;

  ngOnInit(){
    this.activatedRoute.data.subscribe((data) => {this.cardDetails = data['data']})
  }

  addToCart(item: any){
    this.busketServ.addToCart(item);
  }

  goBack(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
