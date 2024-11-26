export interface UserPreferences {
  diningOutFrequency: number;
  giftGivingFrequency: number;
  refuelingFrequency: number;
  gymMembership: boolean;
  streamingServices: boolean;
  travelFrequency: number;
  city: string;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
}

export interface BudgetData {
  categories: BudgetCategory[];
  totalBudget: number;
  recommendations: string[];
}