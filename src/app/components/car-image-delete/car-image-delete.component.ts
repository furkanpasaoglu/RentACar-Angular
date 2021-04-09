import { Component, OnInit } from '@angular/core';
import {CarImagesService} from "../../services/car-images.service";
import {CarImage} from "../../models/carImage";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-car-image-delete',
  templateUrl: './car-image-delete.component.html',
  styleUrls: ['./car-image-delete.component.css']
})
export class CarImageDeleteComponent implements OnInit {
  baseUrl = environment.baseUrl;
  carImages:CarImage[]=[];

  constructor(private carImageService:CarImagesService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getImages();
  }

  getImages(){
    this.carImageService.getAll().subscribe(response=>{
      this.carImages = response.data;
    })
  }

  delete(imageId:number,carId:number){
    this.carImageService.deleteImage(new class implements CarImage {
      carId=carId;
      date:Date;
      id=imageId;
      imagePath: string;
    }).subscribe(response=>{
      window.location.reload();
      this.toastrService.success("Başarıyla Silinmiştir.");
    })
  }
}
