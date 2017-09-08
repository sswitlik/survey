import { OpinionOption } from './opinion-option.domain';
import { Event } from './event.domain';

export class AnswerUser {
  opinionOption: OpinionOption;
  event: Event;
  userId: string;
}
