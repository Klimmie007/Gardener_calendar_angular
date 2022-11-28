import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SowComponent } from './sow.component';

describe('SowComponent', () => {
  let component: SowComponent;
  let fixture: ComponentFixture<SowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
