import React, { useState } from 'react';
import {
  Sun, Cloud, CloudRain, Wind, Thermometer,
  Clock, Battery, Zap, AlertCircle, Settings,
  Calendar, TrendingUp, TrendingDown, Home
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ForecastDashboard = () => {
  const [forecastPeriod, setForecastPeriod] = useState('24h');
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Weather and consumption forecast data
  const forecastData = {
    "24h": [
      { 
        time: "00:00", 
        consumption: 2.1, 
        predicted: 2.3,
        solar: 0,
        temperature: 22,
        weather: "Clear",
        tariff: 4
      },
      { 
        time: "06:00", 
        consumption: 1.8, 
        predicted: 1.9,
        solar: 0.5,
        temperature: 24,
        weather: "Sunny",
        tariff: 8
      },
      { 
        time: "12:00", 
        consumption: 3.5, 
        predicted: 3.8,
        solar: 2.8,
        temperature: 28,
        weather: "Sunny",
        tariff: 12
      },
      { 
        time: "18:00", 
        consumption: 4.2, 
        predicted: 4.0,
        solar: 0.3,
        temperature: 26,
        weather: "Cloudy",
        tariff: 10
      }
    ]
  };

  // ML-based insights
  const predictiveInsights = [
    {
      type: "Peak Load Alert",
      prediction: "High consumption expected tomorrow 2-5 PM",
      impact: "₹180 additional cost",
      recommendation: "Pre-cool your home during solar peak hours",
      confidence: 92,
      savings: "₹125",
      icon: TrendingUp
    },
    {
      type: "Solar Opportunity",
      prediction: "Optimal solar production 11 AM-3 PM tomorrow",
      impact: "4.5 kWh potential generation",
      recommendation: "Schedule high-power appliances during this window",
      confidence: 88,
      savings: "₹95",
      icon: Sun
    },
    {
      type: "Weather Impact",
      prediction: "Cloudy weather expected in afternoon",
      impact: "30% reduced solar production",
      recommendation: "Shift EV charging to early morning off-peak hours",
      confidence: 85,
      savings: "₹75",
      icon: Cloud
    }
  ];

  // Appliance scheduling recommendations
  const scheduleRecommendations = [
    {
      appliance: "Air Conditioner",
      currentTime: "2:00 PM - 5:00 PM",
      recommendedTime: "11:00 AM - 2:00 PM",
      reason: "Solar peak production & lower tariff",
      savings: "₹85",
      priority: "High"
    },
    {
      appliance: "EV Charger",
      currentTime: "6:00 PM - 10:00 PM",
      recommendedTime: "1:00 AM - 5:00 AM",
      reason: "Super off-peak tariff period",
      savings: "₹120",
      priority: "Medium"
    },
    {
      appliance: "Washing Machine",
      currentTime: "7:00 PM",
      recommendedTime: "2:00 PM",
      reason: "High solar production expected",
      savings: "₹45",
      priority: "Low"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Smart Forecast</h1>
          <Settings className="h-5 w-5" />
        </div>

        {/* Forecast Period Selector */}
        <div className="flex gap-2">
          {['24h', '48h', '7d'].map((period) => (
            <button
              key={period}
              onClick={() => setForecastPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                forecastPeriod === period 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Weather Forecast Banner */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-80">Today's Forecast</div>
            <div className="text-2xl font-bold">28°C | Sunny</div>
            <div className="text-sm mt-1">Perfect for solar production</div>
          </div>
          <Sun className="h-12 w-12" />
        </div>
      </div>

      {/* Consumption Forecast */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Consumption & Generation Forecast</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={forecastData["24h"]}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.1}
                name="Predicted Consumption"
              />
              <Area
                type="monotone"
                dataKey="solar"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.1}
                name="Solar Production"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ML Insights */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Smart Insights</h2>
        <div className="space-y-3">
          {predictiveInsights.map((insight, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.type.includes('Alert') ? 'bg-red-50' :
                  insight.type.includes('Solar') ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <insight.icon className={`h-5 w-5 ${
                    insight.type.includes('Alert') ? 'text-red-600' :
                    insight.type.includes('Solar') ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{insight.type}</h3>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{insight.savings}</div>
                      <div className="text-xs text-gray-500">potential savings</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{insight.prediction}</p>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-gray-500">Confidence: {insight.confidence}%</span>
                    <span className="text-blue-600 font-medium">View Details →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduling Recommendations */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Smart Scheduling</h2>
        <div className="space-y-3">
          {scheduleRecommendations.map((rec, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{rec.appliance}</h3>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} Priority
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-bold">{rec.savings}</div>
                  <div className="text-xs text-gray-600">potential savings</div>
                </div>
              </div>
              
              <div className="space-y-2 mt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Time:</span>
                  <span className="font-medium">{rec.currentTime}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Recommended:</span>
                  <span className="font-medium">{rec.recommendedTime}</span>
                </div>
                <div className="text-xs text-gray-600">{rec.reason}</div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                  Schedule
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Tip */}
      <div className="mx-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Energy Saving Tip</h4>
              <p className="text-sm text-gray-600">
                Based on tomorrow's weather forecast and tariff rates, you could save ₹125 
                by pre-cooling your home during solar peak hours (11 AM - 2 PM) instead of 
                peak tariff period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastDashboard;
