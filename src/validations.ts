import { EmptyParamError, InvalidParamError } from './errors';
import { TaxReportOptions } from './types';

export const validateOptions = (options: TaxReportOptions): void => {
  const {
    prices,
    transactions,
    confi