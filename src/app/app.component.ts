import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 2 Html Strings';
  data: any;
  error: any;

  addInput(value) {
    this.error = undefined;
    try {
      this.data = JSON.parse(value);
    } catch (e) {
      this.error = e;
    }
  }

  ngOnInit() {
  }
}
