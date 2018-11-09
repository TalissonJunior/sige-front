import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  public form: FormGroup;
  public search: string;

  constructor(private _fb: FormBuilder, private _modelService: VehicleService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];

    this.form = this._createForm();

    if (id > 0) {
      this._modelService.getByID(id).subscribe((model) => {
        model.nextRevision = moment(model.nextRevision).format('YYYY-MM-DD');
        model.lastRevision = moment(model.lastRevision).format('YYYY-MM-DD');
        this._setFormData(model);
      });

    }
  }

  save() {
    const model: Vehicle = Object.assign({}, this.form.value);

    if (model.id) {
      this._modelService.edit(model.id, model).subscribe();
    }
    else {
      model.nextRevision = moment(model.nextRevision).toISOString();
      model.lastRevision = moment(model.lastRevision).toISOString();
      this._modelService.insert(model).subscribe();
    }

    this._router.navigateByUrl('/vehicles');
  }

  private _createForm(): FormGroup {

    return this._fb.group({
      id: [0],
      name: ['', [Validators.required]],
      licensePlate: ['', [Validators.required]],
      isOk: [null, [Validators.required]],
      nextRevision: [null, [Validators.required]],
      lastRevision: [null, [Validators.required]]
    });
  }

  private _setFormData(model: Vehicle) {
      this.form.setValue(model);
  }

}
