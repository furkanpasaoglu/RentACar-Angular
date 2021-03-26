import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';

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
  userFindeksForm: FormGroup;
  findeks:number;
  carFindeks:number

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
              private cartService:CartService, private rentalService: RentalService,
              private router: Router,
              private authService:AuthService,
              private toastrService:ToastrService,
              private userService:UserService,
              private formBuilder:FormBuilder,
              private localStorageService:LocalStorageService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
      }
    });
    this.createUserFindeksForm();

  }

  getCarDetail(carId:number){
    this.carService.getCarDetail(carId).subscribe(response=>{
      this.carDetails = response.data
      this.carFindeks = this.carDetails[0].findeksScore;
    })
  }

  addCart(car:Car){
    if(this.authService.isAuthenticated()){
      console.log(this.carFindeks,this.localStorageService.get('findeks'))
      if(parseInt(this.localStorageService.get('findeks')) !=undefined || parseInt(this.localStorageService.get('findeks'))!=null){
        if(this.carFindeks<parseInt(this.localStorageService.get('findeks')))
        {
          this.rentalService.getRentalByCarId(car.id).subscribe(response => {
            this.rentalDetail = response.data;
          });
          if (this.cartService.list().length > 0) {
            this.router.navigate(['/cart'])
          }
          this.cartService.addToCart(car);
          this.router.navigate(['/cart'])
        }else{
          this.toastrService.error("Arabayı Kiralayamazsınız Findeks Puanınız yetmiyor.")
        }
      }else{
        this.toastrService.info("Lütfen Findeks Puanınızı Hesaplayınız")

      }
    }else{
      this.toastrService.info("Lütfen Giriş Yapınız")
    }
  }

  createUserFindeksForm() {
    this.userFindeksForm = this.formBuilder.group({
      tc: ['', Validators.required],
      dateYear: ['', Validators.required],
    });
  }

  getUserFindeks() {
    if (this.userFindeksForm.valid) {
      if(parseInt(this.localStorageService.get('findeks'))>0){
        this.toastrService.info('Findeks Puanınız: ' + this.localStorageService.get('findeks'))
      }else{
        let userFindeksModel = Object.assign({}, this.userFindeksForm.value);
        this.userService.fakeFindeks(userFindeksModel).subscribe(response => {
          this.findeks = response.data.userFindeks;
          this.localStorageService.set('findeks',this.findeks.toString())
          this.toastrService.info('Findeks Hesaplaması Başarılı. Findeks Puanınız: ' + this.findeks);
        });
      }
    }
  }




}
