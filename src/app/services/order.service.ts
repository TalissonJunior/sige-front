import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  getAll(): Observable<Array<Order>> {
    return this._http.get<Array<Order>>(environment.apiUrl + '/orders');
  }

  getByID(id: number): Observable<Order> {
    return this._http.get<Order>(environment.apiUrl + '/orders/' + id);
  }

  insert(model: Order): Observable<any> {
    return this._http.post<any>(environment.apiUrl + '/orders', model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  edit(id:number, model: Order): Observable<any> {
   
    return this._http.put(environment.apiUrl + '/orders/'+ id, model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  delete(id: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/orders/' + id)
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
