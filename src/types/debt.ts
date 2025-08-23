export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  isActive: boolean;
}

export interface PayoffStrategy {
  name: string;
  description: string;
  icon: string;
  key: 'avalanche' | 'snowball' | 'cashflow';
}

export interface DebtResult extends Debt {
  priority: number;
  monthsToPayoff: number;
  totalInterest: number;
  currentPayment: number;
  payoffDate: Date;
}

export interface StrategyResult {
  strategy: PayoffStrategy;
  debts: DebtResult[];
  totalInterest: number;
  totalMonths: number;
  totalPayments: number;
  monthlyPayment: number;
  payoffDate: Date;
}

export interface CashFlowAnalysis {
  monthlyIncome: number;
  monthlyExpenses: number;
  availableForDebt: number;
  emergencyFund: number;
  targetEmergencyMonths: number;
}

export interface PayoffComparison {
  strategies: StrategyResult[];
  bestStrategy: StrategyResult;
  interestSavings: number;
  timeSavings: number;
  cashFlow: CashFlowAnalysis;
}

export interface CalculationParams {
  debts: Debt[];
  extraPayment: number;
  cashFlow?: CashFlowAnalysis;
}