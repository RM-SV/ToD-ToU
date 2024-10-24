import React, { useState } from 'react';
import { 
  Sun, Battery, Zap, Home, Cloud, 
  TrendingUp, DollarSign, Settings,
  ArrowUpRight, ArrowDownRight, Power
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const SolarEnergyDashboard = () => {
  // Sample data for solar production
  const solarData = [
    { time: '6:00', production: 0.2, consumption: 0.8, battery: 60 },
    { time: '8:00', production: 1.5, consumption: 1.2, battery: 65 },
    { time: '10:00', production: 2.8, consumption: 1.5, battery: 75 },
    { time: '12:00', production: 3.5, consumption: 1.8, battery: 85 },
    { time: '14:00', production: 3.2, consumption: 2.1, battery: 90 },
    { time: '16:00', production: 2.4, consumption: 1.9, battery: 85 },
    { time: '18:00', production: 1.2, consumption: 2.2, battery: 75 },
    { time: '20:00', production: 0.3, consumption: 2.5, battery: 65 }
  ];

  // Current tariff periods
  const tariffPeriods = [
    { time: "00:00-06:00", rate: "₹4/kWh", label: "Super Off-Peak" },
    { time: "06:00-12:00", rate: "₹8/kWh", label: "Off-Peak" },
    { time: "12:00-18:00", rate: "₹12/kWh", label: "Peak" },
    { time: "18:00-24:00", rate: "₹10/kWh", label: "Mid-Peak" }
  ];

  const [batteryMode, setBatteryMode] = useState('auto'); // auto, charge, discharge

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Top Status Bar */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Solar Management</h1>
          <Settings className="h-5 w-5" />
        </div>
      </div>

      {/* Current Status Panel */}
      <div className="bg-white p-4 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Sun className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">Producing</span>
            </div>
            <div className="text-xl font-bold text-green-600">3.2 kW</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Home className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">Using</span>
            </div>
            <div className="text-xl font-bold text-blue-600">2.1 kW</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Battery className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-sm text-gray-600">Battery</span>
            </div>
            <div className="text-xl font-bold text-green-600">85%</div>
          </div>
        </div>
      </div>

      {/* Smart Battery Control */}
      <div className="p-4 bg-blue-50 mx-4 mt-4 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center">
          <Battery className="h-5 w-5 mr-2 text-blue-600" />
          Smart Battery Management
        </h3>
        <div className="flex justify-between gap-2 mb-4">
          <button
            onClick={() => setBatteryMode('auto')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
              batteryMode === 'auto' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
          >
            Auto Optimize
          </button>
          <button
            onClick={() => setBatteryMode('charge')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
              batteryMode === 'charge' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
          >
            Force Charge
          </button>
          <button
            onClick={() => setBatteryMode('discharge')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
              batteryMode === 'discharge' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
          >
            Force Discharge
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {batteryMode === 'auto' && "Optimizing battery usage based on tariff rates"}
          {batteryMode === 'charge' && "Charging battery with excess solar production"}
          {batteryMode === 'discharge' && "Using battery power to reduce grid consumption"}
        </div>
      </div>

      {/* Today's Energy Flow */}
      <div className="p-4">
        <h3 className="font-semibold mb-3">Today's Energy Flow</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="#22C55E" 
                fill="#22C55E" 
                fillOpacity={0.2} 
                name="Solar Production"
              />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.2} 
                name="Consumption"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="p-4">
        <h3 className="font-semibold mb-3">Smart Recommendations</h3>
        <div className="space-y-3">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">Peak Production Period</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Solar production peak expected between 11 AM - 2 PM. Consider running high-power appliances during this time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Tariff Optimization</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Peak tariff period (₹12/kWh) starts at 12 PM. Battery will automatically discharge to minimize grid consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battery Level History */}
      <div className="p-4">
        <h3 className="font-semibold mb-3">Battery Level History</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="battery" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Battery Level %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Savings */}
      <div className="mx-4 mb-4 bg-green-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm text-gray-600">Today's Savings</h4>
            <div className="text-2xl font-bold text-green-600">₹245.50</div>
          </div>
          <div className="text-right">
            <h4 className="text-sm text-gray-600">Grid Power Avoided</h4>
            <div className="text-2xl font-bold text-green-600">18.5 kWh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarEnergyDashboard;
