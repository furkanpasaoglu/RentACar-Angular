import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ColorService} from '../../services/color.service';
import {ToastrService} from 'ngx-toastr';
import {Color} from '../../models/color';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colors: Color[] = [];
  colorUpdateForm: FormGroup;
  colorId: number;

  constructor(private colorService: ColorService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.colorId = parseInt(params['id']);
        this.getColorById(params['id']);
      }
    });
    this.createColorUpdateForm();
  }
  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(response => {
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
  getColorById(id: number) {
    this.colorService.getColorById(id).subscribe(response => {
      this.colors = response.data;
      console.log(response);
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorId],
      colorName: ['', Validators.required],
    });
  }
}
