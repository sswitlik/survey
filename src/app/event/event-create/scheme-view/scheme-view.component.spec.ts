import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeViewComponent } from './scheme-view.component';

describe('SchemeViewComponent', () => {
  let component: SchemeViewComponent;
  let fixture: ComponentFixture<SchemeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
