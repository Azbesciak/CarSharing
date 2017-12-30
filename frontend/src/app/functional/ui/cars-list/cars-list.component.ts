import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../route/car";

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {

  @Input()
  cars: Car[];

  @Input()
  canDelete = false;

  @Output()
  carSelected = new EventEmitter();

  @Output()
  carDeleted = new EventEmitter();

  selected = -1;

  constructor() { }

  ngOnInit() {
  }

  onCarSelected(car: Car, index: number) {
    this.selected = index;
    this.carSelected.next({car: car, i: index});
  }

  onCarDeleted(car: Car, index: number) {
    this.carDeleted.next({car: car, i: index})
  }
}
