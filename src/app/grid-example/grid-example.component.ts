import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from "wcs-core/dist/types/components/grid/grid-interface";
import { VNode } from "wcs-core/dist/types/stencil-public-runtime";


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

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() =>
        this.generateData(5)
      , 3000);
  }

  generateData(nbPage: number) {
    this.users = [
      {
        "id": 1,
        "first_name": "Connor",
        "last_name": "Ryland",
        "email": "cryland0@google.co.uk",
        "ip_address": "55.58.177.143"
      },
      {
        "id": 2,
        "first_name": "Farley",
        "last_name": "Eadie",
        "email": "feadie1@mozilla.com",
        "ip_address": "21.179.162.238"
      },
      {
        "id": 3,
        "first_name": "Susi",
        "last_name": "Rowntree",
        "email": "srowntree2@t-online.de",
        "ip_address": "235.30.90.74"
      },
      {
        "id": 4,
        "first_name": "Dag",
        "last_name": "Manoelli",
        "email": "dmanoelli3@nps.gov",
        "ip_address": "111.47.126.157"
      },
      {
        "id": 5,
        "first_name": "Glynn",
        "last_name": "Yude",
        "email": "gyude4@google.com.au",
        "ip_address": "204.240.34.228"
      },
      {
        "id": 6,
        "first_name": "Guendolen",
        "last_name": "De L'Isle",
        "email": "gdelisle5@cbslocal.com",
        "ip_address": "220.255.0.66"
      },
      {
        "id": 7,
        "first_name": "Lila",
        "last_name": "Coldrick",
        "email": "lcoldrick6@nih.gov",
        "ip_address": "28.245.56.145"
      },
      {
        "id": 8,
        "first_name": "Desiri",
        "last_name": "Tourville",
        "email": "dtourville7@hexun.com",
        "ip_address": "219.195.139.187"
      },
      {
        "id": 9,
        "first_name": "Babita",
        "last_name": "Glenny",
        "email": "bglenny8@smh.com.au",
        "ip_address": "184.20.53.194"
      }
    ]
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
