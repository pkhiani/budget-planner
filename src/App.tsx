import React, { useState } from 'react';
import { UserPreferences, BudgetData } from './types';
import PreferencesForm from './components/PreferencesForm';
import BudgetDashboard from './components/BudgetDashboard';
import { Brain } from 'lucide-react';
import axios from 'axios';

const initialPreferences: UserPreferences = {
  diningOutFrequency: 2,
  giftGivingFrequency: 1,
  refuelingFrequency: 4,
  gymMembership: false,
  streamingServices: false,
  travelFrequency: 2,
  city: '',
};

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(false);

  const generateBudget = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://message-tailor-api-production.up.railway.app/api/generate', {
        prompt: `Generate a monthly budget breakdown based on these preferences:
          - Location: ${preferences.city}
          - Dining out ${preferences.diningOutFrequency} times per week
          - Gift giving ${preferences.giftGivingFrequency} times per month
          - Refueling ${preferences.refuelingFrequency} times per month
          - Travel ${preferences.travelFrequency} times per year
          - ${preferences.gymMembership ? 'Has' : 'No'} gym membership
          - ${preferences.streamingServices ? 'Has' : 'No'} streaming services
          Please provide a JSON response with categories (housing, food, transportation, entertainment, etc.), 
          their monthly amounts, percentages, and money-saving recommendations.`
      });

      // Parse the AI response and structure it
      const aiResponse = JSON.parse(response.data.choices[0].text);
      setBudgetData({
        categories: aiResponse.categories || [],
        totalBudget: aiResponse.totalBudget || 0,
        recommendations: aiResponse.recommendations || []
      });
    } catch (error) {
      console.error('Error generating budget:', error);
      // In a production app, we'd show a proper error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">AI Budget Planner</h1>
          </div>
          <p className="text-lg text-gray-600">Design your ideal lifestyle with smart financial planning</p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <PreferencesForm
            preferences={preferences}
            onPreferencesChange={setPreferences}
            onSubmit={generateBudget}
          />

          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Generating your personalized budget...</span>
            </div>
          )}

          {budgetData && !loading && <BudgetDashboard budgetData={budgetData} />}
        </div>
      </div>
    </div>
  );
}

export default App;