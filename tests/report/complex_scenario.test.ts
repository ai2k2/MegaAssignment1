
import createReport from '../../src/index';
import { taxReportFactory, tradeFactory, withdrawalFactory } from './../utils/factories';

describe('fiat -> crypto -> fiat -> crypto scenario', () => {
  test('No fiat sales in short/long array', () => {
    const trade_1 = tradeFactory({
      timestamp: '2018-01-01T09:30:00Z',
      side: 'BUY',
      base_amount: '1',
      base_code: 'BTC',
      quote_amount: '100',
      quote_code: 'USD'
    });
    const trade_2 = tradeFactory({
      timestamp: '2018-01-02T09:30:00Z',
      side: 'NONE',
      base_amount: '1000',
      base_code: 'USD',
      quote_amount: '1',
      quote_code: 'BTC'
    });
    const trade_3 = tradeFactory({
      timestamp: '2018-01-03T09:30:00Z',
      tx_id: '3',
      side: 'NONE',
      base_amount: '20',
      base_code: 'ETH',
      quote_amount: '500',
      quote_code: 'USD'
    });
    const transactions = [trade_1, trade_2, trade_3];
    const prices = [
      {
        tx_id: trade_1.tx_id,
        timestamp: '2018-01-01T09:30:00Z',
        base_code: 'BTC',
        quote_code: 'USD',
        price: '100'
      },
      {
        tx_id: trade_1.tx_id,
        timestamp: '2018-01-01T09:30:00Z',
        base_code: 'USD',
        quote_code: 'USD',
        price: '1'
      },
      {
        tx_id: trade_2.tx_id,
        timestamp: '2018-01-02T09:30:00Z',
        base_code: 'USD',
        quote_code: 'USD',
        price: '1'
      },
      {
        tx_id: trade_2.tx_id,
        timestamp: '2018-01-02T09:30:00Z',
        base_code: 'BTC',
        quote_code: 'USD',
        price: '1000'
      },
      {
        tx_id: trade_3.tx_id,
        timestamp: '2018-01-03T09:30:00Z',
        base_code: 'USD',
        quote_code: 'USD',
        price: '1'
      },
      {
        tx_id: trade_3.tx_id,
        timestamp: '2018-01-03T09:30:00Z',
        base_code: 'ETH',
        quote_code: 'USD',
        price: '25'
      }
    ];

    const result = createReport({
      transactions,
      prices,
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2
      }
    });
    const expected = taxReportFactory({
      config: {
        local_currency: 'USD',
        price_method: 'BASE',