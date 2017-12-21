import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drag-list',
  templateUrl: './drag-list.component.html',
  styleUrls: ['./drag-list.component.scss']
})
export class DragListComponent implements OnInit {

  @Input()
  items;
  constructor() { }

  ngOnInit() {
  }

}
