import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Brand} from "../../models/brand";
import {Color} from "../../models/color";
import {Car} from "../../models/car";
import {CarService} from "../../services/car.service";
import {ToastrService} from "ngx-toastr";
import {BrandService} from "../../services/brand.service";
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm:FormGroup;
  brands:Brand[];
  colors:Color[];
  cars:Car[];

  constructor(private carService:CarService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private brandService:BrandService,
              private colorService:ColorService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.createCarAddForm();
    this.brandList();
    this.colorList();
    this.getCarIdList();
  }

  createCarAddForm(){
    this.carDeleteForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelName:["",Validators.required],
      id:["",Validators.required]
    })
  }

  deleteCar(){
    if(this.carDeleteForm.valid){
      let carModel = Object.assign({},this.carDeleteForm.value);
      this.carService.deleteCar(carModel).subscribe(response=>{
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

  getCarIdList(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
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

}
