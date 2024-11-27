import { APIResponse } from '../types';

const validateTotalBudget = (totalBudget: any) => {
  if (!totalBudget?.amount || typeof totalBudget.amount !== 'number' ||
      !totalBudget?.percentage || totalBudget.percentage !== 100) {
    throw new Error('Invalid total budget format');
  }
};

const validateCategory = (category: any, name: string) => {
  if (!category?.amount || typeof category.amount !== 'number' ||
      !category?.percentage || typeof category.percentage !== 'number' ||
      !Array.isArray(category?.recommendations)) {
    throw new Error(`Invalid category format: ${name}`);
  }
};

export function validateAPIResponse(data: any): APIResponse {
  if (!data?.monthly_budget || !data?.total_budget) {
    throw new Error('Missing required sections');
  }

  validateTotalBudget(data.total_budget);
  
  Object.entries(data.monthly_budget).forEach(([name, category]) => {
    validateCategory(category, name);
  });

  return data as APIResponse;
}