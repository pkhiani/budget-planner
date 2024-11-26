export interface UserPreferences {
  diningOutFrequency: number;
  giftGivingFrequency: number;
  refuelingFrequency: number;
  gymMembership: boolean;
  streamingServices: boolean;
  travelFrequency: number;
  city: string;
  hasCar: boolean;
  targetSavings: number;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  recommendations: string[];
}

export interface BudgetData {
  categories: BudgetCategory[];
  totalBudget: number;
}