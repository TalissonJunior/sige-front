import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  models = new Array<Product>();

  constructor(private modelService: ProductService) { }

  ngOnInit() {
    this.modelService.on('value', (snapshot) => {
      this.models = snapshot;
    });
  }

}
