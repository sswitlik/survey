import {OpinionType} from './opinion-type.domain';

export class OpinionOption {
  type: OpinionType;
  value: number;
  id: number;
  uniqueId: string;
  description: string;
}

