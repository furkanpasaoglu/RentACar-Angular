import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl =  environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+ 'colors')
  }
}
