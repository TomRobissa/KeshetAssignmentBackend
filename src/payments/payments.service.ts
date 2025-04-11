import { Injectable } from '@nestjs/common';
import { Moment } from 'moment';
import moment from 'moment';
import { Payment } from './payments';
import { PAYMENTS } from './payments';

@Injectable()
export class PaymentsService {
  private payments: Payment[] = PAYMENTS;

  getPayments(from: string, to: string, searchText?: string): Payment[] {
    const fromMoment: Moment = moment(from);
    const toMoment: Moment = moment(to);

    const filteredPayments: Payment[] = this.payments.filter(
      (payment: Payment) =>
        this.isPaymentMatchesSearch(payment, fromMoment, toMoment, searchText),
    );
    return filteredPayments;
  }

  private isTextMatch(input: string, searchText: string): boolean {
    return input.toLowerCase().includes(searchText.toLowerCase());
  }
  private isPaymentMatchesSearch(
    payment: Payment,
    startDate: Moment,
    endDate: Moment,
    searchText?: string,
  ): boolean {
    let isTextMatch: boolean = true;
    if (searchText) {
      isTextMatch =
        this.isTextMatch(payment.supplier, searchText) ||
        this.isTextMatch(payment.description, searchText);
    }
    const paymentDateMoment = moment(payment.date);
    const isDateMatch = paymentDateMoment.isBetween(
      startDate,
      endDate,
      'day',
      '[]',
    ); //including edges, match by date.

    return isDateMatch && isTextMatch;
  }
}
