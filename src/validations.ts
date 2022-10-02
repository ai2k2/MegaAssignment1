import { EmptyParamError, InvalidParamError } from './errors';
import { TaxReportOptions } from './types';

export const validateOptions = (options: TaxReportOptions): void => {
  const {
    prices,
    transactions,
    config: {
      local_currency = 'USD',
      price_method = 'BASE',
      cost_basis_method = 'FIFO',
      decimal_places = 2
    } = {}
  } = options;
  // Assert params are not null or undefined.
  c