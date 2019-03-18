import { TestBed, inject } from '@angular/core/testing';

import { ShiftDetailService } from './shift-detail.service';

describe('ShiftDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftDetailService]
    });
  });

  it('should be created', inject([ShiftDetailService], (service: ShiftDetailService) => {
    expect(service).toBeTruthy();
  }));
});
