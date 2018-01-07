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
  selectedCarIndex: number;

  @SessionStorage()
  carTypes: string[];

  @SessionStorage()
  years: number[];

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
    if (!this.years) {
      const maxYears = 60;
      const startYear = new Date().getFullYear() - maxYears;
      this.years = Array.from({length: maxYears}, (v, k) => k + 1)
        .map(k => k + startYear)
        .reverse()
    }

    this.assignValueToForm(this.emptyCar());
  }

  private emptyCar() {
    return {car: new Car(), i: -1}
  }

  assignValueToForm({car, i}: { car: Car, i: number }) {
    setTimeout(() => {
      this.carForm = this.fb.group({
        id: [car.id],
        manufacturer: [car.manufacturer, [Validators.required]],
        model: [car.model, [Validators.required]],
        type: [car.type, [Validators.required]],
        seatCount: [car.seatCount, Validators.min(1)],
        fuelUsage: [car.fuelUsage, Validators.min(0)],
        yearOfProduction: [car.yearOfProduction,
          [Validators.min(this.years[this.years.length - 1]), Validators.max(this.years[0]), Validators.required]],
        description: [car.description, Validators.maxLength(255)],
      });
      if (i == -1) {
        this.carForm.reset()
      }
    });


    this.selectedCarIndex = i;

  }

  deleteCar({car, i}: { car: Car, i: number }) {
    this.user.cars.splice(i, 1);
    if (this.selectedCarIndex == i) {
      this.selectedCarIndex = -1;
    }
    this.sub.next(this.user)
  }

  onCompleted({value, valid}: { value: Car, valid: boolean }) {
    if (valid) {
      if (this.selectedCarIndex >= 0) {
        this.user.cars[this.selectedCarIndex] = value;
      } else {
        this.user.cars.push(value);
      }
      this.sub.next(this.user);
      this.assignValueToForm(this.emptyCar());
    }
  }
}
