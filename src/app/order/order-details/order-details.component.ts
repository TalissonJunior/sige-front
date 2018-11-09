import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public form: FormGroup;
  public search: string;
  public order = new Order();
  public products = new Array<Product>();

  constructor(private _modelService: OrderService,
    private _router: Router, private _route: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];


    if (id > 0) {
      this._modelService.getByID(id).subscribe((model) => {
        
      });
    }

    this._productService.on('value', (snapshot) => {
      snapshot.forEach(element => {
        element.value = 0;
        element.stock = element.count - element.minCount;
      });;

      this.products = snapshot;
    });
  }

  save() {
    
    if (this.order.id) {
      this._modelService.edit(this.order.id, this.order).subscribe();
    }
    else {
      this.order.hasArrived = false;
      this.order.date = new Date();
      this._modelService.insert(this.order).subscribe();
    }

    this._router.navigateByUrl('/orders');
  }

  removeProduct(id: number) {

    var index = this.products.findIndex((product) => product.id == id);
    
    if( this.products[index].value == 0){
      this.products[index].stock = this.products[index].count - this.products[index].minCount;
    }
    else{
      this.products[index].stock += 1;
      this.products[index].value -= 1;
    }

    this._updateOrder();
  }

  addProduct(id: number) {  
    var index = this.products.findIndex((product) => product.id == id);

    if(this.products[index].value == this.products[index].count - this.products[index].minCount){
      this.products[index].stock = 0;
    }
    else{
      this.products[index].stock -= 1;
      this.products[index].value += 1;
    }

    this._updateOrder();
  }

  private _updateOrder(){
    var total = 0;
    this.order.products = this.products.filter((product) => product.value > 0);

    this.order.products.forEach((product) => {
      total += product.value * product.price;
    });

    this.order.price = total;
  }

}
