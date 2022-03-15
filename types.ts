interface Transaction {
  // generated
  id: number;
  commission: number;
  commissioned_amount_eur: number;
  // sent by client
  date: Date;
  amount: number;
  currency: number;
  client_id: number;
}

interface Client {
  id: number;
  discountedTransactionPrice?: number;
}

interface TransactionDto {
  date: Date;
  amount: number;
  currency: number;
  client_id: number;
}

interface CommissionDto {
  amount: number;
  currency: string;
}

const defaultTransactionPrice = {
  minAmount: 0.05,
  percentage: 0.5,
};

// amount in euros
const getTransactionCommission = (amountEUR: number, clientId: number): void => {
  const percentage = (number: number, percentage: number) => (number / 100) * percentage;

  // Rule #1: Default pricing
  // By default the price for every transaction is 0.5% but not less than 0.05€.
  const getDefaultCommission = () => {
    // calculate 0.5% of the amountEUR
    // if 0.5% is smaller than 0.05€
    // true: return 0.05€ commission
    // false: return calculated commission
  };

  // Rule #2: Client with a discount
  // Transaction price for the client with ID of 42 is 0.05€ (unless other rules set lower commission).
  const getClientCommissionDiscount = () => {
    // find client in the database
    // if client has a discount
    // true: return that amount
    // false: return null
  };

  // Rule #3: High turnover discount
  // Client after reaching transaction turnover of 1000.00€ (per month) gets a discount and transaction commission is 0.03€ for the following transactions.
  const getTurnoverCommissionDiscount = () => {
    // find all client transactions in the current month
    // if sum of transactions exceeds 1000€
    // true: return 0.03€
    // false: return null
  };

  const commissions = [getDefaultCommission(), getClientCommissionDiscount(), getTurnoverCommissionDiscount()] as const;

  // reduce comissions array to keep only the smallest amount
  // return the smallest amount
};
