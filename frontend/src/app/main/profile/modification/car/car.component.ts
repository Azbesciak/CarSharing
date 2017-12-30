import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUserModificator} from "../app-user-modificator";
import {Car} from "../../../../functional/route/car";
import {SessionStorage} from "ngx-webstorage";
import {DataService} from "../../../../functional/data/data.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent extends AppUserModificator implements OnInit {

  carForm: FormGroup;
  currentCarIndex: number;

  @SessionStorage()
  carTypes: string[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private data: DataService) {
    super()
  }

  ngOnInit() {
    if (!this.carTypes) {
      this.data.getAllCarTypes()
        .then((types: string[]) => this.carTypes = types)
    }
    this.assignValueToForm(this.emptyCar());
  }

  private emptyCar() {
    return {car: new Car(), i: -1}
  }

  assignValueToForm({car, i}: { car: Car, i: number }) {
    if (this.carForm) {
      // this.carForm.reset();
      this.carForm = null;
    }
    setTimeout(() => {
      this.carForm = this.fb.group({
        id: [car.id],
        manufacturer: [car.manufacturer, [Validators.required]],
        model: [car.model, [Validators.required]],
        type: [car.type, [Validators.required]],
        seatCount: [car.seatCount, Validators.min(1)],
        fuelUsage: [car.fuelUsage, Validators.min(0)],
        yearOfProduction: [car.yearOfProduction ? car.yearOfProduction.getFullYear() : undefined,
          [Validators.min(1900), Validators.max(new Date().getFullYear()), Validators.required]],
        description: [car.description, Validators.maxLength(255)],
      });
    });
    this.currentCarIndex = i;
  }

  deleteCar({car, i}: {car: Car, i: number}) {
    this.user.cars.splice(i, 1);
    if (this.currentCarIndex == i) {
      this.currentCarIndex = -1;
    }
  }

  onCompleted({value, valid}: { value: Car, valid: boolean }) {
    if (valid) {
      if (!(value.yearOfProduction instanceof Date)) {
        const date = new Date();
        date.setFullYear(value.yearOfProduction);
        value.yearOfProduction = date;
      }
      if (this.currentCarIndex >= 0) {
        this.user.cars[this.currentCarIndex] = value;
      } else {
        this.user.cars.push(value);
      }
      this.sub.next(this.user);
      this.assignValueToForm(this.emptyCar());
    }
  }
}
