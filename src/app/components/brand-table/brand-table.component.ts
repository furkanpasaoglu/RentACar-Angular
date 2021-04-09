import { Component, OnInit } from '@angular/core';
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.css']
})
export class BrandTableComponent implements OnInit {
  brands:Brand[]=[];

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

}
