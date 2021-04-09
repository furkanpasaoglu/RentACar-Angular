import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users:User[]=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(response=>{
      this.users = response.data;
    })
  }

}
