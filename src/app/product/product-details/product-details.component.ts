import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public form: FormGroup;
  public search: string;

  constructor(private _fb: FormBuilder, private _modelService: ProductService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];

    this.form = this._createForm();

    if (id > 0) {
      this._modelService.getByID(id).subscribe((model) => {
        this._setFormData(model);
      });

    }

  }

  save() {
    const model: Product = Object.assign({}, this.form.value);

    if (model.id) {
      this._modelService.edit(model.id, model).subscribe();
    }
    else {
      this._modelService.insert(model).subscribe();
    }

    this._router.navigateByUrl('/products');
  }

  private _createForm(): FormGroup {

    return this._fb.group({
      id: [0],
      name: ['', [Validators.required]],
      price: [null, [Validators.required]],
      minCount: [null, [Validators.required]],
      count: [null, [Validators.required]]
    });
  }

  private _setFormData(model: Product) {
      this.form.setValue(model);
  }

}
