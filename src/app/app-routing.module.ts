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

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},

  //Auth
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  //Cars
  {path:"cars",component:CarComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"car/update/:id",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"car/details/:carId", component: CarDetailComponent },
  {path:'cars/brand/:brandId/color/:colorId', component: CarComponent },

  //Brands
  {path:"brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brand/update/:id",component:BrandUpdateComponent,canActivate:[LoginGuard]},

  //Colors
  {path:"color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"color/update/:id",component:ColorUpdateComponent,canActivate:[LoginGuard]},

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
