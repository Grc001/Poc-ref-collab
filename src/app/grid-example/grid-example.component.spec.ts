import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridExampleComponent } from './grid-example.component';

describe('GridExampleComponent', () => {
  let component: GridExampleComponent;
  let fixture: ComponentFixture<GridExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridExampleComponent]
    });
    fixture = TestBed.createComponent(GridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
