import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = "https://localhost:44356/api/"
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/detailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
