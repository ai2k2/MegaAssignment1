
import createReport from '../../src/index';
import { taxReportFactory, tradeFactory, withdrawalFactory } from './../utils/factories';

describe('crypto/crypto long term gains', () => {
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
    timestamp: '2019-01-31T13:00:00Z',
    withdrawal_amount: '5',
    withdrawal_code: 'USD'
  });
  const trade_3 = tradeFactory({
    timestamp: '2019-01-31T13:00:00Z',
    side: 'BUY',
    base_amount: '2',
    base_code: 'ETH',
    quote_amount: '250',
    quote_code: 'USD',
    fee_amount: '5',
    fee_code: 'USD',
    fee_tx_ids: [trade_3_fee.tx_id]
  });
  const trade_4_fee = withdrawalFactory({
    timestamp: '2020-03-03T15:00:00Z',
    withdrawal_amount: '0.001',
    withdrawal_code: 'BTC'
  });
  const trade_4 = tradeFactory({
    timestamp: '2020-03-03T15:00:00Z',
    side: 'SELL',
    base_amount: '1',
    base_code: 'ETH',
    quote_amount: '0.07',
    quote_code: 'BTC',
    fee_tx_ids: [trade_4_fee.tx_id]
  });
  const trade_5_fee = withdrawalFactory({
    timestamp: '2021-05-01T20:00:00Z',
    withdrawal_amount: '4',
    withdrawal_code: 'USD'
  });
  const trade_5 = tradeFactory({
    timestamp: '2021-05-01T20:00:00Z',
    side: 'SELL',
    base_amount: '0.069',
    base_code: 'BTC',
    quote_amount: '345',
    quote_code: 'USD',
    fee_tx_ids: [trade_5_fee.tx_id]
  });
  const transactions = [
    trade_1_fee,
    trade_1,
    trade_2_fee,
    trade_2,
    trade_3_fee,
    trade_3,
    trade_4_fee,
    trade_4,
    trade_5_fee,
    trade_5
  ];
  const prices = [
    {
      tx_id: trade_1.tx_id,
      timestamp: '2018-01-01T09:30:00Z',
      base_code: 'ETH',
      quote_code: 'USD',
      price: '200'
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
      timestamp: '2019-01-04T12:00:00Z',
      base_code: 'ETH',
      quote_code: 'USD',
      price: '153.19'
    },
    {
      tx_id: trade_2.tx_id,
      timestamp: '2019-01-04T12:00:00Z',
      base_code: 'USD',
      quote_code: 'USD',
      price: '1'
    },
    {
      tx_id: trade_3.tx_id,
      timestamp: '2019-01-31T13:00:00Z',
      base_code: 'ETH',
      quote_code: 'USD',
      price: '125'
    },
    {
      tx_id: trade_3.tx_id,
      timestamp: '2019-01-31T13:00:00Z',
      base_code: 'USD',
      quote_code: 'USD',
      price: '1'
    },
    {
      tx_id: trade_4.tx_id,
      timestamp: '2020-03-03T15:00:00Z',
      base_code: 'ETH',
      quote_code: 'USD',
      price: '135'
    },
    {
      tx_id: trade_4.tx_id,
      timestamp: '2020-03-03T15:00:00Z',
      base_code: 'BTC',
      quote_code: 'USD',
      price: '1925'
    },
    {
      tx_id: trade_4_fee.tx_id,
      timestamp: '2020-03-03T15:00:00Z',
      base_code: 'BTC',
      quote_code: 'USD',
      price: '1925'
    },
    {
      tx_id: trade_5.tx_id,
      timestamp: '2021-05-01T20:00:00Z',
      base_code: 'BTC',
      quote_code: 'USD',
      price: '5000'
    },
    {
      tx_id: trade_5.tx_id,
      timestamp: '2021-05-01T20:00:00Z',