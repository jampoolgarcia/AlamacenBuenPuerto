import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// material module
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavComponent,
  ]
})
export class SharedModule { }
