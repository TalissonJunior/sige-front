import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  public form: FormGroup;
  public search: string;

  constructor(private _fb: FormBuilder, private _modelService: ServiceService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];

    this.form = this._createForm();

    if (id > 0) {
      this._modelService.getByID(id).subscribe((model) => {
        model.date = moment(model.date).format('YYYY-MM-DD');
        this._setFormData(model);
      });

    }
  }

  save() {
    const model: Service = Object.assign({}, this.form.value);

    if (model.id) {
      this._modelService.edit(model.id, model).subscribe();
    }
    else {
      model.date = moment(model.date).toISOString();
      this._modelService.insert(model).subscribe();
    }

    this._router.navigateByUrl('/services');
  }

  private _createForm(): FormGroup {

    return this._fb.group({
      id: [0],
      details: ['', [Validators.required]],
      address: ['', [Validators.required]],
      frequency: [null, [Validators.required]],
      date: [null, [Validators.required]]
    });
  }

  private _setFormData(model: Service) {
      this.form.setValue(model);
  }
}
