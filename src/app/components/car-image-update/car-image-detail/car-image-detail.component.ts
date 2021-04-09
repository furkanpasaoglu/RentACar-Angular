import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Car} from "../../../models/car";
import {CarService} from "../../../services/car.service";
import {ActivatedRoute} from "@angular/router";
import {CarImagesService} from "../../../services/car-images.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-car-image-detail',
  templateUrl: './car-image-detail.component.html',
  styleUrls: ['./car-image-detail.component.css']
})
export class CarImageDetailComponent implements OnInit {
  baseUrl = environment.baseUrl;
  details:Car[]=[];
  id:number;

  constructor(private carService:CarService,
              private activetedRoute:ActivatedRoute,
              private carImageService:CarImagesService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.activetedRoute.params.subscribe(response=>{
      this.id = response['id'];
      if(response['id']){
        this.getByCarId(response['id'])
      }
    })
  }

  getByCarId(id:number){
    this.carService.getCarDetail(id).subscribe(response=>{
      this.details = response.data;
    })
  }

  public uploadFile = (files:any,imageId:number) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    var formData:any = new FormData();
    formData.append('file', fileToUpload);
    formData.append("CarId", this.id.toString());
    formData.append("Id", imageId.toString());
    this.carImageService.updated(formData).subscribe(response=>{
      this.toastrService.success("Başarılı")
    })
  }
}
