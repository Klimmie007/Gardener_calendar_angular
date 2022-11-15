import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreserveComponent } from './preserve.component';

describe('PreserveComponent', () => {
  let component: PreserveComponent;
  let fixture: ComponentFixture<PreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
