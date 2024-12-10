import { UserPreferences } from '../types';

const BUDGET_JSON_SCHEMA = `{
  "monthly_budget": {
    "category_name": {
      "amount": number,
      "percentage": number,
      "recommendations": string[]
    }
  },
  "total_budget": {
    "amount": number,
    "percentage": 100
  }
}`;

const REQUIRED_CATEGORIES = [
  'housing',
  'food',
  'transportation',
  'entertainment',
  'savings',
  'utilities'
];

const OPTIONAL_CATEGORIES = [
  'dining_out',
  'gifts',
  'gym',
  'streaming',
  'travel'
];

export function buildBudgetPrompt(preferences: UserPreferences): string {
  const userPrefs = [
    `Location: ${preferences.city}`,
    `Dining out ${preferences.diningOutFrequency} times per week`,
    `Gift giving ${preferences.giftGivingFrequency} times per month`,
    preferences.hasCar ? `Has a car (refueling ${preferences.refuelingFrequency} times per month)` : 'No car',
    `Travel ${preferences.travelFrequency} times per year`,
    `${preferences.gymMembership ? 'Has' : 'No'} gym membership`,
    `${preferences.streamingServices ? 'Has' : 'No'} streaming services`,
    `Target savings: ${preferences.targetSavings}% of income`
  ].join('\\n');

  return `Generate a monthly budget breakdown following this JSON schema:
${BUDGET_JSON_SCHEMA}

User preferences:
${userPrefs}

Required categories: ${REQUIRED_CATEGORIES.join(', ')}
Optional categories (include if relevant): ${OPTIONAL_CATEGORIES.join(', ')}

Notes:
- Savings must be at least ${preferences.targetSavings}%
- All amounts should be realistic for ${preferences.city}
- Include 2-3 practical money-saving recommendations per category`;
}