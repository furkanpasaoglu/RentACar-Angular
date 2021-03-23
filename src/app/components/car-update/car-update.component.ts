import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CarService} from '../../services/car.service';
import {BrandService} from '../../services/brand.service';
import {ColorService} from '../../services/color.service';
import {ActivatedRoute} from '@angular/router';
import {Color} from '../../models/color';
import {Brand} from '../../models/brand';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  carId: number;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private colorService: ColorService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = parseInt(params['id']);
      }
    });
    this.createCarUpdateForm();
    this.brandList();
    this.colorList();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.carId],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  brandList() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  colorList() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
      }, error => {
        if (error.error.Errors.length > 0) {
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik!', 'Hata');
    }
  }
}
