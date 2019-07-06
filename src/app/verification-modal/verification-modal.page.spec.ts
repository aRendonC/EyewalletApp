import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationModalPage } from './verification-modal.page';

describe('VerificationModalPage', () => {
  let component: VerificationModalPage;
  let fixture: ComponentFixture<VerificationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
