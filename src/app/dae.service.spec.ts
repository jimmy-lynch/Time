import { TestBed } from '@angular/core/testing';

import { DaeService } from './dae.service';

describe('DaeService', () => {
  let service: DaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
