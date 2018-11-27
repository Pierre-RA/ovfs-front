import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgMaterialModule } from 'src/app/modules/ng-material/ng-material.module';
import { GeneComponent } from '../../components/gene/gene.component';

@NgModule({
  declarations: [DashboardComponent, GeneComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgMaterialModule
  ]
})
export class DashboardModule { }
