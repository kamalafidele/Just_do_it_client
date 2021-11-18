import { NgModule } from '@angular/core';

import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button"

export const MaterialComponents=[
  MatInputModule,
  MatStepperModule,
  MatButtonModule
];

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
