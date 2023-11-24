import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from "wcs-core/dist/types/components/grid/grid-interface";
import { VNode } from "wcs-core/dist/types/stencil-public-runtime";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.css']
})
export class GridExampleComponent implements OnInit {
  readonly pageSize: number = 5;
  columns: any[] = [];
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/db')
      .subscribe(
        data => {
          this.columns = data.columns;
          this.users = data.users;
          console.log('Columns:', this.columns);
          console.log('Users data:', this.users);
        },
        error => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
  }

  surbrillanceFormatter = (createElement: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => {
    return createElement('span', {}, rowData.data.surbrillance ? `Oui` : `Non`);
  }

  actionFormatter = (createElement: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => {
    return createElement('wcs-button', {
      shape: 'square',
      mode: 'clear',
      className: 'wcs-primary',
      onClick: () => console.log('clic')
    }, createElement('wcs-mat-icon', {
      icon: 'create'
    }));
  }

  onSortChange($event: any) {
    console.log($event);
  }

  reloadLessData() {
    // Vous pouvez ajouter ici la logique pour recharger les données si nécessaire
  }
}
