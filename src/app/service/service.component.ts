import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { Service } from '../models/service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  models = new Array<Service>();

  constructor(private modelService: ServiceService, private _router: Router) { }

  ngOnInit() {
    this.modelService.on('value', (snapshot) => {
      this.models = snapshot;
    });
  }

  edit(id: number) {
    this._router.navigate(['./services/details/' + id]);
  }

  delete(id: number) {
    this.modelService.delete(id).subscribe();
  }
}
