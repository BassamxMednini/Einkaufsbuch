import { Component } from "@angular/core";

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})

export class SuccessAlertComponent {
  userName = '';
  showSecret = false;
  log = [];

  userNameEmpty() {
    this.userName = '';
  }
  
  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }

}

