import createReport from '../../src/index';
import { PriceMethod, CostBasisMethod, Price } from '../../src/types';
import {
  taxReportFactory,
  depositFactory,
  tradeFactory,
  withdrawalFactory
} from '../utils/factories';

describe('deposit assets', () => {
  describe('crypto/fiat short term gains - deposit BTC - null fees on deposit', () => {
    const deposit_1 = depositFactory({
      timestamp: '2018-01-01T01:00:00Z',
      deposit_amount: '1',
      deposit_code: 'BTC'
    });
    const deposit_2 = depositFactory({
      timestamp: '2018-01-02T01:00:00Z',
      deposit_amount: '1',
      deposit_code: 'BTC'
    });
    const deposit_3 = depositFactory({
      timestamp: '2018-01-03T01:00:00Z',
      deposit_amount: '1',
      deposit_code: 'BTC'
    });
    const trade_1_fee = withdrawalFactory({
      timestamp: '2018-01-04T01:00:00Z',
      withdrawal_code: 'USD',
      withdrawal_amount: '3'
    });
    const trade_1 = tradeFactory({
      timestamp: '2018-01-04T01:00:00Z',
      side: 'SELL',
      base_amount: '3',
      base_code: 'BTC',
      quote_amount: '1000',
      quote_code: 'USD',
      fee_tx_ids: [trade_1_fee.tx_id]
    });
    const transactions = [deposit_1, deposit_2, deposit_3, trade_1, trade_1_fee];
    const prices = [
      {
        tx_id: deposit_1.tx_id,
        timestamp: deposit_1.timestamp,
        base_code: 'BTC',
        quote_code: 'USD',
        price: '100'
      },
      {
        tx_id: d