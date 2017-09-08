import {OpinionType} from './opinion-type.domain';
export class EventStats {

  type: OpinionType;
  value: number;
  counter: number;
  description: string;
}
