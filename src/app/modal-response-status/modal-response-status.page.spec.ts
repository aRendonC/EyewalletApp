import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponseStatusPage } from './modal-response-status.page';

describe('ModalResponseStatusPage', () => {
  let component: ModalResponseStatusPage;
  let fixture: ComponentFixture<ModalResponseStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResponseStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResponseStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
