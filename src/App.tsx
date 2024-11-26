import React, { useState } from 'react';
import { UserPreferences, BudgetData } from './types';
import PreferencesForm from './components/PreferencesForm';
import BudgetDashboard from './components/BudgetDashboard';
import ErrorMessage from './components/ErrorMessage';
import { Brain } from 'lucide-react';
import { generateBudgetPlan } from './services/budgetService';

const initialPreferences: UserPreferences = {
  diningOutFrequency: 2,
  giftGivingFrequency: 1,
  refuelingFrequency: 4,
  gymMembership: false,
  streamingServices: false,
  travelFrequency: 2,
  city: '',
  hasCar: false,
  targetSavings: 20,
};

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBudget = async () => {
    if (!preferences.city) {
      setError('Please enter your city');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await generateBudgetPlan(preferences);
      setBudgetData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate budget plan');
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
          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={() => setError(null)} 
            />
          )}

          <PreferencesForm
            preferences={preferences}
            onPreferencesChange={setPreferences}
            onSubmit={handleGenerateBudget}
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