import { Injectable } from '@angular/core';
import {Car} from '../models/car';
import {CartItems} from '../models/cartItems';
import {CartItem} from '../models/cartItem';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) {
  }

  addToCart(car: Car) {
    CartItems.car = car;
  }

  removeFromCart(car: Car) {
    CartItems.car = undefined;
    this.toastrService.error(car.brandName + ' ' + car.modelName, 'Başarıyla Kaldırıldı');
  }

  getCart(){
    return CartItems;
  }

}
