import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOneTimePasswordComponent } from './ngx-one-time-password.component';

describe('NgxOneTimePasswordComponent', () => {
  let component: NgxOneTimePasswordComponent;
  let fixture: ComponentFixture<NgxOneTimePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxOneTimePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxOneTimePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
