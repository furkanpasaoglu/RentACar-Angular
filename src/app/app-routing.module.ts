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

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  //Cars
  {path:"cars",component:CarComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"car/update/:id",component:CarUpdateComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"car/details/:carId", component: CarDetailComponent },
  {path:'cars/brand/:brandId/color/:colorId', component: CarComponent },

  //Brands
  {path:"brand/add",component:BrandAddComponent},
  {path:"brand/update/:id",component:BrandUpdateComponent},

  //Colors
  {path:"color/add",component:ColorAddComponent},
  {path:"color/update/:id",component:ColorUpdateComponent},

  //Cart & Payment
  {path: "cart", component: CartComponent },
  {path: 'payment/:myrental', component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
