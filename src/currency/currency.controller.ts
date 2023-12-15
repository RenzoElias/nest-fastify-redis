import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from 'src/helper/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrencyDto } from './dto/currency.dto';
import { DefaultResponse } from 'src/helper/response.helper';

@ApiBearerAuth()
@ApiTags('Currency')
@Controller('currency')
@UseGuards(JwtAuthGuard)
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('/convert')
  async convertCurrency(
    @Body() payload: CurrencyDto,
  ): Promise<DefaultResponse> {
    const { amount, from, to } = payload;
    const exchangedAmount = await this.currencyService.calculateExchangeAmount(
      amount,
      from,
      to,
    );

    return DefaultResponse.sendOk('', {
      originalAmount: amount,
      exchangedAmount,
      fromCurrency: from,
      toCurrency: to,
      exchangeRate: await this.currencyService.calculateExchangeAmount(
        1,
        from,
        to,
      ),
    });
  }
}
