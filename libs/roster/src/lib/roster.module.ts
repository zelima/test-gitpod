import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RosterComponent
  ],
  imports: [
    CommonModule,
    RouterModule // if you are using routerLink in your templates
  ],
  providers: [],
  exports: [RosterComponent]
})
export class RosterModule {}
