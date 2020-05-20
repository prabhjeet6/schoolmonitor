import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineCourseworkComponent } from './online-coursework.component';

describe('OnlineCourseworkComponent', () => {
  let component: OnlineCourseworkComponent;
  let fixture: ComponentFixture<OnlineCourseworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineCourseworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineCourseworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
