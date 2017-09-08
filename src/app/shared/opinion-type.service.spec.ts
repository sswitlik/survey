import { TestBed, inject } from '@angular/core/testing';

import { OpinionTypeService } from './opinion-type.service';

describe('OpinionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionTypeService]
    });
  });

  it('should be created', inject([OpinionTypeService], (service: OpinionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
