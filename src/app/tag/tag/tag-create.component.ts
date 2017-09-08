import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TagServiceService} from '../../shared/tag-service.service';
import {Tag} from '../../domain/tag.domain';
import {Message, SelectItem} from "primeng/primeng";
import {equal} from "assert";

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagCreateComponent implements OnInit {


  constructor(private tagService: TagServiceService) { }
  tag: Tag = new Tag;

  msgsTag: Message[] = [];
  valTag: String;

  tags: Tag[] = [];

  ngOnInit() {
    this.getTags();
  }

  addTag(name: string) {
    this.tag.name = name;
    console.log(this.tag);
    if(this.isTagValid() === false){
      this.tagError();
    }
    else {
      this.tagService.saveTag(this.tag)
        .subscribe(error => {
          console.log('Err', error);
          this.getTags();
        });
      this.tagSucces();
    }
  }

  deleteTag(tag: Tag) {
    this.tagService.deleteTag(tag)
      .subscribe(error => {
        console.log('Log', error);
      });
    const index = this.tags.indexOf(tag);
    this.tags = this.tags.filter((val, i) => i !== index);
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(
        tags => this.tags = tags
      );
  }

  tagInfo() {
    this.msgsTag = [];
    this.msgsTag.push({
      severity: 'info', summary: 'Welcome to Tag Create',
      detail: "Tags will help you with searching events and making cyclic event."
    });
  }

  tagError() {
    this.msgsTag = [];
    if(!this.valTag) {
      this.msgsTag.push({
        severity: 'error', summary: 'Error - Tag Name',
        detail: "Tag name required!"
      });
    }
    if(this.tags.filter((tag) => tag.name === this.valTag).length > 0){
      this.msgsTag.push({
        severity: 'error', summary: 'Error - Tag Name',
        detail: "Tag already exist!"
      });
    }
  }

  tagSucces() {
    this.msgsTag = [];
    this.msgsTag.push({
      severity: 'success', summary: 'Tag - Create',
      detail: "Tag create sucessfully!"
    });
  }

  isTagValid() {
    var result = true;
    if(!this.valTag){
      result = false;
    }
    if(this.tags.filter((tag) => tag.name === this.valTag).length > 0) {
      result = false;
    }
    return result;
  }

}
