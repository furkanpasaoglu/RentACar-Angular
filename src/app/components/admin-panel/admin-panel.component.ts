import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/car.service";
import {RentalService} from "../../services/rental.service";
import {CustomerService} from "../../services/customer.service";
import {Car} from "../../models/car";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  url = environment.baseUrl
  user:User = new User();
  totalCar:string
  totalRentedCar:string
  totalCustomer:string
  lastRentedCar:Car = new Car();

  constructor(private carService:CarService,
              private rentalService:RentalService,
              private customerService:CustomerService,
              private authService:AuthService,
              private localStorageService:LocalStorageService,
              private router:Router,
              private userService:UserService,
              private toastrService:ToastrService) {}

  ngOnInit(): void {
    if(this.localStorageService.get('yetki')){
      this.load();
    }else{
      this.router.navigate(['/'])
      this.toastrService.warning('Yetkili Değilsiniz')
    }
  }

  load(){
    this.getEmail();
    this.getTotalCars();
    this.getTotalRentedCar();
    this.getTotalCustomers();
    this.getLastRentedCar()
  }

  getEmail() {
    this.userService.getByEmail(this.localStorageService.get('email')).subscribe(response=>{
      this.user = response;
    })
  }

  getTotalCars(){
    this.carService.getTotalCars().subscribe(response=>{
      this.totalCar = response.data.toString()
    })
  }

  getTotalRentedCar(){
    this.rentalService.getTotalRentedCar().subscribe(response=>{
      this.totalRentedCar = response.data.toString();
    })
  }

  getTotalCustomers(){
    this.customerService.getTotalCustomers().subscribe(response=>{
      this.totalCustomer = response.data.toString();
    })
  }

  getLastRentedCar(){
    this.carService.getLastRentedCar().subscribe(response=>{
      this.lastRentedCar = response.data;
    })
  }

}
