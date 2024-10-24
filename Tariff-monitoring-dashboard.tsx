import React, { useState } from 'react';
import {
  Clock, AlertCircle, TrendingUp, TrendingDown,
  Sun, Zap, Calendar, ArrowRight, Settings,
  Bell, Battery
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const TariffMonitorDashboard = () => {
  const [viewMode, setViewMode] = useState('today');
  
  // Simulated real-time tariff data
  const tariffData = {
    current: {
      rate: 12,
      period: "Peak",
      time: "14:00-15:00",
      trend: "up",
      nextRate: 10,
      nextPeriod: "Mid-Peak",
      nextTime: "15:00-16:00"
    },
    today: [
      { time: "00:00", rate: 4, forecast: 4, actual: 4, type: "Super Off-Peak" },
      { time: "03:00", rate: 4, forecast: 4, actual: 4, type: "Super Off-Peak" },
      { time: "06:00", rate: 8, forecast: 8, actual: 8, type: "Off-Peak" },
      { time: "09:00", rate: 8, forecast: 8, actual: 8.5, type: "Off-Peak" },
      { time: "12:00", rate: 12, forecast: 12, actual: 12, type: "Peak" },
      { time: "15:00", rate: 10, forecast: 10, type: "Mid-Peak" },
      { time: "18:00", rate: 10, forecast: 10, type: "Mid-Peak" },
      { time: "21:00", rate: 8, forecast: 8, type: "Off-Peak" }
    ],
    tomorrow: [
      { time: "00:00", rate: 4, forecast: 4, type: "Super Off-Peak" },
      { time: "03:00", rate: 4, forecast: 4, type: "Super Off-Peak" },
      { time: "06:00", rate: 8, forecast: 7.5, type: "Off-Peak" },
      { time: "09:00", rate: 8, forecast: 8.2, type: "Off-Peak" },
      { time: "12:00", rate: 12, forecast: 11.5, type: "Peak" },
      { time: "15:00", rate: 10, forecast: 9.8, type: "Mid-Peak" },
      { time: "18:00", rate: 10, forecast: 10.2, type: "Mid-Peak" },
      { time: "21:00", rate: 8, forecast: 8, type: "Off-Peak" }
    ]
  };

  // Optimization recommendations based on tariff
  const optimizationTips = [
    {
      type: "Immediate Action",
      tip: "High tariff period starting in 30 mins. Consider postponing washing machine use.",
      saving: "₹45",
      icon: Clock
    },
    {
      type: "Schedule Suggestion",
      tip: "Lowest rates between 2 AM - 5 AM tomorrow. Schedule EV charging.",
      saving: "₹120",
      icon: Calendar
    },
    {
      type: "Solar Integration",
      tip: "High solar production expected during next peak rate. Use appliances then.",
      saving: "₹80",
      icon: Sun
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Tariff Monitor</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <Settings className="h-5 w-5" />
          </div>
        </div>

        {/* Current Rate Display */}
        <div className="bg-blue-500 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm opacity-80">Current Rate</div>
              <div className="text-3xl font-bold">₹{tariffData.current.rate}/kWh</div>
              <div className="text-sm mt-1">{tariffData.current.period} Period</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Next Rate</div>
              <div className="text-xl font-bold">₹{tariffData.current.nextRate}/kWh</div>
              <div className="text-sm mt-1">{tariffData.current.nextTime}</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-400">
            <div className="flex justify-between text-sm">
              <span>Time Remaining</span>
              <span className="font-semibold">45 mins</span>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          {['today', 'tomorrow', 'week'].map((period) => (
            <button
              key={period}
              onClick={() => setViewMode(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === period 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Rate Chart */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Rate Forecast</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={viewMode === 'today' ? tariffData.today : tariffData.tomorrow}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" fontSize={12} />
              <YAxis domain={[0, 15]} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="forecast" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                name="Forecast Rate"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
                name="Actual Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Period Breakdown */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Today's Rate Periods</h2>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="font-medium">Peak</span>
              </div>
              <span className="text-red-600 font-bold">₹12/kWh</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>12:00 - 18:00</span>
              <span>6 hours</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="font-medium">Mid-Peak</span>
              </div>
              <span className="text-yellow-600 font-bold">₹10/kWh</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>18:00 - 23:00</span>
              <span>5 hours</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Off-Peak</span>
              </div>
              <span className="text-green-600 font-bold">₹8/kWh</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>23:00 - 00:00, 06:00 - 12:00</span>
              <span>7 hours</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
                <span className="font-medium">Super Off-Peak</span>
              </div>
              <span className="text-green-700 font-bold">₹4/kWh</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>00:00 - 06:00</span>
              <span>6 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Smart Recommendations</h2>
        <div className="space-y-3">
          {optimizationTips.map((tip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <tip.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-blue-800">{tip.type}</h3>
                    <span className="text-green-600 font-bold">{tip.saving}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-blue-600">
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
            <Battery className="h-6 w-6" />
            <span className="text-xs mt-1">Storage</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Schedule</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TariffMonitorDashboard;
