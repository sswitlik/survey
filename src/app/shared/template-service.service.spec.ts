import { TestBed, inject } from '@angular/core/testing';

import { TemplateServiceService } from './template-service.service';

describe('TemplateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateServiceService]
    });
  });

  it('should be created', inject([TemplateServiceService], (service: TemplateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
