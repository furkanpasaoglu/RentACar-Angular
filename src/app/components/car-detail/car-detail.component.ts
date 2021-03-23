import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:Car[];
  faLira = faLiraSign;
  apiUrl = environment.baseUrl;
  rentalDetail: Rental[];

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
              private cartService:CartService, private rentalService: RentalService,
              private router: Router) { }

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

  addCart(car:Car){
    this.rentalService.getRentalByCarId(car.id).subscribe(response => {
      this.rentalDetail = response.data;
    });
    if (this.cartService.list().length > 0) {
      this.router.navigate(['/cart'])
    }
    this.cartService.addToCart(car);
    this.router.navigate(['/cart'])
  }
}
