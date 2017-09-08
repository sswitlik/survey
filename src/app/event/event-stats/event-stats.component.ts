import {Component, OnInit} from '@angular/core';
import {EventServiceService} from '../../shared/event-service.service';
import {Router} from '@angular/router';
import {Routerable} from '../../shared/base/base.component';
import {Event} from '../../domain/event.domain';
import {AnswerUserService} from '../../shared/answer-user.service';
import {EventStats} from '../../domain/event-stats.domain';
import {ChartData} from '../../domain/chart-data.domain';

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.css']
})
export class EventStatsComponent extends Routerable implements OnInit {

  event: Event;
  eventStats: EventStats[] = [];

  starsData: ChartData;
  commentsData: ChartData;
  emoticonsData: ChartData;
  questionnairesData: ChartData;

  starsChart: any;
  commentsChart: any;
  emoticonsChart: any;
  questionnairesChart: any;


  constructor(protected router: Router,
              private eventService: EventServiceService,
              private answerUserService: AnswerUserService) {
    super(router);
  }

  ngOnInit() {
    this.event = EventServiceService.event;
    if (this.event === undefined) {
      this.goToEventShow();
      return;
    }

    this.starsData = new ChartData;
    this.commentsData = new ChartData;
    this.emoticonsData = new ChartData;
    this.questionnairesData = new ChartData;

    this.createEventStats();
    this.sortOpinions();

    this.starsChart = this.createChart(this.starsData);
    this.commentsChart = this.createChart(this.commentsData);
    this.emoticonsChart = this.createChart(this.emoticonsData);
    this.questionnairesChart = this.createChart(this.questionnairesData);

  }

  createChart(chartData: ChartData): any {
    const chartType = {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.data
        }]
    };
    return chartType;

  }

  createEventStats() {

    this.event.eventTemplate.opinions.forEach(item => {
        this.event.answerMask.opinionCounter.forEach(item2 => {
            if (item.uniqueId === item2.opinionUniqueId) {
              this.eventStats.push({
                type: item.type,
                value: item.value,
                description: item.description,
                counter: item2.opinionCounter
              });
            }
          }
        );
      }
    );

    // for (let i = 0; i < this.event.eventTemplate.opinions.length; i++) {
    //   for (let j = 0; j < this.event.answerMask.opinionCounter.length; j++) {
    //     if (this.event.eventTemplate.opinions[i].uniqueId === this.event.answerMask.opinionCounter[j].opinionUniqueId) {
    //       this.eventStats.push({
    //           type: this.event.eventTemplate.opinions[i].type,
    //           value: this.event.eventTemplate.opinions[i].value,
    //           description: this.event.eventTemplate.opinions[i].description,
    //           counter: this.event.answerMask.opinionCounter[j].opinionCounter
    //       });
    //     }
    //   }
    // }
  }

  sortOpinions() {
    for (let i = 0; i < this.eventStats.length; i++) {
      switch (this.eventStats[i].type.type) {
        case 'Stars':
          this.starsData.type = this.eventStats[i].type.type;
          this.starsData.data.push(this.eventStats[i].counter);
          this.starsData.labels.push(this.eventStats[i].value.toString() + ' stars');
          break;
        case 'Emoticons':
          this.emoticonsData.type = this.eventStats[i].type.type;
          this.emoticonsData.data.push(this.eventStats[i].counter);
          this.emoticonsData.labels.push(this.eventStats[i].value.toString());
          break;
        // case 'Comment':
        //   this.commentsData.type = this.eventStats[i].type.type;
        //   this.commentsData.data.push(this.eventStats[i].counter);
        //   this.commentsData.labels.push(this.eventStats[i].description);
        //   break;
        // case 'Questionnaire':
        //   this.questionnairesData.type = this.eventStats[i].type.type;
        //   this.questionnairesData.data.push(this.eventStats[i].counter);
        //   this.questionnairesData.labels.push(this.eventStats[i].description);
        //   break;
      }
    }
  }

}
