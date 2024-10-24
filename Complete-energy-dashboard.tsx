import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart,
  Area, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Clock, Download, Settings, TrendingUp, TrendingDown,
  AlertCircle, Sun, Battery, DollarSign
} from 'lucide-react';

export default function CompleteDashboard() {
  const [timeframe, setTimeframe] = useState('daily');
  const [comparisonMode, setComparisonMode] = useState('lastPeriod');
  const [showPredictions, setShowPredictions] = useState(false);

  // Sample data for all charts
  const consumptionData = [
    { time: '00:00', current: 1.2, previous: 1.4, predicted: 1.3, cost: 4.8, tariff: 4 },
    { time: '04:00', current: 0.8, previous: 0.9, predicted: 0.9, cost: 3.2, tariff: 4 },
    { time: '08:00', current: 2.5, previous: 2.8, predicted: 2.3, cost: 20, tariff: 8 },
    { time: '12:00', current: 3.8, previous: 4.2, predicted: 3.6, cost: 45.6, tariff: 12 },
    { time: '16:00', current: 3.2, previous: 3.5, predicted: 3.4, cost: 38.4, tariff: 12 },
    { time: '20:00', current: 2.8, previous: 3.0, predicted: 2.9, cost: 28, tariff: 10 }
  ];

  const applianceData = [
    { name: 'AC', value: 45, cost: 540 },
    { name: 'Water Heater', value: 20, cost: 240 },
    { name: 'Washing Machine', value: 15, cost: 180 },
    { name: 'Refrigerator', value: 10, cost: 120 },
    { name: 'Others', value: 10, cost: 120 }
  ];

  const carbonData = [
    { month: 'Jan', current: 500, target: 450 },
    { month: 'Feb', current: 480, target: 450 },
    { month: 'Mar', current: 520, target: 450 },
    { month: 'Apr', current: 450, target: 450 },
    { month: 'May', current: 470, target: 450 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Energy Analytics</h1>
            <p className="text-blue-100">Smart insights for efficient energy usage</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg">
              <Download className="h-5 w-5" /> Export
            </button>
            <button className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg">
              <Settings className="h-5 w-5" /> Settings
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
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
          <button
            onClick={() => setShowPredictions(!showPredictions)}
            className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium ${
              showPredictions ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
            }`}
          >
            Show Predictions
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 p-6">
        <QuickStat
          title="Today's Usage"
          value="14.3 kWh"
          change={-12}
          trend="down"
        />
        <QuickStat
          title="Today's Cost"
          value="₹171.60"
          change={8}
          trend="up"
        />
        <QuickStat
          title="Carbon Footprint"
          value="42.5 kg"
          change={-5}
          trend="down"
        />
        <QuickStat
          title="Energy Score"
          value="85/100"
          change={3}
          trend="up"
        />
      </div>

      {/* Main Charts Section */}
      <div className="px-6 space-y-6">
        {/* Consumption Comparison */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Consumption Comparison</CardTitle>
              <div className="flex gap-2">
                {['lastPeriod', 'avgConsumer', 'bestPractice'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setComparisonMode(mode)}
                    className={`px-3 py-1 text-sm rounded ${
                      comparisonMode === mode
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100'
                    }`}
                  >
                    {mode === 'lastPeriod' ? 'vs Last Period' :
                     mode === 'avgConsumer' ? 'vs Avg Consumer' :
                     'vs Best Practice'}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#0088FE"
                    name="Current"
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#82ca9d"
                    name="Previous"
                  />
                  {showPredictions && (
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#ff7300"
                      strokeDasharray="5 5"
                      name="Predicted"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usage and Carbon Footprint */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#0088FE" name="Usage (kWh)" />
                    <Bar dataKey="tariff" fill="#82ca9d" name="Tariff (₹/kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="current"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                      name="Current Footprint"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Target"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rest of the dashboard components... */}
        {/* Note: I'll continue with the remaining sections in the next message */}
      </div>
    </div>
  );
}

// Quick Stat Component
const QuickStat = ({ title, value, change, trend }) => (
  <Card>
    <CardContent className="pt-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className={`text-sm flex items-center mt-1 ${
        trend === 'down' ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend === 'down' ? (
          <TrendingDown className="h-4 w-4 mr-1" />
        ) : (
          <TrendingUp className="h-4 w-4 mr-1" />
        )}
        {Math.abs(change)}% vs. avg
      </div>
    </CardContent>
  </Card>
);
