import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../route/car";

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {

  @Input()
  car: Car;

  @Input()
  canDelete: boolean = false;

  @Input()
  clickable: boolean;

  @Output()
  onCarSelect = new EventEmitter<Car>();

  @Output()
  conCarDeleted = new EventEmitter<Car>();

  constructor() { }

  ngOnInit() {
    if (this.canDelete) {
      this.clickable = true;
    }
  }

}
