import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  models = new Array<Product>();

  constructor(private modelService: ProductService, private _router: Router) { }

  ngOnInit() {
    this.modelService.on('value', (snapshot) => {
      this.models = snapshot;
    });
  }

  edit(id: number) {
    this._router.navigate(['./products/details/' + id]);
  }

  delete(id: number) {
    this.modelService.delete(id).subscribe();
  }

}
