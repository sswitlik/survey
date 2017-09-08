import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataTableModule,
        SharedModule} from 'primeng/primeng';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';


import {Event} from '../../../domain/event.domain';
import {COLORS} from '../../../shared/colors';
import {ChartData} from '../../../domain/chart-data.domain';
import {EventStats} from '../../../domain/event-stats.domain';
import {EventServiceService} from '../../../shared/event-service.service';


@Component({
  selector: 'event-show-stats',
  templateUrl: './event-show-stats.component.html',
  styleUrls: ['./event-show-stats.component.css']
})
export class EventShowStatsComponent implements OnInit, OnChanges {

  @Input() event: Event;
  eventStats: EventStats[];

  showStats = true;

  starsData: ChartData;
  emoticonsData: ChartData;
  questionnairesData: ChartData;

  starsChart: any;
  emoticonsChart: any;
  questionnairesChart: any;

  eventExist = true;
  timerInterval = 10000;
  chartOptions: any;
  emoticonsLabels: string[] = [];
// --------------------------------------------------------------------
  constructor(private eventService: EventServiceService) {
  }

  ngOnInit() {
    this.chartOptions = {
      animation: {
        duration: 0
      }
    };

    this.emoticonsLabels = [
      'Unlike',
      'Confused',
      'Like'
    ];

    IntervalObservable.create(this.timerInterval)
      .subscribe(() => {
        this.getEvent();
        this.refreshEvent();
        this.chartOptions = {
          animation: {
            duration: 0
          }
        };
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshEvent();
  }

  refreshEvent() {
    if (this.event) {
      if (this.event.answerMask === null) {
        this.eventExist = false;
        return;
      }
      this.eventExist = true;

      this.showStats = true;
      this.starsData = new ChartData;
      this.emoticonsData = new ChartData;
      this.questionnairesData = new ChartData;
      this.createEventStats();
      this.sortOpinions();
      this.starsChart = this.createChart(this.starsData);
      this.emoticonsChart = this.createChart(this.emoticonsData);
      this.questionnairesChart = this.createChart(this.questionnairesData);

    }
  }

  statsIsEmpty(): boolean {
    return (this.event.answerMask.opinionCounter.length === 0);
  }

  showComments() {
    this.showStats = false;
  }

  showStatistics() {
    this.showStats = true;
  }

  createChart(chartData: ChartData): any {
    const chartType = {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.data,
          backgroundColor: COLORS
        }],
    };
    return chartType;

  }

  createEventStats() {
    this.eventStats = [];
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
    this.eventStats.sort(function (a, b) {
      return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
    });
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
          this.emoticonsData.labels.push(this.emoticonsLabels[this.eventStats[i].value - 1]);
          break;
        case 'Questionnaire':
          this.questionnairesData.type = this.eventStats[i].type.type;
          this.questionnairesData.data.push(this.eventStats[i].counter);
          this.questionnairesData.labels.push(this.eventStats[i].description);
          break;
      }
    }
  }

  eventExists() {
    return this.eventExist;
  }

  getEvent() {
    if (this.event && this.event.answerMask != null) {
      this.eventService.getEvent(this.event.id)
        .subscribe(
          event => this.event = event
        );
    }
  }

  printEventStatus(event: Event): string {
    let result;
    let status = Event.getEventStatus(event);
    if (status < 0) {
      result = 'This event is finished.';
    } else if (status === 0) {
      result = 'This event is ongoing.';
    } else if (status > 0) {
      result = 'This event is not started.';
    }
    return result;
  }
}
