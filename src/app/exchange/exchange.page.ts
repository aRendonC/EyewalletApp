import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSelect } from "@ionic/angular";
import { AxiosService } from "../services/axios/axios.service";
import { AuthService } from "../services/auth/auth.service";
import { ToastService } from "../services/toast/toast.service";
import { LoadingService } from "../services/loading/loading.service";
import { DataLocalService } from "../services/data-local/data-local.service";

@Component({
	selector: 'app-exchange',
	templateUrl: './exchange.page.html',
	styleUrls: ['./exchange.page.scss'],
})

export class ExchangePage implements OnInit {
	@ViewChild('selectFrom') selectFrom: IonSelect;
	@ViewChild('selectTo') selectTo: IonSelect;
	public inputFrom: any;
	public inputTo: any;
	public pockets: any = '';
	public ctrlNavigation = 8;
	public selectCryptoFrom = [];
	public selectCryptoTo: any = [];
	public usdAmount: any;
	public priceBtc;
	public tipoCurre;
	public event1 = false;
	public event2 = false;
	public valueCryptoTo: any = 0.0;
	public valueUsdFrom = 0.0;
	public cryptoFrom = {
		currencyId: '',
		currency: {
			shortName: ''
		}
	};
	public cryptoTo: any = {
		currencyId: '',
		currency: {
			shortName: ''
		}
	};
	public pocketsFrom: any = [];
	public pocketsTo: any = [];
	public selectedPocketFrom: any = {
		label: '',
		currency: {
			shortName: ''
		}
	};
	public selectedPocketTo: any = {
		label: '',
		currency: {
			shortName: ''
		}
	};
	// -------------------------------------------------------------------------------------
	public inputOrigin: string;
	public inputDestination: string;
	public inputValueDollar: string;
	public cryptosShortNames: any[];
	public selectedCryptoName: string;
	public changeCryptoName: string;
	public selectedPocketCrypto: any[];
	public exchangePocketCrypto: any[];
	public selectedPocket: string;
	public exchangePocket: string;
	public valueSelectedCrypto: any;
	public valueExchangeCrypto: any;
	public valueDollarCrypto: any;
	public inputCryptoSelected: boolean;
	public inputCryptoExchange: boolean;
	public loadingValues: boolean;
	// -------------------------------------------------------------------------------------

	public constructor(
		private store: DataLocalService,
		public cdr: ChangeDetectorRef,
		public alertCtrl: AlertController,
		public http: AxiosService,
		protected auth: AuthService,
		private toastCtrl: ToastService,
		private loadingCtrl: LoadingService
	) {
		// this.usdAmount = 0;
		// this.inputFrom = 0;
		// this.inputTo = 0;

		this.inputOrigin = 'origin';
		this.inputDestination = 'destination';
		this.inputValueDollar = 'valueDollar';
		this.cryptosShortNames = [];
		this.selectedCryptoName = '';
		this.changeCryptoName = '';
		this.selectedPocketCrypto = [];
		this.exchangePocketCrypto = [];
		this.selectedPocket = '';
		this.exchangePocket = '';
		this.valueSelectedCrypto = 0;
		this.valueExchangeCrypto = 0;
		this.valueDollarCrypto = 0;
		this.inputCryptoSelected = true;
		this.inputCryptoExchange = true;
		// this.loadingValues = false;
	}
	//---------------------------------------------------------------------------------------------------
	public async ngOnInit(): Promise<any> {
		// await this.fillCryptoSelect(this.pockets);
		// await this.getPriceCriptoUsd();
	}

