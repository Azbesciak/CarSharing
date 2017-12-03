import { Component } from '@angular/core';
import { DataService } from "./data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private data: DataService) {}

  title = 'app';
  heroes = [];

  getData() {
    this.data.getRoles().then(resp => {
      console.log(resp)
    });
  }
}
