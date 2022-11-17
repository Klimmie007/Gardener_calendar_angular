import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePreserveComponent } from './define-preserve.component';

describe('DefinePreserveComponent', () => {
  let component: DefinePreserveComponent;
  let fixture: ComponentFixture<DefinePreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinePreserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinePreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
