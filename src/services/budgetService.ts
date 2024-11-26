import { UserPreferences, BudgetData, BudgetCategory } from '../types';

const API_URL = 'https://message-tailor-api-production.up.railway.app/api/generate';

interface APIBudgetCategory {
  amount: number;
  percentage: number;
  recommendations: string[];
}

interface APIResponse {
  monthly_budget: {
    [key: string]: APIBudgetCategory;
  };
  total_budget: {
    amount: number;
    percentage: number;
  };
}

export async function generateBudgetPlan(preferences: UserPreferences): Promise<BudgetData> {
  try {
    const prompt = `Generate a monthly budget breakdown in the following strict JSON format:
{
  "monthly_budget": {
    "housing": {
      "amount": number,
      "percentage": number,
      "recommendations": [string]
    },
    "food": {
      "amount": number,
      "percentage": number,
      "recommendations": [string]
    },
    "transportation": {
      "amount": number,
      "percentage": number,
      "recommendations": [string]
    },
    // ... other categories following the same structure
  },
  "total_budget": {
    "amount": number,
    "percentage": 100
  }
}

Use these preferences to generate the budget:
- Location: ${preferences.city}
- Dining out ${preferences.diningOutFrequency} times per week
- Gift giving ${preferences.giftGivingFrequency} times per month
- ${preferences.hasCar ? `Has a car (refueling ${preferences.refuelingFrequency} times per month)` : 'No car'}
- Travel ${preferences.travelFrequency} times per year
- ${preferences.gymMembership ? 'Has' : 'No'} gym membership
- ${preferences.streamingServices ? 'Has' : 'No'} streaming services
- Target savings: ${preferences.targetSavings}% of income

Required categories: housing, food, transportation, entertainment, savings (at least ${preferences.targetSavings}%), utilities
Optional categories: dining_out, gifts, gym, streaming, travel
All numerical values should be realistic for ${preferences.city}.
Each category must include 2-3 practical money-saving recommendations.`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI recommendation');
    }

    const data = await response.json();
    const aiResponse = data.replace(/^```json|```$/g, '').trim();
    
    // Validate JSON structure
    const parsedResponse = validateAPIResponse(JSON.parse(aiResponse));
    
    // Transform the API response into our BudgetData format
    const categories: BudgetCategory[] = Object.entries(parsedResponse.monthly_budget).map(([name, data]) => ({
      name: formatCategoryName(name),
      amount: data.amount,
      percentage: data.percentage,
      recommendations: data.recommendations
    }));

    return {
      categories,
      totalBudget: parsedResponse.total_budget.amount
    };
  } catch (error) {
    console.error('Budget generation error:', error);
    throw new Error('Failed to generate budget plan. Please try again.');
  }
}

function formatCategoryName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function validateAPIResponse(data: any): APIResponse {
  if (!data.monthly_budget || !data.total_budget) {
    throw new Error('Invalid API response: missing required sections');
  }

  if (typeof data.total_budget.amount !== 'number' || 
      typeof data.total_budget.percentage !== 'number' || 
      data.total_budget.percentage !== 100) {
    throw new Error('Invalid API response: invalid total budget format');
  }

  Object.entries(data.monthly_budget).forEach(([category, value]: [string, any]) => {
    if (!value.amount || !value.percentage || !Array.isArray(value.recommendations)) {
      throw new Error(`Invalid API response: invalid category format for ${category}`);
    }
  });

  return data as APIResponse;
}