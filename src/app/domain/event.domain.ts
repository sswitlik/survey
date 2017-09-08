import { Template } from './template';
import { AnswerMask } from './answer-mask.domain';
import { Scheme } from './scheme.domain';
import { Tag } from './tag.domain';

export class Event {

  public title: string;
  public desc: string;
  public id: number;
  public from: Date;
  public to: Date;
  public tags: Tag[];
  public eventTemplate: Template;
  public answerMask: AnswerMask;

  public scheme: Scheme;

  public static instance(): Event {
    return new Event();
  }

  public static getEventStatus(event: Event): number {
    let result;
    let today = new Date();
    event.to = new Date(event.to);
    event.from = new Date(event.from);
    if (event.to.getTime() < today.getTime()) {
      result = -1;
    } else if (event.from.getTime() < today.getTime() && event.to.getTime() > today.getTime()) {
      result = 0;
    } else if (event.from.getTime() > today.getTime()) {
      result = 1;
    }
    return result;
  }
}
