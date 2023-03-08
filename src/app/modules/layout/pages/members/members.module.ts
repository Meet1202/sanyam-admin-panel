import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { AddMoneyComponent } from './add-money/add-money.component';

const ROUTES: Routes = [
  {path: '', component: MembersComponent},
  {path: 'manage', component: ManageMemberComponent},
  {path: 'add-money', component: AddMoneyComponent, data:{}},
]

@NgModule({
  declarations: [
    MembersComponent,
    ManageMemberComponent,
    AddMoneyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
