export interface VaultList {
  status?: number;
  data?: DataCurrency[];
  vault?: DataVaultsList[];
}

export interface DataCurrency {
   walletId?: number;
   amountCriptoTotal?: number;
   amountCriptoUsdTotal?: number;
   amountCriptoUsdTotalLocal?: any;
   profitCriptoTotal?: string;
   profitCriptoUsdTotal?: number;
   profitCriptoUsdTotalLocal?: any;
   shortName?: string;
   priceCriptoUsd?: number;
   currencyId?: number;
}

export interface DataVaultsList {
  vaultId?: number;
  user_id?: number;
  hash?: string;
  wallet_id?: number;
  amount?: string;
  percent?: number;
  profit?: number;
  date_begin?: string;
  date_end?: string;
  date_cancelation?: any;
  status?: number;
  description?: string;
  id?: number;
  currency_id?: number;
  currencyId?: number;
  name?: string;
  short_name?: string;
  amountUsd?: number;
  priceCriptoUsd?: number;
}

export interface TypeSliding {
  id?: string,
  left?: string,
  right?: string
}
