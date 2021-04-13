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
  user:User = new User();
  check:boolean;

  constructor(private authService:AuthService,
              private localStorageService:LocalStorageService,
              private userService:UserService,
              private toastrService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.check = this.authService.isAuthenticated();
    this.checkToEmail();
    this.getEmail();
    this.checkAdmin();
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
        this.authService.getClaims(this.user.id).subscribe(response=>{
          if(response.data.length>0){
            for(let i =0; i< response.data.length; i++){
              if(response.data[i].name=='admin'){
                 this.localStorageService.set('yetki','var')
              }else{
                this.localStorageService.set('yetki','yok')
              }
            }
          
            this.localStorageService.set('id',this.user.id.toString())
          }
        })
      })
    }
  }

  checkAdmin(){
    if(this.localStorageService.get('yetki')=='var'){
      return true;
    }else{
      return false;
    }
  }

}
