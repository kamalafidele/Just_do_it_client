import { NgModule } from '@angular/core';

import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";

export const MaterialComponents=[
  MatInputModule,
  MatStepperModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule
];

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
