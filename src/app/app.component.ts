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
    // Parse the JSON into an object that the directive can use
    try {
      let currentData = JSON.parse(value);
      // This allows arrays to be used to break up the template 
      if (Array.isArray(currentData.template)) {
        currentData.template = currentData.template.join('');
      }
      // Set the attribute for the directive to use
      this.data = currentData;
    } catch (e) {
      this.error = e;
    }
  }

  ngOnInit() {
  }
}
 