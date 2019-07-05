import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryPinPage } from './registry-pin.page';

describe('RegistryPinPage', () => {
  let component: RegistryPinPage;
  let fixture: ComponentFixture<RegistryPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryPinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
