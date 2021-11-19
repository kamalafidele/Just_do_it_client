import { NgModule } from '@angular/core';

import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";

export const MaterialComponents=[
  MatInputModule,
  MatStepperModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatBadgeModule
];

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
