import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-new-number-form',
  templateUrl: './new-number-form.component.html',
  styleUrls: ['./new-number-form.component.css']
})
export class NewNumberFormComponent implements OnInit {

  private _numberToUpate;
  @Input() set numberToUpdate(value) {
    this._numberToUpate = value;
    this.renderForm(value);
  }
  get numberToUpdate() {
    return this._numberToUpate;
  }
  numberForm: FormGroup;

  submitted = false;

  constructor(public api: ApiService, private formBuilder: FormBuilder) { }

  addNewNumber(name, phone) {
    this.submitted = true;
    this.api.createUpdateSuccFlag = false;
    if (this.numberForm.invalid) {
      return;
    }
    this.api.createNumber({ name, phone });

  }
  updateNumber(oldNum, name, phone) {
    this.submitted = true;
    this.api.createUpdateSuccFlag = false;
    if (this.numberForm.invalid) {
      return;
    }
    this.api.updateNumber(oldNum, { name, phone });
  }
  ngOnInit(): void {
  }

  renderForm(number) {
    this.numberForm = this.formBuilder.group({
      name: [number ? number.name : '', Validators.required],
      phone: [number ? number.phone : '', Validators.required]
    });
  }

}
