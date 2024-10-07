import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentroAyudaPageRoutingModule } from './centro-ayuda-routing.module';

import { CentroAyudaPage } from './centro-ayuda.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentroAyudaPageRoutingModule,
    SharedModule
  ],
  declarations: [CentroAyudaPage]
})
export class CentroAyudaPageModule {}
