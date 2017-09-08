import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateShowComponent } from './template-show.component';

describe('TemplateShowComponent', () => {
  let component: TemplateShowComponent;
  let fixture: ComponentFixture<TemplateShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
