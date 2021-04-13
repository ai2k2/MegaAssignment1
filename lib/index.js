module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.array.sort");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__(0);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__(1);

// EXTERNAL MODULE: external "core-js/modules/es6.array.sort"
var es6_array_sort_ = __webpack_require__(3);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./src/matchLogic.ts




const lotSort = (lots, costMethod) => {
  const fifoComparator = (a, b) => a.unix - b.unix;

  const hifoComparator = (a, b) => b.pricePerUnit.minus(a.pricePerUnit).toNumber();

  const lifoComparator = (a, b) => b.unix - a.unix;

  if (costMethod === 'FIFO') {
    return lots.sort(fifoComparator);
  } else if (costMethod === 'HIFO') {
    return lots.sort(hifoComparator);
  } else if (costMethod === 'LIFO') {
    return lots.sort(lifoComparator);
  } else {
    throw new Error('No cost basis method provided.');
  }
};
const unmatchedDisposal = (report, disposal, localCurrency) => {
  let reportToUpdate;
  const disposalMoment = external_moment_default.a.utc(disposal.unix, 'X');
  const disposalYear = disposalMoment.format('YYYY');
  const samedate = disposalMoment.format();
  const sale = Object(external_immutable_["Map"])({
    asset: disposal.assetCode,
    proceeds: disposal.proceedsAmount,
    date_sold: samedate,
    cost_basis: '0',
    asset_amount: disposal.assetAmount,
    date_acquired: samedate,
    tx_id_sale: disposal.transactionId
  });
  reportToUpdate = report.updateIn([disposalYear, 'unmatched'], list => list.push(sale));

  if (disposal.isLost) {
    reportToUpdate = reportToUpdate.updateIn([disposalYear, 'lost'], list => list.push(sale));
  } else if (disposal.isCompoundLiquidated) {
    reportToUpdate = reportToUpdate.updateIn([disposalYear, 'compound_liquidations_borrower'], (list = Object(external_immutable_["List"])()) => list.push(sale));
  } else {
    if (disposal.isBorrowRepay) {
      reportToUpdate = reportToUpdate.updateIn([disposalYear, 'borrow_repayments'], (list = Object(external_immutable_["List"])()) => list.push(sale));
    }

    if (disposal.assetCode !== localCurrency) {
      let reportCategory = 'short';

      if (disposal.gainsAsInterestIncome) {
        reportCategory = 'interest_income';
      }

      reportToUpdate = reportToUpdate.updateIn([disposalYear, reportCategory], list => list.push(sale));
    }
  }

  return Object(external_immutable_["Map"])({
    report: reportToUpdate,
    disposal: disposal.set('assetAmount', new external_bignumber_js_["BigNumber"](0)).set('proceedsAmount', new external_bignumber_js_["BigNumber"](0))
  });
};
const exhaustLot = (report, disposal, lotStack, localCurrency) => {
  let currentReport = report;
  const lotToDiminish = lotStack.first();
  const disposalMoment = external_moment_default.a.utc(disposal.unix, 'X');
  const timeDiff = disposalMoment.diff(external_moment_default.a.utc(lotToDiminish.unix, 'X'));
  const isShort = external_moment_default.a.duration(timeDiff).asYears() < 1;
  const shareSold = lotToDiminish.assetAmount.dividedBy(disposal.assetAmount);
  const saleProceeds = disposal.proceedsAmount.times(shareSold);
  const disposalYear = disposalMoment.format('YYYY');
  const sale = Object(external_immutable_["Map"])({
    asset: disposal.assetCode,
    proceeds: saleProceeds,
    date_sold: external_moment_default.a.utc(disposal.unix, 'X').format(),
    cost_basis: lotToDiminish.basisAmount,
    asset_amount: lotToDiminish.assetAmount,
    date_acquired: external_moment_default.a.utc(lotToDiminish.unix, 'X').format(),
    tx_id_lot: lotToDiminish.transactionId,
    tx_id_sale: disposal.transactionId
  });

  if (disposal.isLost) {
    currentReport = currentReport.updateIn([disposalYear, 'lost'], list => list.push(sale));
  } else if (disposal.isCompoundLiquidated) {
    currentReport = currentReport.updateIn([disposalYear, 'compound_liquidations_borrower'], (list = Object(external_imm