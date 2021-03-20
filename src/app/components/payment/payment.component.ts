import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../models/cartItem';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RentalDetail} from '../../models/rentalDetail';
import {FakeCreditCard} from '../../models/fakeCreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  totalPrice: number = 0;
  returnDate: Date;
  carId: number;
  year: number;
  month: number;
  day: number;
  rental: RentalDetail = new RentalDetail();
  fakeCreditCard: FakeCreditCard = new FakeCreditCard();
  rentalForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
  }

  createForm() {
    this.rentalForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required]


      // cardHolderName: ['', Validators.required, Validators.maxLength(50)],
      // cardNumber: ['', Validators.required, Validators.maxLength(16), Validators.minLength(16)],
      // expirationMonth: ['', Validators.required, Validators.min(1), Validators.max(12)],
      // expirationYear: ['', Validators.required, Validators.min(new Date().getFullYear()),
      //   Validators.max(new Date().getUTCFullYear() + 30)],
      // cvv: ['', Validators.required,Validators.minLength(3),Validators.maxLength(3)],
    });
  }

  addRental(rental: RentalDetail, fakeCreditCard: FakeCreditCard) {
    this.rentalService.addRental(rental, fakeCreditCard).subscribe(response => {
      this.toastrService.success('Araç kiralandı');
    });
  }
}
