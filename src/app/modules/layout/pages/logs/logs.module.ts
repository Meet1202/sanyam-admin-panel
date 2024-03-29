import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    FormsModule
  ]
})
export class LogsModule { }
