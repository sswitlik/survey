import {Component, OnInit} from '@angular/core';
import {Tag} from '../domain/tag.domain';
import {SelectItem} from 'primeng/primeng';
import {TagServiceService} from '../shared/tag-service.service';
import {forEach} from '@angular/router/src/utils/collection';
import {EventServiceService} from '../shared/event-service.service';
import {Event} from '../domain/event.domain';
import {ChartData} from '../domain/chart-data.domain';
import {COLORS} from '../shared/colors';
import {EventStats} from '../domain/event-stats.domain';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-stat-page',
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.css']
})
export class StatPageComponent implements OnInit {

  msgs: Message[] = [];
  eventStats: EventStats[];

  summaryStars;
  summaryEmots;
  avaregeStars;
  avaregeEmots;

  sumOfEmots: number;
  sumOfStars: number;

  showStats = false;
  showTags = true;
  eventStarStats: EventStats[];
  eventEmotStats: EventStats[];
  queryArray: string[] = [];

  startVotes: number[] = [];
  emoticonVotes: number[] = [];
  eventsByTag: Event[] = [];
  tagQuery: string;
  tags: Tag[] = [];
  selectedTag: number[] = [];
  tagArray: any[] = [];
  tagsName: SelectItem[] = [];

  starsData: ChartData;
  emoticonsData: ChartData;

  starsChart: any;
  emoticonsChart: any;

  constructor(private tagService: TagServiceService,
    private eventService: EventServiceService) {

  }
  ngOnInit() {
    this.getAllTags();
    this.renewValues();
  }


  countStarVotes() {

    for (let i = 0; i < this.startVotes.length; i++) {
      this.sumOfStars += this.startVotes[i];
      this.summaryStars += this.startVotes[i] * (i + 1);
    }
    this.avaregeStars = this.summaryStars / this.sumOfStars;

  }
  hideStats() {
    this.showStats = false;
    this.showTags = true;

  }
  countEmotsVotes() {
    for (let i = 0; i < this.emoticonVotes.length; i++) {
      this.sumOfEmots += this.emoticonVotes[i];
      this.summaryEmots += this.emoticonVotes[i] * (i + 1);
    }
    this.avaregeEmots = this.summaryEmots / this.sumOfEmots;
  }
  renewValues() {
    this.queryArray = [];
    this.summaryStars = 0;
    this.summaryEmots = 0;
    this.avaregeStars = 0;
    this.avaregeEmots = 0;
    this.tagQuery = '';
    this.sumOfEmots = 0;
    this.sumOfStars = 0;
    this.startVotes = [0, 0, 0, 0, 0];
    this.emoticonVotes = [0, 0, 0];
  }

  getTags() {
    for (let i = 0; i < this.selectedTag.length; i++) {
      for (let j = 0; j < this.tags.length; j++) {
        if (this.selectedTag[i] === this.tags[j].id) {
          this.queryArray.push(this.tags[j].name);
        }
      }
    }
  }

  notSelectedTagError() {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Error-Tag',
      detail: 'You must select at least one tag!'
    });


  }

  getEventsByTags() {
    if (this.selectedTag.length === 0) {
      this.notSelectedTagError();
      return;
    }
    this.getTags();
    this.eventService.getEventsByTags(this.queryArray)
      .subscribe(
      events => {
        this.renewValues();
        this.eventsByTag = events;
        this.starsData = new ChartData;
        this.emoticonsData = new ChartData;
        this.createEventStats();
        this.sortOpinions();
        this.starsChart = this.createChart(this.starsData);
        this.emoticonsChart = this.createChart(this.emoticonsData);
        this.countEmotsVotes();
        this.countStarVotes();
        this.showStats = true;
        this.showTags = false;

      }
      )
      ;
  }

  getAllTags() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tags = data;
        this.getNames(data, this.tagsName);
      },
      error => {
        console.log('Err', error);
      });
  }

  getNames(optionsArray, names) {
    for (let i = 0; i < optionsArray.length; i++) {
      names.push(
        {
          label: optionsArray[i].name,
          value: optionsArray[i].id
        });
    }
  }

  createChart(chartData: ChartData): any {
    const chartType = {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.data,
          backgroundColor: COLORS

        }

      ],
    };
    return chartType;

  }

  createEventStats() {
    this.eventStats = [];
    for (let i = 0; i < this.eventsByTag.length; i++) {
      this.eventsByTag[i].eventTemplate.opinions.forEach(item => {
        for (let j = 0; j < this.eventsByTag[i].answerMask.opinionCounter.length; j++) {
          if (item.type.type === 'Questionnaire' || item.type.type === 'Comment') {
            break;
          }
          if (item.uniqueId === this.eventsByTag[i].answerMask.opinionCounter[j].opinionUniqueId) {
            this.eventStats.push({
              type: item.type,
              value: item.value,
              description: item.description,
              counter: this.eventsByTag[i].answerMask.opinionCounter[j].opinionCounter
            });
          }
        }
      }
      );
    }


  }

  sortOpinions() {
    for (let i = 0; i < this.eventStats.length; i++) {
      switch (this.eventStats[i].type.type) {
        case 'Stars':
          this.startVotes[this.eventStats[i].value - 1] += this.eventStats[i].counter;
          break;
        case 'Emoticons':
          this.emoticonVotes[this.eventStats[i].value - 1] += this.eventStats[i].counter;
          break;
      }
      this.starsData.type = 'Stars';
      this.emoticonsData.type = 'Emoticons';
      this.starsData.labels = ['1stars', '2stars', '3stars', '4stars', '5stars'];
      this.emoticonsData.labels = ['1', '2', '3'];
      this.starsData.data = this.startVotes;
      this.emoticonsData.data = this.emoticonVotes;

    }

  }
}
