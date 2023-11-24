import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WcsAngularModule } from 'wcs-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GridExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WcsAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
