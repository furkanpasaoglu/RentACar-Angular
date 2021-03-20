import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../services/rental.service';
import {CartItem} from '../../models/cartItem';
import {Rental} from '../../models/rental';
import {environment} from '../../../environments/environment';
import {Car} from '../../models/car';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RentalDetail} from '../../models/rentalDetail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  baseUrl = environment.baseUrl;
  model = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  rentalResponse: Rental[];
  now = new Date();
  date: string;
  totalPrice: number = 0;
  carDetailReturnDate: Date;

  constructor(private cartService: CartService, private rentalService: RentalService,
              private  toastrService: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCart();
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Sepetiniz Boş Yönlendiriliyor...');
      this.router.navigate(['/']);
    } else {
      this.totalPrice = this.cartItems[this.cartItems.length - 1].car.dailyPrice;
      this.rentalService.getRentalByCarId(this.cartItems[this.cartItems.length - 1].car.id).subscribe(response => {
        if (response.data.length != 0) {
          this.rentalResponse = response.data;
          this.carDetailReturnDate = this.rentalResponse[this.rentalResponse.length - 1].returnDate;
        }
      });
    }
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  createRental() {
    if (!this.checkCarReturnDate()) {
      this.router.navigate(['/cart']);
    } else if (this.checkCarReturnDate()) {
      let MyRental: RentalDetail = {
        returnDate: new Date(this.model.year, this.model.month - 1, this.model.day + 1),
        carId: this.cartItems[0].car.id,
        customerId: 1
      };
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
    }
  }

  checkCarReturnDate(): boolean {
    if (this.carDetailReturnDate != undefined) {
      var fullDate = this.carDetailReturnDate.toString().split('-', 3);
      var day = parseInt(fullDate[2]);
      var month = parseInt(fullDate[1]);
      var year = parseInt(fullDate[0]);
      var date1 = new Date(year, month, day);
      var date2 = new Date(this.model.year, this.model.month, this.model.day);
      console.log(date1);
      console.log(date2);
      if (date1.getFullYear() > date2.getFullYear()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      } else if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() > date2.getMonth()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      } else if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth()
        && date1.getDate() >= date2.getDate()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      }
    } else {
      if (this.now.getFullYear() > this.model.year) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      } else if (this.now.getFullYear() == this.model.year && this.now.getMonth() > this.model.month) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      } else if (this.now.getDate() == this.model.day) {
        this.toastrService.error('Bugün Teslim Edilmek Şartıyla Araç Alınamaz');
        return false;
      } else if (this.now.getFullYear() == this.model.year && this.now.getDate() > this.model.day) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      }
    }
    return true;
  }

  calculatePrice():number {
    var date1 = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
    var date2 = new Date(this.model.year, this.model.month - 1, this.model.day);
    var timeDifference = Math.abs(date2.getTime() - date1.getTime());
    var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.totalPrice = dayDifference * this.cartItems[this.cartItems.length - 1].car.dailyPrice;
    return this.totalPrice;
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Anasayfa\'ya Yönlendiriliyor...');
      this.router.navigate(['/']);
    }
  }
}
