import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'statusVaultText'
})

export class StatusVaultTextPipe implements PipeTransform {
  public constructor(
    private translateService: TranslateService
  ) { }

  public transform(value: number): string {
    if (value === 1) {
      return this.translateService.instant('VAULT_LIST.removeText');
    } else if (value === 2) {
      return this.translateService.instant('VAULT_LIST.removedText');
    } else if (value === 3) {
      return this.translateService.instant('VAULT_LIST.processingText');
    } else if (value === 4) {
      return this.translateService.instant('VAULT_LIST.finalizedText');
    } else {
      return 'error'
    }
  }

}
