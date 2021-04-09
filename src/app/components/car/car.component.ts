import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  apiUrl = environment.baseUrl;
  dataLoaded = false;
  faLira = faLiraSign;
  filterText ="";

  constructor(private carService:CarService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId'])
        this.getCarByBrandAndColor(params['brandId'], params['colorId']);
      else if (params['brandId']) this.getCarsByBrand(params['brandId']);
      else if (params['colorId']) this.getCarsByColor(params['colorId']);
      else this.getCars();
    })
  }

  getCarByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  changeFilterTextSize(filterText:string){
    this.filterText = filterText.toLocaleUpperCase();
  }

  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
}
