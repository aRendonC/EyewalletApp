import { TestBed } from '@angular/core/testing';

import { InterceptadorService } from './interceptador.service';

describe('InterceptadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptadorService = TestBed.get(InterceptadorService);
    expect(service).toBeTruthy();
  });
});
