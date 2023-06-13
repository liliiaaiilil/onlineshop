import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './shop/card/card.component';
import { ShopComponent } from './shop/shop.component';
import { BasketComponent } from './shop/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { CartDetailsComponent } from './admin/cart-details/cart-details.component';
import { ResolveService } from './services/resolve.service';
import { ResolveCartService } from './services/resolve-cart.service';

const routes: Routes = [
  { path: '', redirectTo:'shop', pathMatch:'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:id-card', component: CardComponent, resolve: { data: ResolveService } },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/:id-cart', component: CartDetailsComponent, resolve: { data: ResolveCartService }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
