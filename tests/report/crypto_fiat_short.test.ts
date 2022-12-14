
import createReport from '../../src/index';
import { taxReportFactory, tradeFactory, withdrawalFactory } from './../utils/factories';

describe('crypto/fiat short term gains with fees', () => {
  const trade_1_fee = withdrawalFactory({
    timestamp: '2018-01-01T01:00:00Z',
    withdrawal_amount: '1',
    withdrawal_code: 'USD'
  });
  const trade_1 = tradeFactory({
    timestamp: '2018-01-01T01:00:00Z',
    side: 'BUY',
    base_amount: '1',
    base_code: 'BTC',
    quote_amount: '100',
    quote_code: 'USD',
    fee_tx_ids: [trade_1_fee.tx_id]
  });
  const trade_2_fee = withdrawalFactory({
    timestamp: '2018-01-02T01:00:00Z',
    withdrawal_amount: '1',
    withdrawal_code: 'USD'
  });
  const trade_2 = tradeFactory({
    timestamp: '2018-01-02T01:00:00Z',
    side: 'BUY',
    base_amount: '1',
    base_code: 'BTC',
    quote_amount: '300',
    quote_code: 'USD',
    fee_tx_ids: [trade_2_fee.tx_id]
  });
  const trade_3_fee = withdrawalFactory({
    timestamp: '2018-01-03T01:00:00Z',
    withdrawal_amount: '1',
    withdrawal_code: 'USD'
  });
  const trade_3 = tradeFactory({
    timestamp: '2018-01-03T01:00:00Z',
    side: 'BUY',
    base_amount: '1',
    base_code: 'BTC',
    quote_amount: '200',
    quote_code: 'USD',
    fee_tx_ids: [trade_3_fee.tx_id]
  });
  const trade_4_fee = withdrawalFactory({
    timestamp: '2018-01-04T01:00:00Z',
    withdrawal_amount: '3',
    withdrawal_code: 'USD'
  });
  const trade_4 = tradeFactory({
    timestamp: '2018-01-04T01:00:00Z',
    side: 'SELL',
    base_amount: '3',
    base_code: 'BTC',
    quote_amount: '1000',
    quote_code: 'USD',
    fee_tx_ids: [trade_4_fee.tx_id]
  });

  const transactions = [
    trade_1_fee,
    trade_1,
    trade_2_fee,
    trade_2,
    trade_3_fee,
    trade_3,
    trade_4_fee,
    trade_4
  ];
  const prices = [
    {
      tx_id: trade_1.tx_id,
      timestamp: '2018-01-01T01:00:00Z',
      base_code: 'BTC',
      quote_code: 'USD',
      price: '100'
    },
    {
      tx_id: trade_1.tx_id,
      timestamp: '2018-01-01T01:00:00Z',
      base_code: 'USD',