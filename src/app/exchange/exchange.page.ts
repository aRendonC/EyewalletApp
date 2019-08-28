import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSelect } from "@ionic/angular";
import { AxiosService } from "../services/axios/axios.service";
import { AuthService } from "../services/auth/auth.service";
import { ToastService } from "../services/toast/toast.service";
import { LoadingService } from "../services/loading/loading.service";
import { DataLocalService } from "../services/data-local/data-local.service";
import * as CONSTANTS from '../constanst';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-exchange',
	templateUrl: './exchange.page.html',
	styleUrls: ['./exchange.page.scss'],
})

export class ExchangePage implements OnInit {
	public ctrlNavigation: number;
	public navigationHistory: boolean;
	public pockets: any;
	public inputOrigin: string;
	public inputDestination: string;
	public inputValueDollar: string;
	public cryptosShortNames: any[];
	public selectedCryptoName: string;
	public changeCryptoName: string;
	public selectedPocketCrypto: any[];
	public exchangePocketCrypto: any[];
	public nameSelectedPocket: string;
	public nameExchangePocket: string;
	public selectedPocket: any;
	public exchangePocket: any;
	public valueSelectedCrypto: any;
	public valueExchangeCrypto: any;
	public valueDollarCrypto: any;
	public valueCryptoOrigin: any;
	public valueCryptoDestination: any;
	public inputCryptoSelected: boolean;
	public inputCryptoExchange: boolean;
	public showLoadingValues: boolean;
	public showLoaderInputValueCrypto: boolean;
	public showLoaderInputValueDollar: boolean;
	public buttonSendExchange: boolean;

	public constructor(
		private store: DataLocalService,
		public cdr: ChangeDetectorRef,
		public alertCtrl: AlertController,
		public http: AxiosService,
		protected auth: AuthService,
		private toastCtrl: ToastService,
		private loadingCtrl: LoadingService,
		private router: Router,
		private translateService: TranslateService
	) {
		this.ctrlNavigation = 8;
		this.navigationHistory = false;
		this.pockets = {};
		this.inputOrigin = 'origin';
		this.inputDestination = 'destination';
		this.inputValueDollar = 'valueDollar';
		this.cryptosShortNames = [];
		this.selectedCryptoName = '';
		this.changeCryptoName = '';
		this.selectedPocketCrypto = [];
		this.exchangePocketCrypto = [];
		this.nameSelectedPocket = '';
		this.nameExchangePocket = '';
		this.selectedPocket = {};
		this.exchangePocket = {};
		this.resetValuesInputs();
		this.inputCryptoSelected = true;
		this.inputCryptoExchange = true;
		this.resetStatusBooleanInputs();
		this.buttonSendExchange = true;
	}

	public async ngOnInit(): Promise<any> {}

