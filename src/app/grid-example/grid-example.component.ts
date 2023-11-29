import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

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
  categories: string[] = []; 
  pathTypes: string[] = [];
  newColumns: any[] = [];
  dirtyFlag = false;
  selectedCategories: string[] = [];

  createColumnsForm: FormGroup;

  // ...

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    // Initialisez le formulaire avec les champs nécessaires
    this.createColumnsForm = this.fb.group({
      columnName: ['', Validators.required],
      categoryName: ['', Validators.required],
      pathType: ['', Validators.required],
    });
  }

  createTable() {
    // Récupérez les valeurs du formulaire en toute sécurité avec une vérification de null
    let columnName = this.createColumnsForm.get('columnName')?.value;
    let categoryName = this.createColumnsForm.get('categoryName')?.value;
    let pathType = this.createColumnsForm.get('pathType')?.value;
    // Vérifiez que les valeurs ne sont pas nulles avant de procéder
    if (columnName !== null && pathType !== null && categoryName !== null){
      // Créez un objet JSON avec les valeurs du formulaire
      const newColumn = {
        id: this.columns.length + 1,
        path: pathType,
        name: columnName,
        category : categoryName,
        sort: true,
      };

      // Envoyez l'objet JSON directement à json-server pour traiter la requête POST
      this.http.post('http://localhost:3000/columns', newColumn).subscribe(
        (response) => {
          console.log(
            'Nouvelle colonne ajoutée avec succès dans le fichier db.json:',
            response
          );
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
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
  getAllPathTypes(users: any[]): string[] {
    const allPathTypes = new Set<string>();

    users.forEach((user) => {
      Object.keys(user).forEach((pathType) => {
        allPathTypes.add(pathType);
      });
    });

    return Array.from(allPathTypes);
  }

  getAllCategories(columns: any[]): string[] {
    const allCategories = new Set<string>();
  
    columns.forEach((column) => {
      const category = column.category; 
      if (category) {
        allCategories.add(category);
      }
    });
  
    return Array.from(allCategories);
  }
  
  getColumnByCategory(category: string) {
    if (this.dirtyFlag) {
      // Appeler votre méthode ici lorsque le champ est dirty
      console.log(`Selected category: ${category}`);
      // Réinitialiser le drapeau après avoir traité l'événement
      this.dirtyFlag = false;
    }
  

  console.log(category);
  
  }
  onCategoryChange() {
    // Mettre à jour le drapeau pour indiquer que le champ est dirty
    this.dirtyFlag = true;
  }


  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/db').subscribe(
      (data) => {
        this.columns = data.columns;
        this.users = data.users;
        this.pathTypes = this.getAllPathTypes(this.users);
        this.categories = this.getAllCategories(this.columns);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );console.log(this.categories);
  
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
    this.cdr.detectChanges();
  }
}
