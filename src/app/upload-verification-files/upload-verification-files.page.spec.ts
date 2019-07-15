import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVerificationFilesPage } from './upload-verification-files.page';

describe('UploadVerificationFilesPage', () => {
  let component: UploadVerificationFilesPage;
  let fixture: ComponentFixture<UploadVerificationFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadVerificationFilesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadVerificationFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
