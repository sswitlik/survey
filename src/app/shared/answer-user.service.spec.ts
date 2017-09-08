import { TestBed, inject } from '@angular/core/testing';

import { AnswerUserService } from './answer-user.service';

describe('AnswerUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerUserService]
    });
  });

  it('should be created', inject([AnswerUserService], (service: AnswerUserService) => {
    expect(service).toBeTruthy();
  }));
});
