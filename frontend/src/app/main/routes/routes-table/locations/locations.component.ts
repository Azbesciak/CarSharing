import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  @Input()
  locations: string[];

  @Input()
  start: string;

  @Input()
  end: string;
  constructor() { }

  ngOnInit() {
  }

}
