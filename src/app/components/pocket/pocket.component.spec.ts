import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketComponent } from './pocket.component';

describe('PocketComponent', () => {
  let component: PocketComponent;
  let fixture: ComponentFixture<PocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocketComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
