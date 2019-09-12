import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinModalRegistryPage } from './pin-modal-registry.page';

describe('PinModalRegistryPage', () => {
  let component: PinModalRegistryPage;
  let fixture: ComponentFixture<PinModalRegistryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinModalRegistryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinModalRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
