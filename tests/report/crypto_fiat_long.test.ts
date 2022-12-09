
import createReport from '../../src/index';
import { taxReportFactory, tradeFactory, withdrawalFactory } from '../utils/factories';

describe('crypto/fiat long term gains', () => {
  const trade_1_fee = withdrawalFactory({
    timestamp: '2018-01-01T09:30:00Z',
    withdrawal_amount: '5',
    withdrawal_code: 'USD'
  });
  const trade_1 = tradeFactory({
    timestamp: '2018-01-01T09:30:00Z',
    side: 'BUY',
    base_amount: '1',
    base_code: 'ETH',
    quote_amount: '200',
    quote_code: 'USD',
    fee_tx_ids: [trade_1_fee.tx_id]
  });
  const trade_2_fee = withdrawalFactory({
    timestamp: '2019-01-04T12:00:00Z',
    withdrawal_amount: '2',
    withdrawal_code: 'USD'
  });
  const trade_2 = tradeFactory({
    timestamp: '2019-01-04T12:00:00Z',
    side: 'BUY',
    base_amount: '1',
    base_code: 'ETH',
    quote_amount: '153.19',
    quote_code: 'USD',
    fee_tx_ids: [trade_2_fee.tx_id]
  });
  const trade_3_fee = withdrawalFactory({
    timestamp: '2020-01-31T13:00:00Z',
    withdrawal_amount: '5',
    withdrawal_code: 'USD'
  });
  const trade_3 = tradeFactory({
    timestamp: '2020-01-31T13:00:00Z',
    side: 'SELL',
    base_amount: '1',
    base_code: 'ETH',
    quote_amount: '250',
    quote_code: 'USD',
    fee_tx_ids: [trade_3_fee.tx_id]
  });
  const transactions = [trade_1_fee, trade_1, trade_2_fee, trade_2, trade_3_fee, trade_3];
  const prices = [
    {
      tx_id: trade_1.tx_id,
      timestamp: trade_1.timestamp,
      base_code: 'ETH',
      quote_code: 'USD',
      price: '200'
    },
    {
      tx_id: trade_1.tx_id,
      timestamp: trade_1.timestamp,
      base_code: 'USD',
      quote_code: 'USD',
      price: '1'
    },
    {
      tx_id: trade_2.tx_id,
      timestamp: trade_2.timestamp,
      base_code: 'ETH',
      quote_code: 'USD',
      price: '153.19'
    },
    {
      tx_id: trade_2.tx_id,
      timestamp: trade_2.timestamp,
      base_code: 'USD',
      quote_code: 'USD',
      price: '1'
    },
    {
      tx_id: trade_3.tx_id,
      timestamp: trade_3.timestamp,
      base_code: 'ETH',
      quote_code: 'USD',
      price: '250'
    },
    {