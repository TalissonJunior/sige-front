import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  models = new Array<Order>();

  constructor(private modelService: OrderService, private _router: Router) { }

  ngOnInit() {
    this.modelService.on('value', (snapshot) => {
      this.models = snapshot;
    });
  }

  edit(id: number) {
    this._router.navigate(['./orders/details/' + id]);
  }

  delete(id: number) {
    this.modelService.delete(id).subscribe();
  }
}
