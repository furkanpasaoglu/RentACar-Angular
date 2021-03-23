import { Component, OnInit } from '@angular/core';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BrandService} from '../../services/brand.service';
import {Brand} from '../../models/brand';
import {ColorService} from '../../services/color.service';
import {Color} from '../../models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(private carService:CarService,private formBuilder:FormBuilder,private toastrService:ToastrService,
              private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.brandList();
    this.colorList();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  brandList(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  colorList(){
    this.colorService.getColors().subscribe(response=> {
      this.colors = response.data;
    })
  }

  addToCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.addToCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0;i<responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat!")
    }
  }

}
