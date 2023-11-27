import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSliderComponent } from './right-slider.component';

describe('RightSliderComponent', () => {
  let component: RightSliderComponent;
  let fixture: ComponentFixture<RightSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightSliderComponent]
    });
    fixture = TestBed.createComponent(RightSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
