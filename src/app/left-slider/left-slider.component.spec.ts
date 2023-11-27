import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSliderComponent } from './left-slider.component';

describe('LeftSliderComponent', () => {
  let component: LeftSliderComponent;
  let fixture: ComponentFixture<LeftSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSliderComponent]
    });
    fixture = TestBed.createComponent(LeftSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
