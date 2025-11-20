import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin } from 'lucide-react';

const wasteStatusData = [
  { name: 'Collected', value: 65, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'In Progress', value: 8, color: '#3b82f6' },
  { name: 'Overdue', value: 2, color: '#ef4444' }
];

const wasteTypeData = [
  { name: 'Plastic', value: 30, color: '#3b82f6' },
  { name: 'Paper', value: 25, color: '#10b981' },
  { name: 'Metal', value: 15, color: '#f59e0b' },
  { name: 'Glass', value: 10, color: '#8b5cf6' },
  { name: 'E-Waste', value: 8, color: '#ef4444' },
  { name: 'Organic', value: 10, color: '#14b8a6' },
  { name: 'Others', value: 2, color: '#64748b' }
];

const collectionsOverTime = [
  { time: '6 AM', collections: 45 },
  { time: '9 AM', collections: 120 },
  { time: '12 PM', collections: 180 },
  { time: '3 PM', collections: 150 },
  { time: '6 PM', collections: 90 },
  { time: '9 PM', collections: 20 }
];

const collectionsByZone = [
  { zone: 'Zone A', collections: 2345, target: 2500 },
  { zone: 'Zone B', collections: 1890, target: 2000 },
  { zone: 'Zone C', collections: 2567, target: 2800 },
  { zone: 'Zone D', collections: 2100, target: 2200 },
  { zone: 'Zone E', collections: 1950, target: 2000 }
];

const timePreferenceData = [
  { slot: 'Early Morning', demand: 450, capacity: 500 },
  { slot: 'Mid Morning', demand: 680, capacity: 700 },
  { slot: 'Afternoon', demand: 520, capacity: 600 },
  { slot: 'Evening', demand: 590, capacity: 650 },
  { slot: 'Late Evening', demand: 320, capacity: 400 }
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Interactive City Map */}
      <Card>
        <CardHeader>
          <CardTitle>City-wide Collection Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 rounded-lg h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">Interactive City Map with Heat Overlay</p>
                <p className="text-sm text-slate-500 mt-2">Shows real-time collection density and dealer locations</p>
              </div>
            </div>

            {/* Simulated zone boundaries and heat */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 opacity-20 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-red-500 opacity-20 rounded-full blur-xl"></div>

            {/* Zone Labels */}
            <div className="absolute top-1/4 left-1/4 text-xs text-slate-700 bg-white px-2 py-1 rounded shadow">Zone A</div>
            <div className="absolute top-1/3 right-1/4 text-xs text-slate-700 bg-white px-2 py-1 rounded shadow">Zone B</div>
            <div className="absolute bottom-1/3 left-1/3 text-xs text-slate-700 bg-white px-2 py-1 rounded shadow">Zone C</div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Waste Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Collections Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Collections Over Time (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={collectionsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="collections" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Collections by Time Preference */}
        <Card>
          <CardHeader>
            <CardTitle>Demand vs Capacity by Time Slot</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timePreferenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="slot" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="#f59e0b" name="Demand" />
                <Bar dataKey="capacity" fill="#10b981" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Collections by Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Collections by Zone (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={collectionsByZone} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="zone" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="collections" fill="#3b82f6" name="Actual Collections" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Gauges */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">On-time Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl text-green-600 mb-2">95%</div>
              <div className="text-xs text-slate-600">Target: 95%</div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Citizen Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl text-blue-600 mb-2">4.7/5</div>
              <div className="text-xs text-slate-600">Based on 12,345 ratings</div>
              <div className="text-2xl mt-2">⭐⭐⭐⭐⭐</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Dealer Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl text-purple-600 mb-2">92%</div>
              <div className="text-xs text-slate-600">Avg collections/target</div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recycling Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl text-green-600 mb-2">68%</div>
              <div className="text-xs text-slate-600">Target: 70%</div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
