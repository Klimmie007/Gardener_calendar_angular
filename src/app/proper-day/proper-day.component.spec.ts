import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProperDayComponent } from './proper-day.component';

describe('ProperDayComponent', () => {
  let component: ProperDayComponent;
  let fixture: ComponentFixture<ProperDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProperDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProperDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
