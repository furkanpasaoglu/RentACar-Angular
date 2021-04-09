import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import {CartComponent} from './components/cart/cart.component';
import {PaymentComponent} from './components/payment/payment.component';
import {CarAddComponent} from './components/car-add/car-add.component';
import {BrandAddComponent} from './components/brand-add/brand-add.component';
import {ColorAddComponent} from './components/color-add/color-add.component';
import {ColorUpdateComponent} from './components/color-update/color-update.component';
import {CarUpdateComponent} from './components/car-update/car-update.component';
import {BrandUpdateComponent} from './components/brand-update/brand-update.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginGuard} from './guards/login.guard';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {ColorDeleteComponent} from "./components/color-delete/color-delete.component";
import {BrandDeleteComponent} from "./components/brand-delete/brand-delete.component";
import {CarDeleteComponent} from "./components/car-delete/car-delete.component";
import {CarImageDeleteComponent} from "./components/car-image-delete/car-image-delete.component";
import {CarTableComponent} from "./components/car-table/car-table.component";
import {ColorTableComponent} from "./components/color-table/color-table.component";
import {BrandTableComponent} from "./components/brand-table/brand-table.component";
import {UserTableComponent} from "./components/user-table/user-table.component";
import {CustomerTableComponent} from "./components/customer-table/customer-table.component";
import {CarImageAddComponent} from "./components/car-image-add/car-image-add.component";
import {CarImageUpdateComponent} from "./components/car-image-update/car-image-update.component";
import {CarImageDetailComponent} from "./components/car-image-update/car-image-detail/car-image-detail.component";

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},

  //Auth
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  //Admin
  {path:"adminpanel", component:AdminPanelComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/profile", component:ProfileComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/users",component:UserTableComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/customer",component:CustomerTableComponent,canActivate:[LoginGuard]},

  //Car
  {path:"adminpanel/car",component:CarTableComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/update",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/delete",component:CarDeleteComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/imagedelete",component:CarImageDeleteComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/imageadd",component:CarImageAddComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/imageupdate",component:CarImageUpdateComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/car/imageupdateDetail/:id",component:CarImageDetailComponent,canActivate:[LoginGuard]},

  //Brand
  {path:"adminpanel/brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/brand/update",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/brand/delete",component:BrandDeleteComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/brand",component:BrandTableComponent,canActivate:[LoginGuard]},

  //Color
  {path:"adminpanel/color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/color/update",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/color/delete",component:ColorDeleteComponent,canActivate:[LoginGuard]},
  {path:"adminpanel/color",component:ColorTableComponent,canActivate:[LoginGuard]},

  //Cars
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"car/details/:carId", component: CarDetailComponent },
  {path:'cars/brand/:brandId/color/:colorId', component: CarComponent },

  //Cart & Payment
  {path: "cart", component: CartComponent,canActivate:[LoginGuard] },
  {path: 'payment/:myrental', component: PaymentComponent,canActivate:[LoginGuard]},

  //Profile
  {path: 'profile', component: ProfileComponent,canActivate:[LoginGuard]},

  //Default
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