	public async ionViewDidEnter(): Promise<any> {
		this.pockets = await this.store.getDataLocal('pockets');
		this.cryptosShortNames = this.setCryptosShortNames(this.pockets);
		this.selectedCryptoName = this.cryptosShortNames[0];
		this.changeCryptoName = this.cryptosShortNames[1];
		this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
		this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
		this.selectedPocket = this.selectedPocketCrypto[0];
		this.exchangePocket = this.exchangePocketCrypto[0];
		this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.selectedPocket);
	}
	//---------------------------------------------------------------------------------------------------
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
      header: 'Seleccione un tipo de moneda',
      inputs: this.setCryptoNamesAlert(cryptoNameSelected),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
				},
				{
          text: 'Seleccionar',
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
			this.selectedPocket = this.selectedPocketCrypto[0];
			this.exchangePocket = this.exchangePocketCrypto[0];
			this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.selectedPocket);
			this.resetValuesInputs();
		} else if (typeInput === this.inputDestination) {
			this.selectedCryptoName = this.resetValueCryptoNameInput(this.cryptosShortNames.indexOf(cryptoNameSelected));
			this.changeCryptoName = cryptoNameSelected;
			this.selectedPocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.selectedCryptoName);
			this.exchangePocketCrypto = this.setSelectedPocketCrypto(this.pockets, this.changeCryptoName);
			this.selectedPocket = this.selectedPocketCrypto[0];
			this.exchangePocket = this.exchangePocketCrypto[0];
			this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.selectedPocket);
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
		this.selectedPocket = this.selectedPocketCrypto[this.selectedPocketCrypto.indexOf(pocketChange)];
		this.exchangePocket = this.exchangePocketCrypto[this.exchangePocketCrypto.indexOf(pocketSelected)];
		this.inputCryptoSelected = this.validateBalancePocket(this.pockets, this.selectedPocket);
		this.resetValuesInputs();
	}

	public async showListNamesPockets(pocketsList: any[], pocketSelected: string, currentPocket: string): Promise<any> {
		const alert = await this.alertCtrl.create({
      header: 'Seleccione un bolsillo',
      inputs: this.setPocketsNamesAlert(pocketsList, pocketSelected),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
				},
				{
          text: 'Seleccionar',
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
			this.selectedPocket = pocketNameSelected;
			this.resetValuesInputs();
		} else {
			this.exchangePocket = pocketNameSelected;
			this.resetValuesInputs();
		}
	}

	public async getExchangeValues(event: any, inputCurrent: string): Promise<any> {
		// this.loadingValues = true;
		if (event !== null && event > 0) {
			await this.runGetExchangeValues(event, inputCurrent);
		} else {
			this.valueExchangeCrypto = 0;
			// this.loadingValues = false;
		}
	}

	private async runGetExchangeValues(valueInput: string, inputCurrent: string): Promise<any> {
		const dataBody = {
			currencyShortNameFrom: this.selectedCryptoName,
			currencyShortNameTo: this.changeCryptoName,
			amount: valueInput,
		};
		await this.http.post('exchange/price', dataBody, this.auth)
		.then(response => {
			this.validateGetExchangeValues(response, inputCurrent, valueInput);
		})
		.catch(error => {
			console.error('ERROR', error);
			// this.loadingValues = false;
			this.toastCtrl.presentToast({text: 'Errores internos. Intente nuevamente.'});
		});
	}

	private validateGetExchangeValues(dataResponse: any, inputCurrent: string, valueInput: string): void {
		if (inputCurrent === this.inputOrigin) {
			console.log('UNO: ', dataResponse);
			this.valueExchangeCrypto = parseFloat(dataResponse.amountCriptoTo).toFixed(4);
			this.valueDollarCrypto = parseFloat(dataResponse.amountUsdFrom).toFixed(4);
			// this.loadingValues = false;
		} else if (inputCurrent === this.inputValueDollar) {
			console.log('UNO: ', dataResponse);
			this.valueSelectedCrypto = (parseInt(valueInput) / dataResponse.priceUsdFrom).toFixed(4);
			this.valueExchangeCrypto = parseFloat(dataResponse.amountCriptoTo).toFixed(4);
			// this.loadingValues = false;
		}
	}

	private validateBalancePocket (pockets: any, pocketSelected: string): boolean {
		let availableValue: boolean = true;
		pockets.forEach(pocket => {
			if (pocketSelected === pocket.label && pocket.balance > 0) {
				availableValue = false;
			}
		});
		return false; //availableValue;
	}

	public messageBalancePocketCurrent(): void {
		if (this.inputCryptoSelected) this.toastCtrl.presentToast({text: 'El bosillo seleccionado no tiene saldo. Seleccione otro bolsillo.'});
	}

	private resetValuesInputs(): void {
		this.valueSelectedCrypto = 0;
		this.valueExchangeCrypto = 0;
		this.valueDollarCrypto = 0;
	}
	//---------------------------------------------------------------------------------------------------

	public async fillCryptoSelect(pockets: any): Promise<any> {
		// console.log('POCKETS: ', pockets);

		pockets.forEach(pocket => {
			// console.log('POCKET: ', pocket);
			const resultFrom = this.selectCryptoFrom.find(data => data.currencyId === pocket.currencyId);
			if (resultFrom == undefined) this.selectCryptoFrom.push(pocket)
		});

		this.selectCryptoTo = this.selectCryptoFrom;
		this.cryptoFrom = this.selectCryptoFrom[0];
		this.cryptoTo = this.selectCryptoFrom[1];

		pockets.forEach(pocket => {
			if (pocket.currencyId === this.cryptoFrom.currencyId) {
				this.pocketsFrom.push(pocket)
			} else if (pocket.currencyId === this.cryptoTo.currencyId) {
				this.pocketsTo.push(pocket)
			}
		});

		this.selectedPocketFrom = this.pocketsFrom[0];
		this.selectedPocketTo = this.pocketsTo[0];
	}

	async filterCryptoSelectFrom() {
		let i = this.selectCryptoTo.indexOf(this.cryptoFrom);
		if (i !== -1) {
			this.selectCryptoTo.splice(i, 1);
		}
		this.cdr.detectChanges();
	}

	filterCryptoSelectTo(data) {
		this.selectCryptoTo.splice(data, 1);
	}

	createInputsDataPockets(pockets) {
		const theNewInputs = [];
		pockets.forEach(pocket => {
			theNewInputs.push(
				{
					name: 'radio2',
					type: 'radio',
					label: pocket.label,
					value: pocket
				}
			);
		});
		return theNewInputs;
	}

	createInputsDataCurrencyFrom(cryptoFrom) {
		const theNewInputs = [];
		cryptoFrom.forEach(crypto => {
			theNewInputs.push(
				{
					name: 'radio2',
					type: 'radio',
					label: crypto.currency.shortName,
					value: crypto
				}
			);
		});
		return theNewInputs;
	}

	async filterCurrencyFrom(cryptoFrom) {
		console.log('UNO: ', cryptoFrom);
		let dataCurrencyFrom = this.createInputsDataCurrencyFrom(cryptoFrom);
		const alert = await this.alertCtrl.create({
			header: 'Seleccione moneda 1',
			inputs: dataCurrencyFrom,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary'
				},
				{
					text: 'Ok',
					handler: async (data) => {
						if (data) {
							this.cryptoFrom = data;
							this.selectedPocketFrom = data;
							this.pocketsFrom = this.filterPockets(data);
							await this.filterCurrencyTo(this.selectCryptoTo);
							this.tipoCurre = this.cryptoFrom.currency.shortName;
							await this.getPriceCriptoUsd();
						}
					}
				}
			]
		});
		await alert.present();
	}

	async filterCurrencyTo(cryptoTo) {
		let dataCurrencyTo = this.createInputsDataCurrencyFrom(cryptoTo);
		for (let i = 0; i < dataCurrencyTo.length; i++) {
			if (dataCurrencyTo[i].label === this.selectedPocketFrom.currency.shortName) {
				dataCurrencyTo.splice(i, 1);
				i--;
			}
		}
		const alert = await this.alertCtrl.create({
			header: 'Seleccione moneda 2',
			inputs: dataCurrencyTo,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						if (data) {
							this.cryptoTo = data;
							this.selectedPocketTo = data;
							this.pocketsTo = this.filterPockets(data);
						}
					}
				}
			]
		});
		await alert.present();
	}

	async selectPocketFrom(pockets) {
		let dataPockets = this.createInputsDataPockets(pockets);
		const alert = await this.alertCtrl.create({
			header: 'Seleccione su pocket',
			inputs: dataPockets,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						if (data) this.selectedPocketFrom = data;
					}
				}
			]
		});
		await alert.present();
	}

	async selectPocketTo(pockets) {
		let dataPockets = this.createInputsDataPockets(pockets);
		const alert = await this.alertCtrl.create({
			header: 'Seleccione su pocket',
			inputs: dataPockets,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						if (data) this.selectedPocketTo = data;
					}
				}
			]
		});
		await alert.present();
	}

	filterPockets(currency) {
		let pockets = [];
		this.pockets.forEach(pocket => {
			if (pocket.currencyId === currency.currencyId) {
				pockets.push(pocket)
			}
		});
		return pockets
	}

	async createExchange() {
		await this.loadingCtrl.present({ text: 'Enviando solicitud', cssClass: 'textLoadingBlack' });
		let profile = await this.store.getDataLocal('profile');
		let body = {
			addressFrom: this.selectedPocketFrom.address,
			addressTo: this.selectedPocketTo.address,
			currencyIdFrom: this.selectedPocketFrom.currencyId,
			currencyIdTo: this.selectedPocketTo.currencyId,
			currencyShortNameFrom: this.selectedPocketFrom.currency.shortName,
			currencyShortNameTo: this.selectedPocketTo.currency.shortName,
			amount: this.inputFrom,
			userId: profile.userId,
			priority: "low"
		};
		if (this.selectedPocketFrom.balance >= 0.0001) {
			let responseExchange = await this.http.post('exchange/create', body, this.auth);
			if (responseExchange.status === 200) {
				await this.loadingCtrl.dismiss();
				await this.toastCtrl.presentToast({
					text: 'Solicitud enviada correctamente'
				})
				let dataResponse = await this.getPocketTransaction();
				if (dataResponse.status === 200) {
					dataResponse.pocket = this.selectedPocketFrom;
					await this.store.setDataLocal('transaction', dataResponse)
				} else {
					await this.toastCtrl.presentToast({ text: dataResponse.error.msg })
				}
			} else {
				await this.loadingCtrl.dismiss();
				await this.toastCtrl.presentToast({
					text: responseExchange.error.msg
				})
			}
		} else {
			await this.loadingCtrl.dismiss();
			await this.toastCtrl.presentToast({
				text: `Su pocket ${this.selectedPocketFrom.label} no tiene fondos suficientes`
			})
		}
	}

	public changeCryptoData(): void {
		let selectedPocketFrom = this.selectedPocketFrom;
		let selectedPocketTo = this.selectedPocketTo;
		let selectCryptoTo = this.selectCryptoTo;
		let selectCryptoFrom = this.selectCryptoFrom;
		let cryptoFrom = this.cryptoFrom;
		let cryptoTo = this.cryptoTo;
		this.selectedPocketFrom = selectedPocketTo;
		this.selectedPocketTo = selectedPocketFrom;
		this.selectCryptoTo = selectCryptoFrom;
		this.selectCryptoFrom = selectCryptoTo;
		this.cryptoTo = cryptoFrom;
		this.cryptoFrom = cryptoTo;
	}

	async getPricesExchange() {
		let body = {
			currencyShortNameFrom: this.selectedPocketFrom.currency.shortName,
			currencyShortNameTo: this.selectedPocketTo.currency.shortName,
			amount: this.inputFrom,
		};
		let response = await this.http.post('exchange/price', body, this.auth);
		this.inputTo = response.amountCriptoTo;
		this.valueUsdFrom = response.priceUsdFrom;
		this.valueCryptoTo = (response.priceUsdFrom / response.priceUsdTo).toFixed(5)
	}

	async getPocketTransaction() {
		let body = {
			userId: this.selectedPocketFrom.userId,
			type: 0,
			address: this.selectedPocketFrom.address,
			currencyShortName: this.selectedPocketFrom.currency.shortName
		};
		return await this.http.post('transaction/index', body, this.auth);
	}

	public async getFeeTransactionFrom(event): Promise<any> {
		this.usdAmount = (this.priceBtc * this.inputFrom).toFixed(2);
		await this.getPricesExchange();
	}

	public async onInput(event): Promise<any> {
		this.inputFrom = (this.usdAmount / this.priceBtc).toFixed(4);
		await this.getPricesExchange();
	}

	async getPriceCriptoUsd() {
		let curre = "";
		if (this.tipoCurre == null) {
			curre = "BTC";
		} else {
			curre = this.tipoCurre;
		}
		let body = {
			amount: 0.0001,
			currencyShortNameFrom: curre,
			currencyIdFrom: this.cryptoFrom.currencyId
		};
		let responseFee = await this.http.post('exchange/fee', body, this.auth);
		if (responseFee.status === 200) {
			this.priceBtc = responseFee.data.priceCriptoUsd;
		}
	}
}
