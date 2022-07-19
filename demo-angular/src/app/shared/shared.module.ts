import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
  ]
})
export class SharedModule { }
