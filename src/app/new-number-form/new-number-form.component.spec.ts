import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNumberFormComponent } from './new-number-form.component';

describe('NewNumberFormComponent', () => {
  let component: NewNumberFormComponent;
  let fixture: ComponentFixture<NewNumberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNumberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
