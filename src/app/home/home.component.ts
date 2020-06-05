import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedNumber: Object;
  numbers: Object;
  constructor(public api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getObs().subscribe(data => {
      this.numbers = data;
    })
    this.api.getAllNumbers();
  }

  addNewNumber() {
    this.selectedNumber = null;
    this.api.createUpdateSuccFlag = false;
    this.api.errorFlag = false;
  }
  updateNumber(num) {
    this.selectedNumber = num;
    this.api.createUpdateSuccFlag = false;
    this.api.errorFlag = false;
  }

  deleteNumber(num) {
    this.api.deleteNumber(num);
  }

}
