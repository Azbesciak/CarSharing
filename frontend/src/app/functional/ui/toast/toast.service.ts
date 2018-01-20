import { Injectable } from '@angular/core';
import {Md2Toast} from "md2";

@Injectable()
export class ToastService {

  constructor(private toast: Md2Toast) { }

  show(message: string, time: number = 5000) {
    this.toast.show(message, time)
  }

}
