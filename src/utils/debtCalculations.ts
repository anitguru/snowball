import type { 
  Debt, 
  DebtResult, 
  StrategyResult, 
  PayoffStrategy, 
  CashFlowAnalysis, 
  PayoffComparison,
  CalculationParams 
} from '../types/debt';

export const PAYOFF_STRATEGIES: PayoffStrategy[] = [
  {
    name: 'Debt Avalanche',
    description: 'Pay minimums on all debts, put extra money toward highest interest rate first',
    icon: '🏔️',
    key: 'avalanche'
  },
  {
    name: 'Debt Snowball',
    description: 'Pay minimums on all debts, put extra money toward smallest balance first',
    icon: '❄️',
    key: 'snowball'
  },
  {
    name: 'Cash Flow Optimized',
    description: 'Optimize payment strategy based on your cash flow and financial goals',
    icon: '💰',
    key: 'cashflow'
  }
];

function calculateMonthsToPayoff(balance: number, payment: number, interestRate: number): number {
  if (interestRate === 0) {
    return Math.ceil(balance / payment);
  }
  
  const monthlyRate = interestRate / 100 / 12;
  
  if (payment <= balance * monthlyRate) {
    return 999; // Never pays off
  }
  
  return Math.ceil(
    Math.log(1 + (balance * monthlyRate) / (payment - balance * monthlyRate)) / 
    Math.log(1 + monthlyRate)
  );
}

function calculateTotalInterest(balance: number, payment: number, interestRate: number): number {
  const months = calculateMonthsToPayoff(balance, payment, interestRate);
  if (months >= 999) return balance * 10; // Penalty for never paying off
  if (interestRate === 0) return 0;
  return Math.max(0, payment * months - balance);
}

function simulatePayoff(
  sortedDebts: Debt[], 
  extraPayment: number, 
  strategy: 'avalanche' | 'snowball' | 'cashflow'
): DebtResult[] {
  const workingDebts = sortedDebts.map(debt => ({
    ...debt,
    remainingBalance: debt.balance,
    monthsPaidOff: 0,
    interestPaid: 0,
    currentPayment: debt.minimumPayment,
    priority: 0,
    monthsToPayoff: 0,
    totalInterest: 0,
    payoffDate: new Date()
  }));

  let currentMonth = 0;
  let availableExtra = extraPayment;

  // Add extra payment to the first debt initially
  if (workingDebts.length > 0 && availableExtra > 0) {
    workingDebts[0].currentPayment += availableExtra;
  }

  while (workingDebts.some(debt => debt.remainingBalance > 0) && currentMonth < 600) {
    currentMonth++;
    let newlyPaidOffDebt = null;

    for (const debt of workingDebts) {
      if (debt.remainingBalance <= 0) continue;

      const monthlyInterest = debt.interestRate > 0 
        ? (debt.remainingBalance * debt.interestRate) / 100 / 12 
        : 0;
      const principalPayment = Math.min(
        debt.currentPayment - monthlyInterest,
        debt.remainingBalance
      );

      debt.interestPaid += monthlyInterest;
      debt.remainingBalance -= principalPayment;

      if (debt.remainingBalance <= 0) {
        debt.remainingBalance = 0;
        debt.monthsPaidOff = currentMonth;
        if (!newlyPaidOffDebt) {
          newlyPaidOffDebt = debt;
        }
      }
    }

    // Redirect payment from paid off debt to next debt
    if (newlyPaidOffDebt) {
      const nextDebt = workingDebts.find(debt => debt.remainingBalance > 0);
      if (nextDebt) {
        nextDebt.currentPayment += newlyPaidOffDebt.currentPayment;
      }
    }
  }

  return workingDebts.map((debt, index) => ({
    ...debt,
    priority: index + 1,
    monthsToPayoff: debt.monthsPaidOff,
    totalInterest: debt.interestPaid,
    payoffDate: new Date(Date.now() + debt.monthsPaidOff * 30 * 24 * 60 * 60 * 1000)
  }));
}

function calculateAvalanche(debts: Debt[], extraPayment: number): DebtResult[] {
  const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  return simulatePayoff(sortedDebts, extraPayment, 'avalanche');
}

