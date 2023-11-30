
import { Input } from '@angular/core';
import { Component, ElementRef, HostListener, Renderer2, OnChanges, SimpleChanges, ChangeDetectorRef   } from '@angular/core';

@Component({
  selector: 'app-right-slider',
  templateUrl: './right-slider.component.html',
  styleUrls: ['./right-slider.component.css']
})
export class RightSliderComponent implements OnChanges {
  isOpen = false;
    @Input() selectedCollaborator!: any;
    ngOnChanges(changes: SimpleChanges): void {
      // Vérifiez si la propriété selectedCollaborator a été modifiée
      if (changes['selectedCollaborator'] && changes['selectedCollaborator'].currentValue && changes['selectedCollaborator'].currentValue !== null) {
        this.isOpen = true;
        console.log(this.selectedCollaborator);
        
      }
    }

  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen = false;
      this.cdr.detectChanges();
      this.selectedCollaborator = null;
    }
  }

  toggleSlider() {
    this.isOpen = !this.isOpen;
  }
}