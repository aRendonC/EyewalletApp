import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundNumberPipe } from './round-number/round-number.pipe';

@NgModule({
  declarations: [
    RoundNumberPipe
  ],
  exports: [
    RoundNumberPipe
  ],
  imports: [
    CommonModule
  ]
})

export class PipeModule { }