function calculateSnowball(debts: Debt[], extraPayment: number): DebtResult[] {
  const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
  return simulatePayoff(sortedDebts, extraPayment, 'snowball');
}

function calculateCashFlow(
  debts: Debt[], 
  extraPayment: number, 
  cashFlow?: CashFlowAnalysis
): DebtResult[] {
  if (!cashFlow) {
    return calculateAvalanche(debts, extraPayment);
  }

  // Cash flow strategy: prioritize by a combination of interest rate, balance, and payment burden
  const sortedDebts = [...debts].sort((a, b) => {
    const aScore = (a.interestRate / 100) * 0.4 + (a.minimumPayment / a.balance) * 0.6;
    const bScore = (b.interestRate / 100) * 0.4 + (b.minimumPayment / b.balance) * 0.6;
    return bScore - aScore;
  });

  // Adjust extra payment based on available cash flow
  const adjustedExtra = Math.min(extraPayment, Math.max(0, cashFlow.availableForDebt - debts.reduce((sum, d) => sum + d.minimumPayment, 0)));
  
  return simulatePayoff(sortedDebts, adjustedExtra, 'cashflow');
}

export function calculateAllStrategies(params: CalculationParams): PayoffComparison {
  const { debts, extraPayment, cashFlow } = params;
  
  if (debts.length === 0) {
    const emptyResult: StrategyResult = {
      strategy: PAYOFF_STRATEGIES[0],
      debts: [],
      totalInterest: 0,
      totalMonths: 0,
      totalPayments: 0,
      monthlyPayment: 0,
      payoffDate: new Date()
    };
    
    return {
      strategies: [emptyResult],
      bestStrategy: emptyResult,
      interestSavings: 0,
      timeSavings: 0,
      cashFlow: cashFlow || {
        monthlyIncome: 0,
        monthlyExpenses: 0,
        availableForDebt: 0,
        emergencyFund: 0,
        targetEmergencyMonths: 3
      }
    };
  }

  const avalancheResults = calculateAvalanche(debts, extraPayment);
  const snowballResults = calculateSnowball(debts, extraPayment);
  const cashFlowResults = calculateCashFlow(debts, extraPayment, cashFlow);

  const createStrategyResult = (strategy: PayoffStrategy, results: DebtResult[]): StrategyResult => {
    const totalInterest = results.reduce((sum, debt) => sum + debt.totalInterest, 0);
    const totalMonths = Math.max(...results.map(debt => debt.monthsToPayoff));
    const totalPayments = results.reduce((sum, debt) => sum + debt.currentPayment, 0);
    const monthlyPayment = results.reduce((sum, debt) => sum + debt.minimumPayment, 0) + extraPayment;
    
    return {
      strategy,
      debts: results,
      totalInterest,
      totalMonths,
      totalPayments,
      monthlyPayment,
      payoffDate: new Date(Date.now() + totalMonths * 30 * 24 * 60 * 60 * 1000)
    };
  };

  const strategies = [
    createStrategyResult(PAYOFF_STRATEGIES[0], avalancheResults),
    createStrategyResult(PAYOFF_STRATEGIES[1], snowballResults),
    createStrategyResult(PAYOFF_STRATEGIES[2], cashFlowResults)
  ];

  const bestStrategy = strategies.reduce((best, current) => 
    current.totalInterest < best.totalInterest ? current : best
  );

  const worstStrategy = strategies.reduce((worst, current) => 
    current.totalInterest > worst.totalInterest ? current : worst
  );

  return {
    strategies,
    bestStrategy,
    interestSavings: worstStrategy.totalInterest - bestStrategy.totalInterest,
    timeSavings: worstStrategy.totalMonths - bestStrategy.totalMonths,
    cashFlow: cashFlow || {
      monthlyIncome: 0,
      monthlyExpenses: 0,
      availableForDebt: 0,
      emergencyFund: 0,
      targetEmergencyMonths: 3
    }
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatMonths(months: number): string {
  if (months === 0) return '0 months';
  if (months >= 999) return 'Never';
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) return `${months} month${months === 1 ? '' : 's'}`;
  if (remainingMonths === 0) return `${years} year${years === 1 ? '' : 's'}`;
  
  return `${years} year${years === 1 ? '' : 's'}, ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
}