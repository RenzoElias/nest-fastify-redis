export class IConvertCurrencyDto {
  originalAmount: number;
  exchangedAmount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}
