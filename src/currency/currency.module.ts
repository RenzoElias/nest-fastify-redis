import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [CommonModule],
})
export class CurrencyModule {}
