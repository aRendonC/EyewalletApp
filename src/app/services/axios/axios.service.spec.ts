import { TestBed } from '@angular/core/testing';

import { AxiosService } from './axios.service';

describe('AxiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AxiosService = TestBed.get(AxiosService);
    expect(service).toBeTruthy();
  });
});
