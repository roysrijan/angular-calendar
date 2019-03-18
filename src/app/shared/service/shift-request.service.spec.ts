import { TestBed, inject } from '@angular/core/testing';

import { ShiftRequestService } from './shift-request.service';

describe('ShiftRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftRequestService]
    });
  });

  it('should be created', inject([ShiftRequestService], (service: ShiftRequestService) => {
    expect(service).toBeTruthy();
  }));
});
