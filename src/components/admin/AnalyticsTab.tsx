import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const wasteVolumeOverTime = [
  { month: 'Jan', paper: 3000, plastic: 4000, metal: 2000, glass: 1500, ewaste: 1000, organic: 2500 },
  { month: 'Feb', paper: 3200, plastic: 4200, metal: 2100, glass: 1600, ewaste: 1100, organic: 2700 },
  { month: 'Mar', paper: 3400, plastic: 4500, metal: 2200, glass: 1700, ewaste: 1200, organic: 2800 },
  { month: 'Apr', paper: 3600, plastic: 4800, metal: 2300, glass: 1800, ewaste: 1300, organic: 3000 },
  { month: 'May', paper: 3800, plastic: 5000, metal: 2400, glass: 1900, ewaste: 1400, organic: 3100 },
  { month: 'Jun', paper: 4000, plastic: 5200, metal: 2500, glass: 2000, ewaste: 1500, organic: 3200 }
];

const yearOverYearData = [
  { month: 'Jan', current: 14000, previous: 12000 },
  { month: 'Feb', current: 14800, previous: 12500 },
  { month: 'Mar', current: 15400, previous: 13000 },
  { month: 'Apr', current: 16100, previous: 13800 },
  { month: 'May', current: 16800, previous: 14200 },
  { month: 'Jun', current: 17400, previous: 14800 }
];

const recyclingRateByArea = [
  { area: 'Zone A', rate: 72, target: 70 },
  { area: 'Zone B', rate: 68, target: 70 },
  { area: 'Zone C', rate: 65, target: 70 },
  { area: 'Zone D', rate: 70, target: 70 },
  { area: 'Zone E', rate: 69, target: 70 }
];

const efficiencyTrend = [
  { month: 'Jan', responseTime: 4.2, completionRate: 89 },
  { month: 'Feb', responseTime: 4.0, completionRate: 90 },
  { month: 'Mar', responseTime: 3.8, completionRate: 91 },
  { month: 'Apr', responseTime: 3.5, completionRate: 93 },
  { month: 'May', responseTime: 3.2, completionRate: 94 },
  { month: 'Jun', responseTime: 3.0, completionRate: 95 }
];

const reportTypes = [
  'Daily Operations Summary',
  'Weekly Performance Report',
  'Monthly Statistical Analysis',
  'Custom Date Range Report',
  'Area-wise Comparison',
  'Dealer Performance Report',
  'Waste Type Analysis',
  'Financial Summary',
  'Citizen Engagement Report'
];

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Report Type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Export Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Automated Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Waste Volume Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Waste Volume Trends (Stacked Area)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={wasteVolumeOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="paper" stackId="1" stroke="#10b981" fill="#10b981" />
              <Area type="monotone" dataKey="plastic" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="metal" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="glass" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
              <Area type="monotone" dataKey="ewaste" stackId="1" stroke="#ef4444" fill="#ef4444" />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#14b8a6" fill="#14b8a6" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Year-over-Year Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Collection Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearOverYearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="2025"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#e5e7eb" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                name="2024"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span>17.6% growth compared to same period last year</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recycling Rate Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Recycling Rate by Area vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recyclingRateByArea}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" fill="#10b981" name="Actual Recycling Rate (%)" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Efficiency Improvement Trends */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={efficiencyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Avg Response Time (hrs)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 rotate-180" />
              <span>28.6% improvement over 6 months</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={efficiencyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Completion Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>6.7% improvement over 6 months</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Predictive Analytics & Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm text-slate-600 mb-2">Next Week Forecast</h4>
              <div className="text-slate-900">Expected: 18,500 kg waste</div>
              <div className="text-sm text-slate-600">Peak day: Wednesday</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm text-slate-600 mb-2">Resource Optimization</h4>
              <div className="text-slate-900">Add 2 more dealers to Zone C</div>
              <div className="text-sm text-slate-600">To meet demand surge</div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="text-sm text-slate-600 mb-2">Seasonal Pattern</h4>
              <div className="text-slate-900">15% increase expected in Dec</div>
              <div className="text-sm text-slate-600">Holiday season impact</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="text-sm text-slate-600 mb-2">Bottleneck Alert</h4>
              <div className="text-slate-900">Evening slot over-capacity</div>
              <div className="text-sm text-slate-600">Consider incentivizing other slots</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">Avg Collection Time</div>
              <div className="text-slate-900 mb-1">4.5 hours</div>
              <div className="text-xs text-green-600">↓ 0.8 hrs vs last month</div>
            </div>

            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">First-Time Resolution</div>
              <div className="text-slate-900 mb-1">94.2%</div>
              <div className="text-xs text-green-600">↑ 2.1% vs last month</div>
            </div>

            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">Citizen Retention</div>
              <div className="text-slate-900 mb-1">96.8%</div>
              <div className="text-xs text-green-600">↑ 1.3% vs last month</div>
            </div>

            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-sm text-slate-600 mb-2">Cost per Collection</div>
              <div className="text-slate-900 mb-1">₹125</div>
              <div className="text-xs text-green-600">↓ ₹15 vs last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
