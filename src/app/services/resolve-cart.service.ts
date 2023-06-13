import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router'
import { CartInfo } from '../interface/CartInfo';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShopDataService } from './shop-data.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveCartService implements Resolve<CartInfo[]>{

  constructor(private shopService:ShopDataService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<CartInfo[]> {
    return this.shopService.getCartId(route.params?.['id-cart']).pipe(
      catchError(() => {this.router.navigate(['shop']);
      return EMPTY; })
    )
  }
}
