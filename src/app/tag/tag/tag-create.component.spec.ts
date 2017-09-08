import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreateComponent } from './tag-create.component';

describe('TagComponent', () => {
  let component: TagCreateComponent;
  let fixture: ComponentFixture<TagCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
