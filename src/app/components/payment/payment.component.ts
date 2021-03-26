import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../models/cartItem';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RentalDetail} from '../../models/rentalDetail';
import {FakeCreditCard} from '../../models/fakeCreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rental: RentalDetail = new RentalDetail();
  fakeCreditCard: FakeCreditCard = new FakeCreditCard();
  rentalForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private localStorageService:LocalStorageService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });

    var cardHolderName = this.localStorageService.get('HolderName');
    var expirationYear = this.localStorageService.get('ExpirationYear');
    var expirationMonth = this.localStorageService.get('ExpirationMonth');
    var cardNumber = this.localStorageService.get('CartNumber');
    var cvv = this.localStorageService.get('Cvv');
    if (cardHolderName != null && expirationMonth != null && expirationYear != null && cardNumber != null && cvv != null) {
      this.fakeCreditCard.cardHolderName = cardHolderName;
      this.fakeCreditCard.expirationYear = parseInt(expirationYear);
      this.fakeCreditCard.expirationMonth = parseInt(expirationMonth);
      this.fakeCreditCard.cardNumber = cardNumber;
      this.fakeCreditCard.cvv = cvv;
    }

  }

  createForm() {
    this.rentalForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  addRental(rental: RentalDetail, fakeCreditCard: FakeCreditCard) {
     this.rentalService.addRental(rental, fakeCreditCard).subscribe(response => {
       this.toastrService.success('Araç kiralandı');
     });
  }

  addCreditCart(fakeCreditCard: FakeCreditCard){
    this.localStorageService.set('HolderName',fakeCreditCard.cardHolderName)
    this.localStorageService.set('CartNumber',fakeCreditCard.cardNumber)
    this.localStorageService.set('ExpirationYear',fakeCreditCard.expirationYear.toString())
    this.localStorageService.set('ExpirationMonth',fakeCreditCard.expirationMonth.toString())
    this.localStorageService.set('Cvv',fakeCreditCard.cvv)
    this.toastrService.success("Başarıyla Kartınız Kaydedildi")
  }

  getCreditCart(){
     this.localStorageService.get('HolderName');
     this.localStorageService.get('CartNumber');
     this.localStorageService.get('ExpirationYear');
     this.localStorageService.get('ExpirationMonth');
     this.localStorageService.get('Cvv');
  }
}
