import { NgModule } from '@angular/core';
import { SharedCommonModule } from './shared-common.module';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  exports: [
    SharedCommonModule,
    SharedMaterialModule,
  ]
})
export class SharedModule { }
