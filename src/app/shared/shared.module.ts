import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material module
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
