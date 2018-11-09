import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  models = new Array<Vehicle>();

  constructor(private modelService: VehicleService, private _router: Router) { }

  ngOnInit() {
    this.modelService.on('value', (snapshot) => {
      this.models = snapshot;
    });
  }

  edit(id: number) {
    this._router.navigate(['./vehicles/details/' + id]);
  }

  delete(id: number) {
    this.modelService.delete(id).subscribe();
  }
}
