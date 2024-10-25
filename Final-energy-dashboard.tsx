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

export default function EnergyDashboard() {
  const [timeframe, setTimeframe] = useState('daily');
  const [comparisonMode, setComparisonMode] = useState('lastPeriod');
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const applianceData = [
    { 
      name: 'AC', 
      value: 45, 
      cost: 540,
      efficiency: 'B',
      peakUsage: '2-6 PM',
      maintenance: 'Due in 15 days',
      carbonFootprint: 225
    },
    { 
      name: 'Water Heater', 
      value: 20, 
      cost: 240,
      efficiency: 'A',
      peakUsage: '6-8 AM',
      maintenance: 'OK',
      carbonFootprint: 100
    },
    { 
      name: 'Washing Machine', 
      value: 15, 
      cost: 180,
      efficiency: 'A+',
      peakUsage: '2-4 PM',
      maintenance: 'OK',
      carbonFootprint: 75
    },
    { 
      name: 'Refrigerator', 
      value: 10, 
      cost: 120,
      efficiency: 'A++',
      peakUsage: '24x7',
      maintenance: 'OK',
      carbonFootprint: 50
    },
    { 
      name: 'Others', 
      value: 10, 
      cost: 120,
      efficiency: 'N/A',
      peakUsage: 'Varied',
      maintenance: 'N/A',
      carbonFootprint: 50
    }
  ];

  const todData = [
    { period: 'Peak', hours: '12 PM - 6 PM', percentage: 42, color: 'red' },
    { period: 'Mid-Peak', hours: '6 PM - 12 AM', percentage: 35, color: 'yellow' },
    { period: 'Off-Peak', hours: '12 AM - 6 AM', percentage: 23, color: 'green' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header section remains the same as previous */}
      
      {/* Appliance Analysis Section */}
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Appliance-wise Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onClick={(_, index) => setSelectedAppliance(applianceData[index])}
                    >
                      {applianceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Selected Appliance Details</h3>
                {selectedAppliance ? (
                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name</span>
                      <span className="font-medium">{selectedAppliance.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Usage</span>
                      <span className="font-medium">{selectedAppliance.value}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Cost</span>
                      <span className="font-medium">₹{selectedAppliance.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency Rating</span>
                      <span className="font-medium">{selectedAppliance.efficiency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peak Usage</span>
                      <span className="font-medium">{selectedAppliance.peakUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance</span>
                      <span className="font-medium">{selectedAppliance.maintenance}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-gray-500">
                    Click on a segment to view details
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time of Day Analysis */}
      <div className="px-6">
        <Card>
          <CardHeader>
            <CardTitle>Time of Day Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todData.map((period) => (
                <div 
                  key={period.period}
                  className={`flex items-center justify-between p-3 rounded
                    ${period.color === 'red' ? 'bg-red-50' : 
                      period.color === 'yellow' ? 'bg-yellow-50' : 'bg-green-50'}`}
                >
                  <div className="flex items-center">
                    <Clock className={`h-4 w-4 mr-2 
                      ${period.color === 'red' ? 'text-red-600' :
                        period.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`} 
                    />
                    <span>{`${period.period} (${period.hours})`}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold
                      ${period.color === 'red' ? 'text-red-600' :
                        period.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {period.percentage}%
                    </div>
                    <div className="text-xs text-gray-600">of consumption</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Recommendations */}
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Solar Opportunity Alert */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex gap-3">
                <Sun className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Solar Selling Opportunity</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    High grid demand predicted tomorrow between 2 PM - 5 PM. Current rate: ₹12/kWh
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Battery className="h-4 w-4 text-green-600" />
                      <span>Expected excess: 8.5 kWh</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Potential earning: ₹102</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Recommendations */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Cost Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Shifting your AC usage to off-peak hours could save you ₹162 per month. 
                    Consider pre-cooling during cheaper tariff periods.
                  </p>
                </div>
              </div>
            </div>

            {/* Peak Hour Alert */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex gap-3">
                <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Peak Hour Alert</h4>
                  <p className="text-sm text-gray-600">
                    Entering peak hours (2 PM - 6 PM). Consider:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                    <li>Using stored solar energy from batteries</li>
                    <li>Delaying high-consumption appliances</li>
                    <li>Adjusting AC temperature by 2°C</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
