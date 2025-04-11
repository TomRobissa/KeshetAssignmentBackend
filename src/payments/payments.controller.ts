import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}
  @Get()
  filter(
    @Query('startDate') fromDate: string,
    @Query('endDate') toDate: string,
    @Query('searchText') searchText?: string,
  ) {
    return this.paymentsService.getPayments(fromDate, toDate, searchText);
  }
}
