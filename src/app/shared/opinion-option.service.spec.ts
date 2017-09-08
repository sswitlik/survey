import { TestBed, inject } from '@angular/core/testing';

import { OpinionOptionService } from './opinion-option.service';

describe('OpinionOptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionOptionService]
    });
  });

  it('should be created', inject([OpinionOptionService], (service: OpinionOptionService) => {
    expect(service).toBeTruthy();
  }));
});
