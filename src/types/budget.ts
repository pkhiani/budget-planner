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
  
  export interface APIBudgetCategory {
    amount: number;
    percentage: number;
    recommendations: string[];
  }
  
  export interface APIResponse {
    monthly_budget: Record<string, APIBudgetCategory>;
    total_budget: {
      amount: number;
      percentage: number;
    };
  }