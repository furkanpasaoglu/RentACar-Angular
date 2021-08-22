import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule} from 'ngx-toastr';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterComponent } from './components/filter/filter.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/admin-panel/sidebar/sidebar.component';
import { NavbarComponent } from './components/admin-panel/navbar/navbar.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarImageDeleteComponent } from './components/car-image-delete/car-image-delete.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { ColorTableComponent } from './components/color-table/color-table.component';
import { BrandTableComponent } from './components/brand-table/brand-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { CarImageUpdateComponent } from './components/car-image-update/car-image-update.component';
import { CarImageDetailComponent } from './components/car-image-update/car-image-detail/car-image-detail.component';
 

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterPipePipe,
    CartComponent,
    PaymentComponent,
    FilterComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidebarComponent,
    NavbarComponent,
    AdminPanelComponent,
    ColorDeleteComponent,
    BrandDeleteComponent,
    CarDeleteComponent,
    CarImageDeleteComponent,
    CarTableComponent,
    ColorTableComponent,
    BrandTableComponent,
    UserTableComponent,
    CustomerTableComponent,
    CarImageAddComponent,
    CarImageUpdateComponent,
    CarImageDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
