import { OpinionOption } from './opinion-option.domain';

export class Template {
  name: string;
  id: number;
  public opinions: OpinionOption[];
}
