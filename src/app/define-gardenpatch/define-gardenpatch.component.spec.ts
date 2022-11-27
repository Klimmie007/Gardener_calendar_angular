import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineGardenpatchComponent } from './define-gardenpatch.component';

describe('DefineGardenpatchComponent', () => {
  let component: DefineGardenpatchComponent;
  let fixture: ComponentFixture<DefineGardenpatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineGardenpatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineGardenpatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
