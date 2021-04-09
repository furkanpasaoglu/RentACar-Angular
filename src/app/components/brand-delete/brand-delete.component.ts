import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  brandDeleteForm:FormGroup;
  brands: Brand[];

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.createBrandDeleteForm();
    this.getBrands();
  }

  deleteBrand(){
    if(this.brandDeleteForm.valid){
      let brandModel = Object.assign({},this.brandDeleteForm.value)
      this.brandService.deleteBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı!")
      },responseError => {
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0;i<responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      });
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat!")
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  createBrandDeleteForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: ["",Validators.required]
    });
  }

}
