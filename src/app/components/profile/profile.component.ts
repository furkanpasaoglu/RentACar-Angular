import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  email:string;
  password:FormControl
  user:User = new User();
  status:string


  constructor(private userService:UserService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.email = localStorage.getItem('email')
    this.getUser();
  }

  createProfileAddForm(){
    this.profileForm=this.formBuilder.group({
      id:this.user.id,
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      status:true
    })
  }

  getUser(){
      if(this.email){
        this.userService.getByEmail(this.email).subscribe(response=>{
            this.user = response;
            if(response.status){
              this.status = "Aktif"
            }else{
              this.status = "Aktif Değil"
            }
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      }
  }

  updateProfile(){
    if(this.profileForm.valid){
      let profileModel = Object.assign({},this.profileForm.value)
      this.userService.profileUpdate(profileModel).subscribe(response=>{
        this.toastrService.success(response.message);
      },responseError=>{
       this.toastrService.error(responseError.error);
      });
    }else{
      this.toastrService.error("Formu Boş Bıraktınız")
    }
  }

}
