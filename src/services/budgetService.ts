import { UserPreferences, BudgetData, BudgetCategory } from '../types';
import { generateAIResponse } from './openai';
import { buildBudgetPrompt } from './promptBuilder';
import { validateAPIResponse } from './responseValidator';
import { formatCategoryName } from '../utils/formatters';

export async function generateBudgetPlan(preferences: UserPreferences): Promise<BudgetData> {
  try {
    const prompt = buildBudgetPrompt(preferences);
    const aiResponse = await generateAIResponse(prompt);
    
    if (!aiResponse) {
      throw new Error('No response received from AI');
    }
    
    const parsedResponse = validateAPIResponse(JSON.parse(aiResponse));
    
    const categories: BudgetCategory[] = Object.entries(parsedResponse.monthly_budget)
      .map(([name, data]) => ({
        name: formatCategoryName(name),
        amount: data.amount,
        percentage: data.percentage,
        recommendations: data.recommendations
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return {
      categories,
      totalBudget: parsedResponse.total_budget.amount
    };
  } catch (error) {
    console.error('Budget generation error:', error);
    throw new Error('Failed to generate budget plan. Please try again.');
  }
}