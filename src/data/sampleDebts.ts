import type { Debt, CashFlowAnalysis } from '../types/debt';

export const sampleDebts: Debt[] = [
  {
    id: 'debt-1',
    name: 'Amazon Store Card',
    balance: 852.00,
    interestRate: 29.99,
    minimumPayment: 45.00,
    isActive: true
  },
  {
    id: 'debt-2',
    name: 'AmEx Delta SkyMiles',
    balance: 7548.17,
    interestRate: 28.99,
    minimumPayment: 186.00,
    isActive: true
  },
  {
    id: 'debt-3',
    name: 'Discover Card',
    balance: 5962.44,
    interestRate: 27.24,
    minimumPayment: 156.00,
    isActive: true
  },
  {
    id: 'debt-4',
    name: 'AmEx Platinum',
    balance: 13415.61,
    interestRate: 27.24,
    minimumPayment: 443.26,
    isActive: true
  },
  {
    id: 'debt-5',
    name: 'Target RedCard',
    balance: 9338.54,
    interestRate: 27.15,
    minimumPayment: 265.00,
    isActive: true
  },
  {
    id: 'debt-6',
    name: 'Chase Freedom',
    balance: 3479.77,
    interestRate: 19.24,
    minimumPayment: 80.00,
    isActive: true
  },
  {
    id: 'debt-7',
    name: 'Student Loans',
    balance: 14778.58,
    interestRate: 7.125,
    minimumPayment: 167.99,
    isActive: true
  }
];

export const sampleCashFlow: CashFlowAnalysis = {
  monthlyIncome: 6500,
  monthlyExpenses: 4200,
  availableForDebt: 2300,
  emergencyFund: 3500,
  targetEmergencyMonths: 3
};