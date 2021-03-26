import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  email = this.localStorageService.get('email');
  user:User=new User();

  constructor(private authService:AuthService,private localStorageService:LocalStorageService,private userService:UserService,private  toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }

  checkToEmail(){
    if(this.localStorageService.get('email')){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
   this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }
}
