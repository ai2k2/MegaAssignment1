
# Crypto Tax Report

A javascript library for creating configurable tax reports. Supports generic transaction types as well as specific protocol support (such as Compound Finance).

*Note: This library is currently in alpha and subject to breaking changes. Please install with a pin to a version tag or commit.*

## Licensing
Licensing is AGPL v3.0 by default but an MIT license is available for purchase. Reach out at hello@cryptotaxtools.com to purchase a license for commercial use.

## Installation

```
npm install git://github.com/CryptoTaxTools/crypto-tax-report.git#v0.0.4
```

## Example Use

Here is an example of importing and using the library. If you'd like more examples of using the library, please reference the [tests](https://github.com/CryptoTaxTools/crypto-tax-report/tree/master/tests).

```js
import createReport from 'crypto-tax-report';

const report = createReport({
  config: {
    local_currency: 'USD',
    price_method: 'BASE',
    cost_basis_method: 'FIFO',
    decimal_places: 2,
    allow_lot_overlap: true,
  },
  transactions: [
    {
      tx_id: '1',
      tx_type: 'DEPOSIT',
      timestamp: '2020-09-09T01:00:00Z',
      deposit_code: 'USD',
      deposit_amount: '99'
    },
    {
      tx_id: '2',
      tx_type: 'TRADE',
      timestamp: '2020-09-10T01:00:00Z',
      side: 'BUY',
      base_code: 'BTC',