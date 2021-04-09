import { Component, OnInit } from '@angular/core';
import {ColorService} from "../../services/color.service";
import {Color} from "../../models/color";

@Component({
  selector: 'app-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.css']
})
export class ColorTableComponent implements OnInit {
  colors:Color[]=[]

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

}
