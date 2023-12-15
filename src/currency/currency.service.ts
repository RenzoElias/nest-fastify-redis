import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CurrencyService {
  private readonly exchangeRatesKey = 'exchangeRates';

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    this.initializeExchangeRates();
  }

  private async initializeExchangeRates(): Promise<string> {
    const existingRates = await this.cache.get(this.exchangeRatesKey);

    if (!existingRates) {
      const initialRates = {
        USD: 1,
        EUR: 0.917215,
        PEN: 3.739842,
        MXN: 17.222596,
        COP: 3970,
        VES: 35.677962,
        CLP: 875.279817,
        ARS: 799.941945,
        BOB: 6.838956,
      };

      await this.cache.set(
        this.exchangeRatesKey,
        JSON.stringify(initialRates),
        0,
      );
    }

    return await this.cache.get<string>(this.exchangeRatesKey);
  }

  async getExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<number> {
    let rates = await this.cache.get<string>(this.exchangeRatesKey);

    if (!rates) {
      rates = await this.initializeExchangeRates();
    }

    const parsedRates = JSON.parse(rates);

    if (!parsedRates[sourceCurrency] || !parsedRates[targetCurrency]) {
      throw new Error('Invalid currency');
    }

    return parsedRates[targetCurrency] / parsedRates[sourceCurrency];
  }

  async calculateExchangeAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    const exchangeRate = await this.getExchangeRate(fromCurrency, toCurrency);
    const exchangedAmount = +(amount * exchangeRate).toFixed(2);

    return exchangedAmount;
  }
}
