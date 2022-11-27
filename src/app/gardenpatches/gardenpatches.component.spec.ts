import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenpatchesComponent } from './gardenpatches.component';

describe('GardenpatchesComponent', () => {
  let component: GardenpatchesComponent;
  let fixture: ComponentFixture<GardenpatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenpatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenpatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
