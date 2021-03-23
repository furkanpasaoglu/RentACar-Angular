import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/details";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbybrand?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbycolor?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarDetail(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarByBrandAndColor( brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl +'cars/CarsByBrandAndColor?brandId=' +brandId +'&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addToCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/update',car);
  }
}
