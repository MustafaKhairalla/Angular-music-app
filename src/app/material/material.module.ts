import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [
  MatBottomSheetModule,
  MatButtonModule
];


@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
