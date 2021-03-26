import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModel';
import {FakeFindeksModel} from '../models/fakeFindeksModel';
import {SingleResponseModel} from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + 'users/email?email='+email);
  }

  profileUpdate(user:User):Observable<ResponseModel>{
    console.log(user)
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/updateprofile', {
      user:{
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status':user.status
      },
      password:user.password
    });
  }

  fakeFindeks(findeksModel:FakeFindeksModel):Observable<SingleResponseModel<FakeFindeksModel>>{
    return this.httpClient.post<SingleResponseModel<FakeFindeksModel>>(this.apiUrl+'users/getuserfindeks',findeksModel)
  }

}
