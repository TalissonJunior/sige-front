import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _obs = {
    onValue: new Subject(),
    onError: new Subject()
  }

  constructor(private _http: HttpClient) { }

  on(serviceEvent: string, callback: Function): void {

    switch (serviceEvent) {

      case 'value':
        this._obs.onValue.subscribe(
          (snapshot) => callback(snapshot)
        );
        this._emitValueEventWithGetAll();
        break;

      case 'error':
        this._obs.onError.subscribe(
          (error) => callback(error)
        );
        break;
    }
  }

  
  getAll(): Observable<Array<Product>> {
    return this._http.get<Array<Product>>(environment.apiUrl + '/products');
  }

  getByID(id: number): Observable<Product> {
    return this._http.get<Product>(environment.apiUrl + '/products' + id);
  }

  insert(model: any): Observable<any> {
    return this._http.post<any>(environment.apiUrl + '/products', model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  edit(model: any): Observable<boolean> {
    return this._http.put<boolean>(environment.apiUrl + '/products', model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  delete(id: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/products/' + id)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  private _emitValueEventWithGetAll() {
    this.getAll().subscribe((snapshot) => {
      this._obs.onValue.next(snapshot);
    },
      (error) => this._obs.onError.next(error));
  }

}
