# Smart Debt Payoff Calculator

A comprehensive debt payoff calculator built with Astro, TypeScript, and Tailwind CSS. Compare multiple debt elimination strategies to find the fastest and most cost-effective path to becoming debt-free.

## Features

### 🎯 Multiple Payoff Strategies
- **Debt Avalanche**: Pay minimums on all debts, put extra money toward highest interest rate first
- **Debt Snowball**: Pay minimums on all debts, put extra money toward smallest balance first  
- **Cash Flow Optimized**: A unique strategy that considers your entire financial picture, balancing debt payoff with financial stability

### 💰 Comprehensive Cash Flow Analysis
- Monthly income and expense tracking
- Emergency fund analysis
- Debt-to-income ratio calculation
- Financial health scoring
- Available cash flow for debt payments

### 📊 Detailed Comparisons
- Side-by-side strategy comparison
- Total interest savings calculations
- Time savings analysis
- Payment priority visualization
- Personalized recommendations

### 🚀 User-Friendly Features
- Responsive design for all devices
- Sample data loading for quick testing
- Real-time calculations
- Interactive debt management
- Clear visual indicators for optimal strategies

## Technologies Used

- **Astro**: Modern static site generator for optimal performance
- **TypeScript**: Type-safe development with excellent DX
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-first approach for all screen sizes

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Add Your Debts**: Enter each debt with its current balance, interest rate, and minimum payment
2. **Enter Cash Flow Information**: Provide your monthly income, expenses, and emergency fund details
3. **Set Extra Payment**: Specify how much extra you can put toward debt each month
4. **Calculate**: Click "Calculate Payoff Plans" to see all strategy comparisons
5. **Review Results**: Compare strategies and follow the personalized recommendation

### Sample Data
Click "Load Sample Data" to populate the form with realistic debt scenarios for testing and exploration.

## Key Differentiators

### Cash Flow Strategy
Unlike traditional calculators that only consider debt balances and interest rates, our **Cash Flow Optimized** strategy:
- Considers your available monthly cash flow
- Ensures emergency fund adequacy
- Balances debt payoff speed with financial stability
- Provides a realistic approach to debt elimination

### Comprehensive Analysis
- **Financial Health Score**: Get a comprehensive view of your financial situation
- **Emergency Fund Analysis**: Understand if you're prepared for unexpected expenses
- **Debt-to-Income Tracking**: Monitor this critical financial ratio
- **Available Cash Flow**: See exactly how much you can allocate to debt payments

## Project Structure

```
src/
├── components/          # Astro components
│   ├── DebtForm.astro  # Debt input and cash flow form
│   └── ResultsDisplay.astro # Strategy comparison display
├── layouts/            # Page layouts
│   └── Layout.astro   # Main layout template
├── pages/             # Astro pages
│   └── index.astro   # Main calculator page
├── types/            # TypeScript type definitions
│   └── debt.ts      # Debt-related interfaces
├── utils/           # Utility functions
│   └── debtCalculations.ts # Core calculation algorithms
└── styles/         # Global styles
    └── global.css # Tailwind imports and custom styles
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
