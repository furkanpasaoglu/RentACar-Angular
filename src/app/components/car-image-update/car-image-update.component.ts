import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-car-image-update',
  templateUrl: './car-image-update.component.html',
  styleUrls: ['./car-image-update.component.css']
})
export class CarImageUpdateComponent implements OnInit {
  cars:Car[]=[];
  details:Car[]=[];
  baseUrl = environment.baseUrl;

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    })
  }

  getByCarId(id:number){
    this.carService.getCarDetail(id).subscribe(response=>{
      this.details = response.data;
    })
  }


}
