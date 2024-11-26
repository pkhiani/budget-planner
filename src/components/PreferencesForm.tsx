import React from 'react';
import { UserPreferences } from '../types';
import { MapPin } from 'lucide-react';

interface PreferencesFormProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onSubmit: () => void;
}

export default function PreferencesForm({ preferences, onPreferencesChange, onSubmit }: PreferencesFormProps) {
  const handleChange = (field: keyof UserPreferences, value: any) => {
    onPreferencesChange({ ...preferences, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Design Your Lifestyle</h2>
      
      <div className="space-y-6">
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <label className="block text-sm font-medium text-gray-700">Your City</label>
          </div>
          <input
            type="text"
            value={preferences.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your city"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dining Out (times per week)
            </label>
            <input
              type="number"
              min="0"
              value={preferences.diningOutFrequency}
              onChange={(e) => handleChange('diningOutFrequency', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gift Giving (times per month)
            </label>
            <input
              type="number"
              min="0"
              value={preferences.giftGivingFrequency}
              onChange={(e) => handleChange('giftGivingFrequency', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refueling (times per month)
            </label>
            <input
              type="number"
              min="0"
              value={preferences.refuelingFrequency}
              onChange={(e) => handleChange('refuelingFrequency', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel (times per year)
            </label>
            <input
              type="number"
              min="0"
              value={preferences.travelFrequency}
              onChange={(e) => handleChange('travelFrequency', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.gymMembership}
              onChange={(e) => handleChange('gymMembership', e.target.checked)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Gym Membership</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.streamingServices}
              onChange={(e) => handleChange('streamingServices', e.target.checked)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Streaming Services</span>
          </label>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Generate Budget Plan
        </button>
      </div>
    </div>
  );
}