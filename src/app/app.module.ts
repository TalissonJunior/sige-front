import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { ServiceComponent } from './service/service.component';
import { ServiceDetailsComponent } from './service/service-details/service-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    ProductDetailsComponent,
    FilterPipe,
    OrderComponent,
    OrderDetailsComponent,
    VehicleComponent,
    VehicleDetailsComponent,
    ServiceComponent,
    ServiceDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
