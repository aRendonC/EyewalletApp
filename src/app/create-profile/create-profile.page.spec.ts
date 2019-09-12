import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfilePage } from './create-profile.page';

describe('CreateProfilePage', () => {
  let component: CreateProfilePage;
  let fixture: ComponentFixture<CreateProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
