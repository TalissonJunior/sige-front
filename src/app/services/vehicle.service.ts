import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
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

  getAll(): Observable<Array<Vehicle>> {
    return this._http.get<Array<Vehicle>>(environment.apiUrl + '/vehicles');
  }

  getByID(id: number): Observable<Vehicle> {
    return this._http.get<Vehicle>(environment.apiUrl + '/vehicles/' + id);
  }

  insert(model: Vehicle): Observable<any> {
    return this._http.post<any>(environment.apiUrl + '/vehicles', model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  edit(id:number, model: Vehicle): Observable<any> {
   
    return this._http.put(environment.apiUrl + '/vehicles/'+ id, model)
      .pipe(map((response) => {
        this._emitValueEventWithGetAll();

        return response;
      }));
  }

  delete(id: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/vehicles/' + id)
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