	public async ionViewDidEnter(): Promise<any> {
		await this.loadingCtrl.present({ text: this.translateService.instant('EXCHANGE.LoadingData'), cssClass: 'textLoadingBlack' });
		this.navigationHistory = await this.validateTransactionsExchage();
		this.pockets = await this.store.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.POCKETS);
		this.cryptosShortNames = this.setCryptosShortNames(this.pockets);
		this.selectedCryptoName = this.cryptosShortNames[0];
		this.changeCryptoName = this.cryptosShortNames[1];
		this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
		this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
		this.nameSelectedPocket = this.selectedPocketCrypto[0];
		this.nameExchangePocket = this.exchangePocketCrypto[0];
		this.selectedPocket = this.selectedPockets(this.pockets, this.nameSelectedPocket);
		this.exchangePocket = this.selectedPockets(this.pockets, this.nameExchangePocket);
		this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.nameSelectedPocket);
		this.loadingCtrl.dismiss();
	}

	private async validateTransactionsExchage() {
		let statusTransactionsExchange: boolean = false;
		const profile = await this.store.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.PROFILE);
		const dataTransactionExchangeStorage: any = await this.http.post('exchange/index', {userId: profile.userId}, this.auth);
		if ((dataTransactionExchangeStorage.data).length > 0) {
			statusTransactionsExchange = true;
		}
		return statusTransactionsExchange;
	}

	private selectedPockets(pockets: any, pocketName: string): any {
		let dataPocket: any = {};
		for (let i=0; i<pockets.length; i++) {
			if (pockets[i].label === pocketName) {
				dataPocket = pockets[i];
			}
		}
		return dataPocket;
	}

	private setSelectedPocketCrypto(dataPockets: any[], typeCrypto: string): any[] {
		const arrayPocketsTypeCrypto: any [] = [];
		dataPockets.forEach(pocket => {
			if (pocket.currency.shortName === typeCrypto) {
				arrayPocketsTypeCrypto.push(pocket.label);
			}
		});
		return arrayPocketsTypeCrypto;
	}

	private setCryptosShortNames(dataPockets: any): any[] {
		const allShortNamesArray: any[] = [];

		dataPockets.forEach(pocket => {
			allShortNamesArray.push(pocket.currency.shortName);
		});

		return allShortNamesArray.filter((valor, indice, self) => {
			return self.indexOf(valor) === indice;
		});
	}

	public async showListNamesCryptos(cryptoNameSelected: string, typeInput: string): Promise<any> {
		const alert = await this.alertCtrl.create({
      header: this.translateService.instant('EXCHANGE.alertTypeCrypto'),
      inputs: this.setCryptoNamesAlert(cryptoNameSelected),
      buttons: [
        {
          text: this.translateService.instant('EXCHANGE.alertTypeCryptoCancel'),
          role: 'cancel',
          cssClass: 'secondary',
				},
				{
          text: this.translateService.instant('EXCHANGE.alertTypeCryptoSelect'),
          handler: (cryptoNameSelected) => {
            this.validateAsingCryptoName(cryptoNameSelected, typeInput);
          }
        }
      ]
    });

    await alert.present();
	}

	private setCryptoNamesAlert(cryptoNameSelected): any[] {
		const dataListCryptoNames: any[] = [];
		this.cryptosShortNames.forEach(cryptoName => {
			if (cryptoName !== cryptoNameSelected) {
				const dataCrypto: any = {
					type: 'radio',
					value: cryptoName,
					label: cryptoName
				};

				dataListCryptoNames.push(dataCrypto);
			}
		});
		return dataListCryptoNames;
	}

	private validateAsingCryptoName(cryptoNameSelected: string, typeInput: string): void {
		if (typeInput === this.inputOrigin) {
			this.selectedCryptoName = cryptoNameSelected;
			this.changeCryptoName = this.resetValueCryptoNameInput(this.cryptosShortNames.indexOf(cryptoNameSelected));
			this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
			this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
			this.nameSelectedPocket = this.selectedPocketCrypto[0];
			this.nameExchangePocket = this.exchangePocketCrypto[0];
			this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.nameSelectedPocket);
			this.resetValuesInputs();
		} else if (typeInput === this.inputDestination) {
			this.selectedCryptoName = this.resetValueCryptoNameInput(this.cryptosShortNames.indexOf(cryptoNameSelected));
			this.changeCryptoName = cryptoNameSelected;
			this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
			this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
			this.nameSelectedPocket = this.selectedPocketCrypto[0];
			this.nameExchangePocket = this.exchangePocketCrypto[0];
			this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.nameSelectedPocket);
			this.resetValuesInputs();
		}
	}

	private resetValueCryptoNameInput(position: number): string {
		if (position >= this.cryptosShortNames.length - 1) {
			return this.cryptosShortNames[0];
		} else if (position <= 0) {
			return this.cryptosShortNames[this.cryptosShortNames.length - 1];
		}
	}

	public changeCryptoSelected(cryptoSelected, crytoChange, pocketSelected, pocketChange): void {
		this.selectedCryptoName = crytoChange;
		this.changeCryptoName = cryptoSelected;
		this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
		this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
		this.nameSelectedPocket = this.selectedPocketCrypto[this.selectedPocketCrypto.indexOf(pocketChange)];
		this.nameExchangePocket = this.exchangePocketCrypto[this.exchangePocketCrypto.indexOf(pocketSelected)];
		this.selectedPocket = this.selectedPockets(this.pockets, this.nameSelectedPocket);
		this.exchangePocket = this.selectedPockets(this.pockets, this.nameExchangePocket);
		this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.nameSelectedPocket);
		this.resetValuesInputs();
	}

	public async showListNamesPockets(pocketsList: any[], pocketSelected: string, currentPocket: string): Promise<any> {
		const alert = await this.alertCtrl.create({
      header: this.translateService.instant('EXCHANGE.alertPocketSelected'),
      inputs: this.setPocketsNamesAlert(pocketsList, pocketSelected),
      buttons: [
			{
				text: this.translateService.instant('EXCHANGE.alertTypeCryptoCancel'),
				role: 'cancel',
				cssClass: 'secondary',
			},
			{
				text: this.translateService.instant('EXCHANGE.alertTypeCryptoSelect'),
				handler: (pocketNameSelected) => {
					this.validateAsingPocketName(pocketNameSelected, currentPocket);
				}
        	}
      ]
    });

    await alert.present();
	}

	private setPocketsNamesAlert(pocketsList: any[], pocketSelected: string): any[] {
		const arrayPocketsNameAlert: any[] = [];
		pocketsList.forEach(pocket => {
			if (pocket !== pocketSelected) {
				const dataPocketsNameAlert: any = {
					type: 'radio',
					value: pocket,
					label: pocket
				}
				arrayPocketsNameAlert.push(dataPocketsNameAlert);
			}
		});
		return arrayPocketsNameAlert;
	}

	private validateAsingPocketName(pocketNameSelected: string, currentPocket: string): void {
		if (currentPocket === this.inputOrigin) {
			this.nameSelectedPocket = pocketNameSelected;
			this.selectedPocket = this.selectedPockets(this.pockets, this.nameSelectedPocket);
			this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.nameSelectedPocket);
			this.resetValuesInputs();
		} else {
			this.nameExchangePocket = pocketNameSelected;
			this.exchangePocket = this.selectedPockets(this.pockets, this.nameExchangePocket);
			this.resetValuesInputs();
		}
	}

	public async getExchangeValuesInputOrigin(event: any, typeInput: string): Promise<any> {
		this.showLoadingValues = true;
		typeInput === this.inputOrigin ?  this.showLoaderInputValueDollar = true : this.showLoaderInputValueCrypto = true;
		if (event !== null && event > 0) {
			this.buttonSendExchange = false;
			await this.runGetExchangeValues(event, typeInput);
		} else {
			this.buttonSendExchange = true;
			this.resetValuesInputs();
			this.resetStatusBooleanInputs();
		}
	}

	private async runGetExchangeValues(valueInput: string, currentInput: string): Promise<any> {
		const dataBody = {
			currencyShortNameFrom: this.selectedCryptoName,
			currencyShortNameTo: this.changeCryptoName,
			amount: valueInput,
		};
		await this.http.post('exchange/price', dataBody, this.auth)
		.then(response => {
			this.validateGetExchangeValues(response, currentInput, valueInput);
		})
		.catch(error => {
			console.error('ERROR', error);
			this.resetStatusBooleanInputs();
			this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.InternalErrors')});
		});
	}

	private validateGetExchangeValues(dataResponse: any, currentInput: string, valueInput: string): void {
		if (currentInput === this.inputOrigin) {
			this.valueExchangeCrypto = parseFloat(dataResponse.amountCriptoTo).toFixed(4);
			this.valueDollarCrypto = parseFloat(dataResponse.amountUsdFrom).toFixed(4);
			this.valueCryptoOrigin = parseFloat(dataResponse.priceUsdFrom).toFixed(4);
			this.valueCryptoDestination = parseFloat(dataResponse.priceUsdTo).toFixed(4);
			this.resetStatusBooleanInputs();
		} else {
			this.valueSelectedCrypto = (parseInt(valueInput) / dataResponse.priceUsdFrom).toFixed(4);
			this.valueExchangeCrypto = ((this.valueSelectedCrypto * dataResponse.priceUsdFrom) / dataResponse.priceUsdTo).toFixed(4);
			this.valueCryptoOrigin = parseFloat(dataResponse.priceUsdFrom).toFixed(4);
			this.valueCryptoDestination = parseFloat(dataResponse.priceUsdTo).toFixed(4);
			this.resetStatusBooleanInputs();
		}
	}

	private validateBalancePocket (pockets: any, pocketSelected: string): boolean {
		let availableValue: boolean = true;
		pockets.forEach(pocket => {
			if (pocketSelected === pocket.label && pocket.balance > 0) {
				availableValue = false;
			}
		});
		return availableValue;
	}

	public messageBalancePocketCurrent(): void {
		if (this.inputCryptoSelected) this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.PocketWithoutBalance')});
	}

	private resetValuesInputs(): void {
		this.valueSelectedCrypto = 0;
		this.valueExchangeCrypto = 0;
		this.valueDollarCrypto = 0;
		this.valueCryptoOrigin = 0;
		this.valueCryptoDestination = 0;
	}

	private resetStatusBooleanInputs(): void {
		this.showLoadingValues = false;
		this.showLoaderInputValueCrypto = false;
		this.showLoaderInputValueDollar = false;
	}

	public async sendExchange(): Promise<any> {
		await this.loadingCtrl.present({ text: this.translateService.instant('EXCHANGE.SendRequest'), cssClass: 'textLoadingBlack' });
		const profile: any = await this.store.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.PROFILE);
		const dataBody: any = {
			addressFrom: this.selectedPocket.address,
			addressTo: this.exchangePocket.address,
			currencyIdFrom: this.selectedPocket.currencyId,
			currencyIdTo: this.exchangePocket.currencyId,
			currencyShortNameFrom: this.selectedCryptoName,
			currencyShortNameTo: this.changeCryptoName,
			amount: this.valueSelectedCrypto,
			userId: profile.userId,
			priority: "low"
		};

		this.http.post('exchange/create', dataBody, this.auth)
		.then(async response => {
			this.validateSendExchange(response, this.selectedPocket);
		})
		.catch(async error => {
			console.error('ERROR: ', error);
			this.loadingCtrl.dismiss();
			await this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.InternalErrors')});
		})
	}

	private async validateSendExchange(dataResponse: any, dataPocketSelected: any): Promise<any> {
		if (dataResponse.status === 200) {
			this.getAndSetExchangeStorage(dataPocketSelected);
		} else {
			this.loadingCtrl.dismiss();
			await this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.IncorrectData')});
		}
	}

	private async getAndSetExchangeStorage(dataPocketSelected: any): Promise<any> {
		const dataBody = {
			userId: dataPocketSelected.userId,
			type: 0,
			address: dataPocketSelected.address,
			currencyShortName: dataPocketSelected.currency.shortName
		};
		await this.http.post('transaction/index', dataBody, this.auth)
		.then(async response => {
			await this.validateGetAndSetExchangeStorage(response);
		})
		.catch(async error => {
			console.error('ERROR: ', error);
			this.loadingCtrl.dismiss();
			await this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.InternalErrors')});
		});
	}

	private async validateGetAndSetExchangeStorage(response: any): Promise<any> {
		if (response.status === 200) {
			response.pocket = this.valueSelectedCrypto;
			this.store.setDataLocal(CONSTANTS.KEYS_DATA_LOCAL.TRANSACTION, response);
			this.resetValuesInputs();
			this.loadingCtrl.dismiss();
			this.router.navigate(['/app/tabs/history-exchange']);
			await this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.Success')});
		} else {
			this.loadingCtrl.dismiss();
			await this.toastCtrl.presentToast({text: this.translateService.instant('EXCHANGE.ErrorToChange')});
		}
	}
}
