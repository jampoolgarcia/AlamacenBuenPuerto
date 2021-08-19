// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// external modules
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

// root component
import { AppComponent } from './app.component';


// components

@NgModule({
  declarations: [
    // root
    AppComponent,
    // components
  ],
  imports: [
    // core
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    // routing
    AppRoutingModule,
    // ngrx module and cofig
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot(),
    // external modules
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
