import React, { useState } from 'react';
import { BudgetData } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface BudgetDashboardProps {
  budgetData: BudgetData;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  // Increase the radius multiplier to push labels further out
  const radius = outerRadius * 1.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Add padding to prevent text from being cut off
  const padding = 20;
  const adjustedX = x > cx ? Math.min(x + padding, cx + 300) : Math.max(x - padding, cx - 300);

  return (
    <text
      x={adjustedX}
      y={y}
      fill="#374151"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs md:text-sm font-medium"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function BudgetDashboard({ budgetData }: BudgetDashboardProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-[95vw]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Personalized Budget</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-[600px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData.categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                labelLine={true}
                label={renderCustomizedLabel}
              >
                {budgetData.categories.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Budget Breakdown</h3>
            <div className="space-y-3">
              {budgetData.categories.map((category, index) => (
                <div key={category.name} className="rounded-lg border border-gray-200">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ${category.amount.toLocaleString()}
                      </span>
                      {expandedCategory === category.name ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {expandedCategory === category.name && category.recommendations && (
                    <div className="px-4 py-3 bg-blue-50 border-t border-gray-200 rounded-b-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-800">Recommendations</span>
                      </div>
                      <ul className="space-y-2">
                        {category.recommendations.map((recommendation, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center px-4">
                  <span className="text-sm font-bold text-gray-800">Total Budget</span>
                  <span className="text-sm font-bold text-gray-900">
                    ${budgetData.totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}