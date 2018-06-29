import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css'],
  styles: [`
        .online {
            color: white;
        }
    `]
})
export class WarningAlertComponent implements OnInit {
  showPassword = false;
  showTime = [];

  constructor() { }

  showElement() {
    if (this.showPassword === false) {
      this.showPassword = true;
      this.showTime.push(Date.now());
    } else {
      this.showPassword = false;
      this.showTime.push(Date.now());
    }
  }

  getColor() {
    if (this.showTime.length > 5) {
      return 'red';
    }
  }

  ngOnInit() {
  }

}
