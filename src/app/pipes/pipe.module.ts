import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundNumberPipe } from './round-number/round-number.pipe';
import { StatusVaultTextPipe } from './status-vault-text/status-vault-text.pipe';

@NgModule({
  declarations: [
    RoundNumberPipe,
    StatusVaultTextPipe,
  ],
  exports: [
    RoundNumberPipe,
    StatusVaultTextPipe,
  ],
  imports: [
    CommonModule
  ]
})

export class PipeModule { }
