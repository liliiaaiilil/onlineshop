import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router'
import { ProductInfo } from '../interface/ProductInfo';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShopDataService } from './shop-data.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<ProductInfo[]>{

  constructor(private shopService:ShopDataService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ProductInfo[]> {
    return this.shopService.getCardId(route.params?.['id-card']).pipe(
      catchError(() => {this.router.navigate(['shop']);
      return EMPTY; })
    )
  }
}
