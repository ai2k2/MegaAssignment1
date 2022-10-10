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
  const toValidate = { prices, transactions, ...options.config };
  Object.entries(toValidate).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      throw new InvalidParamError(`"${key}" must not be null or undefined.`);
    }
  });
  // Assert types
  if (!Array.isArray(transactions)) {
    throw new InvalidParamError('"transactions" must be an array.');
  }
  if (!Arr