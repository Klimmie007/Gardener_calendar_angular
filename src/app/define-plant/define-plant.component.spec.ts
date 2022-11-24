import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePlantComponent } from './define-plant.component';

describe('DefinePlantComponent', () => {
  let component: DefinePlantComponent;
  let fixture: ComponentFixture<DefinePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinePlantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
