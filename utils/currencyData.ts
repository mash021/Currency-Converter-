import { CurrencyInfo } from '../types/currency';

export const currencyInfo: { [key: string]: CurrencyInfo } = {
  USD: {
    code: 'USD',
    name: 'دلار آمریکا',
    symbol: '$',
    flag: '🇺🇸'
  },
  EUR: {
    code: 'EUR',
    name: 'یورو',
    symbol: '€',
    flag: '🇪🇺'
  },
  GBP: {
    code: 'GBP',
    name: 'پوند بریتانیا',
    symbol: '£',
    flag: '🇬🇧'
  },
  JPY: {
    code: 'JPY',
    name: 'ین ژاپن',
    symbol: '¥',
    flag: '🇯🇵'
  },
  AUD: {
    code: 'AUD',
    name: 'دلار استرالیا',
    symbol: 'A$',
    flag: '🇦🇺'
  },
  CAD: {
    code: 'CAD',
    name: 'دلار کانادا',
    symbol: 'C$',
    flag: '🇨🇦'
  },
  CHF: {
    code: 'CHF',
    name: 'فرانک سوئیس',
    symbol: 'Fr',
    flag: '🇨🇭'
  },
  CNY: {
    code: 'CNY',
    name: 'یوان چین',
    symbol: '¥',
    flag: '🇨🇳'
  },
  AED: {
    code: 'AED',
    name: 'درهم امارات',
    symbol: 'د.إ',
    flag: '🇦🇪'
  },
  TRY: {
    code: 'TRY',
    name: 'لیر ترکیه',
    symbol: '₺',
    flag: '🇹🇷'
  },
  IRR: {
    code: 'IRR',
    name: 'ریال ایران',
    symbol: '﷼',
    flag: '🇮🇷'
  }
}; 