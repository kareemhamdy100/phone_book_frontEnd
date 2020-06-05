import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flatten } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _numbers: Subject<any> = new Subject<any>();
  public numbersObs = this._numbers.asObservable();
  public numbers;
  public searchResult;
  /* flags for spinner */
  public searchFlag: boolean;
  public deleteFlag: boolean;
  public allFlag: boolean;
  public createUpdateFlag: boolean;
  public createUpdateSuccFlag: boolean;

  /*error massages*/
  public errorFlag: boolean;
  public golbalError: string;
  public createUpadateError;
  constructor(private http: HttpClient) {
    this.searchFlag = false;
    this.createUpdateFlag = false;
    this.deleteFlag = false;
    this.allFlag = false;
    this.createUpdateSuccFlag = false;

    this.errorFlag = false;
    this.createUpadateError = {};
    this._numbers.next(this.numbers);
  }
  getObs() {
    return this.numbersObs;
  }
  getAllNumbers() {

    this.allFlag = true;

    this.errorFlag = false;
    this.golbalError = '';
    this.http.get('http://localhost:3000/api/numbers').subscribe(data => {
      this.allFlag = false;
      this.numbers = data;
      this._numbers.next(this.numbers);
    },
      (err) => {
        this.allFlag = false;
        this.errorFlag = true;
        this.golbalError = err.message;
      }
    )
  }
  getSearchResult() {
    this._numbers.next(this.searchResult);
  }

  deleteNumber(num) {
    this.deleteFlag = true;

    this.errorFlag = false;
    this.golbalError = '';
    this.http.delete(`http://localhost:3000/api/numbers/${num.id}`).subscribe(
      (data) => {
        this.deleteFlag = false;
        console.log(data, "is deleted");
        this.getAllNumbers();
      },
      (err) => {
        this.deleteFlag = false;
        this.errorFlag = true;
        this.golbalError = err.message;
      }

    )
  }
  updateNumber(oldNum, newNum) {
    this.createUpdateFlag = true;

    this.createUpdateSuccFlag = false;
    this.errorFlag = false;
    this.createUpadateError = {};
    this.http.put(`http://localhost:3000/api/numbers/${oldNum.id}`, newNum)
      .subscribe((data) => {
        this.createUpdateFlag = false;
        this.createUpdateSuccFlag = true;
        console.log(data);
        this.getAllNumbers();
      }, (err) => {
        this.createUpdateFlag = false;
        this.createUpdateSuccFlag = false;
        this.errorFlag = true;
        this.createUpadateError.name = err.error.error.details.messages.name;
        this.createUpadateError.phone = err.error.error.details.messages.phone;
        console.log(err.error.error.details.messages);
      });
  }
  createNumber(num) {
    this.createUpdateFlag = true;
    this.createUpdateSuccFlag = false;
    this.errorFlag = false;
    this.createUpadateError = {};
    this.http.post(`http://localhost:3000/api/numbers`, num)
      .subscribe((data) => {
        this.createUpdateFlag = false;
        this.createUpdateSuccFlag = true;
        console.log(data);
        this.getAllNumbers();
      }, (err) => {
        this.createUpdateFlag = false;
        this.createUpdateSuccFlag = false;
        this.errorFlag = true;
        this.createUpadateError.name = err.error.error.details.messages.name;
        this.createUpadateError.phone = err.error.error.details.messages.phone;
        console.log(err.error.error.details.messages.phone);
      });
  }

  search(name: string) {
    this.searchFlag = true;
    this.errorFlag = false;
    this.golbalError = '';
    this.http.get(` http://localhost:3000/api/numbers?filter[where][name]=${name}`)
      .subscribe((data) => {
        console.log(data);
        this.searchFlag = false;
        this.searchResult = data
        this.getSearchResult();
      }, (err) => {
        this.searchFlag = false;
        this.errorFlag = true;
        this.golbalError = err.message;
        console.log(err)
      });
  }
}
