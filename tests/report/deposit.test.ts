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
        tx_id: deposit_2.tx_id,
        timestamp: deposit_2.timestamp,
        base_code: 'BTC',
        quote_code: 'USD',
        price: '300'
      },
      {
        tx_id: deposit_3.tx_id,
        timestamp: deposit_3.timestamp,
        base_code: 'BTC',
        quote_code: 'USD',
        price: '200'
      },
      {
        tx_id: trade_1.tx_id,
        timestamp: trade_1.timestamp,
        base_code: 'BTC',
        quote_code: 'USD',
        price: '333.3333333'
      }
    ];
    test('FIFO', () => {
      const received = createReport({
        transactions,
        prices,
        config: {
          local_currency: 'USD',
          price_method: 'BASE',
          cost_basis_method: 'FIFO',
          decimal_places: 2
        }
      });
      let expected = taxReportFactory({
        report: {
          2018: {
            assets: {
              BTC: {
                holdings: '0',
                increase: '3',
                decrease: '3'
              },
              USD: {
                holdings: '997',
                increase: '1000',
                decrease: '3'
              }
            },
            income: [],
            long: [],
            short: [
              {
                asset: 'BTC',
                asset_amount: '1',
                date_acquired: '2018-01-01T01:00:00Z',
                date_sold: '2018-01-04T01:00:00Z',
                proceeds: '332.33',
                cost_basis: '100',
                tx_id_lot: deposit_1.tx_id,
                tx_id_sale: trade_1.tx_id
              },
              {
                asset: 'BTC',
                asset_amount: '1',
                date_acquired: '2018-01-02T01:00:00Z',
                date_sold: '2018-01-04T01:00:00Z',
     