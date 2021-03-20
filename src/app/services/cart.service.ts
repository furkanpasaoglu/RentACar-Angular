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
    if (this.list().length > 0) {
      this.toastrService.error('İstenilen Araç Eklenemedi: '+this.list()[this.list().length-1].car.brandName + " "+
        this.list()[this.list().length-1].car.description,'Şu Anda Başka Bir Araç var');
    } else {
      let item = CartItems.find(c => c.car.id === car.id);
      let cartItem = new CartItem();
      if (item) {
        this.toastrService.error('Arac Zaten Sepetinizde Mevcut');
      } else {
        cartItem.car = car;
        cartItem.quantity = 1;
        CartItems.push(cartItem);
        this.toastrService.success(car.brandName + ' ' + car.description, 'Sepete Eklendi');
      }
    }
  }

  removeFromCart(car: Car) {
    let item = CartItems.find(c => c.car.id === car.id);
    if (item != null) {
      CartItems.splice(CartItems.indexOf(item), 1);
      this.toastrService.error(car.brandName + ' ' + car.description, 'Başarıyla Kaldırıldı');
    }
  }

  list(): CartItem[] {
    return CartItems;
  }
}
