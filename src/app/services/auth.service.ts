import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/loginModel';
import {Observable} from 'rxjs';
import {SingleResponseModel} from '../models/singleResponseModel';
import {TokenModel} from '../models/tokenModel';
import {RegisterModel} from '../models/registerModel';
import {Claims} from "../models/claims";
import {ListResponseModel} from "../models/listResponseModel";
import {UserService} from "./user.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/login',loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/register',registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getClaims(id:number):Observable<ListResponseModel<Claims>>{
    return this.httpClient.get<ListResponseModel<Claims>>(this.apiUrl + 'users/claims?id='+id)
  }



}
