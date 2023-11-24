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
  numberOfDesiredColumns! : number;
  creatingTable: boolean = false;
  dataTypes: string[] = ['STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'EMAIL']; // Ajoutez d'autres types au besoin
  newColumns: any[] = []; 

  createNewColumns() {
    // Créer un objet JSON avec les nouvelles colonnes
    const newColumnsObject = {
      id: 4,
      path: "first_name",
      name: "colonne créée",
      type: "STRING",
      sort: true
    };
  
   
 // Envoyer l'objet JSON directement à json-server pour traiter la requête POST
 this.http.post('http://localhost:3000/columns', newColumnsObject)
 .subscribe(
   response => {
     console.log('Nouvelles colonnes ajoutées avec succès dans le fichier db.json:', response);
     // Recharger les données après l'ajout de nouvelles colonnes si nécessaire
     this.reloadData();
   },
   error => {
     console.error('Erreur lors de l\'ajout des nouvelles colonnes :', error);
   }
 );
  }
  
 
  reloadData() {
    // Vous pouvez ajouter ici la logique pour recharger les données si nécessaire
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
