import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ListResponseModel} from "../models/listResponseModel";
import {CarImage} from "../models/carImage";
import {Observable} from "rxjs";
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+'carimages')
  }

  deleteImage(carImage:CarImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath,carImage)
  }

  upload(carImageAdd:CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages";
    return this.httpClient.post<ResponseModel>(newPath,carImageAdd);
  }

  updated(carImageAdd:CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages/update";
    return this.httpClient.post<ResponseModel>(newPath,carImageAdd);
  }
}
