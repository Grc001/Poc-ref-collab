import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import {
  HyperFunc,
  WcsGridRowData,
} from 'wcs-core/dist/types/components/grid/grid-interface';
import { VNode } from 'wcs-core/dist/types/stencil-public-runtime';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.css'],
  
})
export class GridExampleComponent implements OnInit {
  readonly pageSize: number = 5;
  columns: any[] = [];
  users: any[] = [];
  numberOfDesiredColumns!: number;
  creatingTable: boolean = false;
  dataTypes: string[] = ['STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'EMAIL']; // Ajoutez d'autres types au besoin
  pathTypes: string[] = ['first_name', 'last_name', 'email', 'ip_address'];
  newColumns: any[] = [];

  createColumnsForm: FormGroup;

  // ...

  constructor(private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    // Initialisez le formulaire avec les champs nécessaires
    this.createColumnsForm = this.fb.group({
      columnName: ['', Validators.required],
      dataType: ['', Validators.required],
      pathType: ['', Validators.required],
    });
  }

 

  createTable() {
    // Récupérez les valeurs du formulaire en toute sécurité avec une vérification de null
    let columnName = this.createColumnsForm.get('columnName')?.value;
    let dataType = this.createColumnsForm.get('dataType')?.value;
    let pathType = this.createColumnsForm.get('pathType')?.value;
    // Vérifiez que les valeurs ne sont pas nulles avant de procéder
    if (columnName !== null && dataType !== null && pathType !== null) {
      // Créez un objet JSON avec les valeurs du formulaire
      const newColumn = {
        id: this.columns.length + 1,
        path: pathType,
        name: columnName,
        type: dataType,
        sort: true,
      };

      // Envoyez l'objet JSON directement à json-server pour traiter la requête POST
      this.http.post('http://localhost:3000/columns', newColumn).subscribe(
        (response) => {
          console.log('Nouvelle colonne ajoutée avec succès dans le fichier db.json:', response);
          // Rechargez les données après l'ajout de la nouvelle colonne si nécessaire
          this.reloadData();
          // Forcez le changement de détection après la mise à jour des données
          this.cdr.detectChanges();
       },
        (error) => {
          console.error(
            "Erreur lors de l'ajout de la nouvelle colonne :",
            error
          );
        }
      );
    } else {
      console.error('Les valeurs du formulaire sont nulles.');
    }

    this.closeTableCreationForm();
    
  }

  closeTableCreationForm() {
    this.creatingTable = false;
  }

  reloadData() {
    this.http.get<any>('http://localhost:3000/db').subscribe(
      (data) => {
        this.columns = data.columns;
        this.users = data.users;
        console.log('Columns:', this.columns);
        console.log('Users data:', this.users);
        this.reloadData();
        // Forcez le changement de détection après la mise à jour des données
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/db').subscribe(
      (data) => {
        this.columns = data.columns;
        this.users = data.users;
        console.log('Columns:', this.columns);
        console.log('Users data:', this.users);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  surbrillanceFormatter = (
    createElement: HyperFunc<VNode>,
    column: HTMLWcsGridColumnElement,
    rowData: WcsGridRowData
  ) => {
    return createElement('span', {}, rowData.data.surbrillance ? `Oui` : `Non`);
  };

  actionFormatter = (
    createElement: HyperFunc<VNode>,
    column: HTMLWcsGridColumnElement,
    rowData: WcsGridRowData
  ) => {
    return createElement(
      'wcs-button',
      {
        shape: 'square',
        mode: 'clear',
        className: 'wcs-primary',
        onClick: () => console.log('clic'),
      },
      createElement('wcs-mat-icon', {
        icon: 'create',
      })
    );
  };

  onSortChange($event: any) {
    console.log($event);
  }

  reloadLessData() {
    this.cdr.detectChanges();}
}
