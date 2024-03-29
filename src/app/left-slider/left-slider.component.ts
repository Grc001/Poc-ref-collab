// left-slider.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-left-slider',
  templateUrl: './left-slider.component.html',
  styleUrls: ['./left-slider.component.css']
})
export class LeftSliderComponent implements OnInit {
  isOpen = false;
  tables: any[] = [];

  @Output() selectedTable = new EventEmitter <number> ();

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadTableNames();
  }

  toggleSlider() {
    this.isOpen = !this.isOpen;
  }
  
  loadTableNames() {
    this.http.get<any>(`http://localhost:3000/db/tables/tables`).subscribe(
      (data) => {
        console.log(data);
  
        this.tables = data;
        console.log(this.tables);
      },
      (error) => {
        console.error('Error loading table data:', error);
      }
    );
  }

  showTable(value : number){
    this.selectedTable.emit(value);
    console.log(value);
  } 
  
}
