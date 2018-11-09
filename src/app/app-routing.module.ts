import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ServiceComponent } from './service/service.component';
import { ServiceDetailsComponent } from './service/service-details/service-details.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'products/details/:id', component: ProductDetailsComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'orders/details/:id', component: OrderDetailsComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'vehicles/details/:id', component: VehicleDetailsComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'services/details/:id', component: ServiceDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
