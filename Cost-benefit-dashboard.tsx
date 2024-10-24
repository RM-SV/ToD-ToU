import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, Calendar,
  Sun, Battery, Clock, AlertCircle, ArrowRight,
  Settings, Download, Filter, Activity
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

const CostBenefitDashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [selectedMetric, setSelectedMetric] = useState('monetary');

  // Sample savings data
  const savingsData = {
    total: {
      monetary: "₹12,450",
      percentage: "32%",
      trend: "up",
      comparedTo: "last month"
    },
    bySource: [
      { source: "ToD Shifting", amount: 5200, percentage: 41.8 },
      { source: "Solar Usage", amount: 4800, percentage: 38.6 },
      { source: "Battery Storage", amount: 2450, percentage: 19.6 }
    ],
    historical: [
      { month: "Jun", shifted: 4200, solar: 3800, battery: 1800, potential: 12000 },
      { month: "Jul", shifted: 4800, solar: 4200, battery: 2100, potential: 12500 },
      { month: "Aug", shifted: 5200, solar: 4800, battery: 2450, potential: 13000 }
    ]
  };

  // Performance metrics
  const performanceMetrics = {
    todOptimization: {
      score: 85,
      trend: "up",
      previousScore: 78,
      insights: [
        { period: "Peak", reduction: "35%", saving: "₹2,450" },
        { period: "Mid-Peak", reduction: "25%", saving: "₹1,850" },
        { period: "Off-Peak", increase: "45%", saving: "₹900" }
      ]
    },
    solarUtilization: {
      score: 92,
      trend: "up",
      previousScore: 88,
      metrics: {
        selfConsumption: "75%",
        peakOffset: "65%",
        export: "15%"
      }
    }
  };

  // Optimization opportunities
  const optimizationOpportunities = [
    {
      category: "Peak Hour Shifting",
      currentCost: 7500,
      potentialSaving: 2625,
      implemented: 1800,
      actions: [
        { appliance: "AC", potential: "₹850", difficulty: "Medium" },
        { appliance: "Water Heater", potential: "₹425", difficulty: "Easy" },
        { appliance: "Washing Machine", potential: "₹350", difficulty: "Easy" }
      ]
    },
    {
      category: "Solar Integration",
      currentCost: 6800,
      potentialSaving: 4420,
      implemented: 3200,
      actions: [
        { appliance: "EV Charging", potential: "₹720", difficulty: "Medium" },
        { appliance: "Pool Pump", potential: "₹500", difficulty: "Easy" }
      ]
    }
  ];

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Cost & Savings Analysis</h1>
          <div className="flex gap-2">
            <Download className="h-5 w-5" />
            <Settings className="h-5 w-5" />
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-500 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm opacity-80">Total Savings</div>
              <div className="text-3xl font-bold">{savingsData.total.monetary}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">{savingsData.total.percentage} vs {savingsData.total.comparedTo}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Optimization Score</div>
              <div className="text-2xl font-bold">{performanceMetrics.todOptimization.score}/100</div>
              <div className="flex items-center justify-end mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+7 points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['weekly', 'monthly', 'yearly'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === period 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Savings Breakdown */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Savings Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {savingsData.bySource.map((source, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600">{source.source}</div>
                <div className="text-lg font-bold text-blue-600">₹{source.amount}</div>
                <div className="text-xs text-gray-500">{source.percentage}%</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={savingsData.historical}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="shifted" stackId="a" fill="#0088FE" name="ToD Shifting" />
              <Bar dataKey="solar" stackId="a" fill="#00C49F" name="Solar Usage" />
              <Bar dataKey="battery" stackId="a" fill="#FFBB28" name="Battery Storage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-4">ToD Performance</h2>
          <div className="space-y-4">
            {performanceMetrics.todOptimization.insights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{insight.period}</div>
                    <div className="text-sm text-gray-600">
                      {insight.reduction ? `${insight.reduction} reduction` : `${insight.increase} increase`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{insight.saving}</div>
                  <div className="text-xs text-gray-500">saved</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solar Integration */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Solar Performance</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Self-Consumption</div>
              <div className="text-lg font-bold text-yellow-500">
                {performanceMetrics.solarUtilization.metrics.selfConsumption}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Peak Offset</div>
              <div className="text-lg font-bold text-green-500">
                {performanceMetrics.solarUtilization.metrics.peakOffset}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Export</div>
              <div className="text-lg font-bold text-blue-500">
                {performanceMetrics.solarUtilization.metrics.export}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Optimization Opportunities</h2>
        <div className="space-y-4">
          {optimizationOpportunities.map((opportunity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-blue-800">{opportunity.category}</h3>
                <div className="text-right">
                  <div className="text-green-600 font-bold">₹{opportunity.potentialSaving}</div>
                  <div className="text-xs text-gray-600">potential savings</div>
                </div>
              </div>
              <div className="space-y-2">
                {opportunity.actions.map((action, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs ${
                        action.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {action.difficulty}
                      </div>
                      <span>{action.appliance}</span>
                    </div>
                    <span className="font-medium">{action.potential}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ 
                    width: `${(opportunity.implemented / opportunity.potentialSaving) * 100}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Implemented: ₹{opportunity.implemented}</span>
                <span>Potential: ₹{opportunity.potentialSaving}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Tips */}
      <div className="mx-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Next Best Action</h4>
              <p className="text-sm text-gray-600">
                Shifting your washing machine usage to off-peak hours could save you ₹350 next month. 
                Schedule it between 11 PM - 5 AM for maximum savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBenefitDashboard;
