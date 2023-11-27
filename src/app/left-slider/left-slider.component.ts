import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-slider',
  templateUrl: './left-slider.component.html',
  styleUrls: ['./left-slider.component.css']
})
export class LeftSliderComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSlider() {
    this.isOpen = !this.isOpen;
  }
}
