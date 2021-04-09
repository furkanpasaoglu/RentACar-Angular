import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../../services/local-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private localStorageService:LocalStorageService,
              private router:Router,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  lobby(){
    this.localStorageService.clean();
    this.toastrService.info("Çıkış Yapıldı.")
    this.router.navigate(['']);
  }

}
