import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Filters} from '../../models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  setRoute() {
    if (Filters['brandId'] && Filters['colorId']) {
      this.router.navigate([
        `cars/brand/${Filters.brandId}/color/${Filters.colorId}`,
      ]);
    } else if (Filters['brandId']) {
      this.router.navigate([`cars/brand/${Filters.brandId}`]);
    } else if (Filters['colorId']) {
      this.router.navigate([`cars/color/${Filters.colorId}`]);
    } else {
      this.router.navigate([`cars/`]);
    }
  }

  clearRoute() {
    this.router.navigate([`cars/`]);
  }

}
