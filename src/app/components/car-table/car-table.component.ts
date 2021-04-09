import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css']
})
export class CarTableComponent implements OnInit {
  baseUrl= environment.baseUrl
  cars:Car[]=[]

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.carLoad();
  }

  carLoad(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      console.log(this.cars)
    })
  }

}
