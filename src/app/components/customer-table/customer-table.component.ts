import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  customers:Customer[]=[];

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
    })
  }

}
