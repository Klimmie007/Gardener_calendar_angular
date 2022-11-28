import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineHarvestComponent } from './define-harvest.component';

describe('DefineHarvestComponent', () => {
  let component: DefineHarvestComponent;
  let fixture: ComponentFixture<DefineHarvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineHarvestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
