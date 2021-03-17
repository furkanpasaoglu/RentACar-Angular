import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:Car[];
  faLira = faLiraSign;
  apiUrl = environment.baseUrl;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
      }
    });
  }

  getCarDetail(carId:number){
    this.carService.getCarDetail(carId).subscribe(response=>{
      this.carDetails = response.data
    })
  }

}
