import React from 'react';
import { BudgetData } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Lightbulb } from 'lucide-react';

interface BudgetDashboardProps {
  budgetData: BudgetData;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

export default function BudgetDashboard({ budgetData }: BudgetDashboardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Personalized Budget</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData.categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {budgetData.categories.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Budget Breakdown</h3>
            <div className="space-y-3">
              {budgetData.categories.map((category, index) => (
                <div key={category.name} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${category.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-800">Total</span>
                  <span className="text-sm font-bold text-gray-900">
                    ${budgetData.totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">Recommendations</h3>
            </div>
            <ul className="space-y-2">
              {budgetData.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}