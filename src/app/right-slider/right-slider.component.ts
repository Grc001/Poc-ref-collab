import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-right-slider',
  templateUrl: './right-slider.component.html',
  styleUrls: ['./right-slider.component.css']
})
export class RightSliderComponent implements OnInit {
  isOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSlider() {
    this.isOpen = !this.isOpen;
  }
}
