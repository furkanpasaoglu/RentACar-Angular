import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

import { ListResponseModel } from '../models/listResponseModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/detailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
