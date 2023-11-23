import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from "wcs-core/dist/types/components/grid/grid-interface";
import { VNode } from "wcs-core/dist/types/stencil-public-runtime";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid-example',
  template: `
    <h2>Tableau</h2>
    <wcs-button shape="small"
                class="reloadBtn"
                (click)="reloadLessData()">
      Reload
    </wcs-button>
    <wcs-grid id="grid-1" [data]=" users"selection-config="multiple">
      <wcs-grid-column path="first_name"
                       name="Prénom"
                       sort
                       (wcsSortChange)="onSortChange($event)" ></wcs-grid-column>
      <wcs-grid-column path="last_name"
                       name="Nom de famille"
                       sort
                       (wcsSortChange)="onSortChange($event)"
                       ></wcs-grid-column>
      <wcs-grid-column path="isAdmin"
                       name="Administrateur"
                       [formatter]="surbrillanceFormatter"></wcs-grid-column>
      <wcs-grid-column path="id"
                       name="Actions"
                       [formatter]="actionFormatter"
                       [width]="1"></wcs-grid-column>
      <!-- <wcs-grid-pagination [availablePageSizes]="[5, 10, 15, 20]" [pageSize]="pageSize"></wcs-grid-pagination> -->
    </wcs-grid>
  `,
  styles: [`
    .reloadBtn {
      padding-bottom: 8px;
    }
  `]
})
export class GridExampleComponent implements OnInit {
  readonly pageSize: number = 5;
  users! : any[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() =>
        this.generateData(5)
      , 3000);
  }

  generateData(nbPage: number) {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(
        data => {
          this.users = data;
          console.log('Users data:', this.users);
        },
        error => {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
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

  // TODO don't use any type when issue will be closed : https://github.com/ionic-team/stencil-ds-output-targets/issues/219
  onSortChange($event: any) {
    // console.log($event);
  }

  reloadLessData() {
    this.generateData(3);
  }

}
