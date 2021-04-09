import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services/car.service";
import {ToastrService} from "ngx-toastr";
import {Car} from "../../models/car";
import {CarImagesService} from "../../services/car-images.service";

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {
  imageAddForm:FormGroup;
  cars:Car[]=[];
  selectedFile : File = null

  constructor(private carService:CarService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private carImageService:CarImagesService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getCarList();
    this.createImageAddForm();
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      CarId: ['',Validators.required],
      file: [null],
    });
  }

  getCarList(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    })
  }

  uploadFile(event:any) {
    const carImage = (event.target as HTMLInputElement).files[0];
    this.imageAddForm.patchValue({
      file: carImage
    });
    this.imageAddForm.get('file').updateValueAndValidity()
  }


  submitForm() {
    if(this.imageAddForm.valid){
      var formData: any = new FormData();
      formData.append("file", this.imageAddForm.get('file').value);
      formData.append("CarId", this.imageAddForm.get('CarId').value);
      this.carImageService.upload(formData).subscribe(response=>{
        this.toastrService.success(response.message);
      },error=>{
        this.toastrService.error(error.error.message);
      })
    }else{
      this.toastrService.error('Form Bilgileriniz Eksik');
    }

  }
}
