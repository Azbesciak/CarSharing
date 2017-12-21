import { Component, OnInit } from '@angular/core';
import {Route} from "../../functional/ggmaps/route";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  route: Route;
  ngOnInit(): void {
    this.route = new Route();
  }



}
