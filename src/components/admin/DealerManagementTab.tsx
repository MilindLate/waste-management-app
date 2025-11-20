import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Eye, Edit, FileText, TrendingUp } from 'lucide-react';

interface Dealer {
  id: string;
  name: string;
  areasAssigned: string[];
  collectionsToday: number;
  collectionsMonth: number;
  avgResponseTime: number;
  onTimeRate: number;
  rating: number;
  status: 'active' | 'inactive';
}

const mockDealers: Dealer[] = [
  {
    id: 'D001',
    name: 'GreenCycle Co.',
    areasAssigned: ['Zone A', 'Zone B'],
    collectionsToday: 45,
    collectionsMonth: 1234,
    avgResponseTime: 2.5,
    onTimeRate: 95,
    rating: 4.8,
    status: 'active'
  },
  {
    id: 'D002',
    name: 'EcoWaste Solutions',
    areasAssigned: ['Zone C'],
    collectionsToday: 38,
    collectionsMonth: 1156,
    avgResponseTime: 3.2,
    onTimeRate: 92,
    rating: 4.6,
    status: 'active'
  },
  {
    id: 'D003',
    name: 'RecycleMax',
    areasAssigned: ['Zone D', 'Zone E'],
    collectionsToday: 52,
    collectionsMonth: 1445,
    avgResponseTime: 2.1,
    onTimeRate: 98,
    rating: 4.9,
    status: 'active'
  },
  {
    id: 'D004',
    name: 'CleanCity Services',
    areasAssigned: ['Zone A'],
    collectionsToday: 41,
    collectionsMonth: 1089,
    avgResponseTime: 2.8,
    onTimeRate: 94,
    rating: 4.7,
    status: 'active'
  }
];

const dealerComparisonData = mockDealers.map(d => ({
  name: d.name,
  collections: d.collectionsMonth,
  responseTime: d.avgResponseTime,
  onTimeRate: d.onTimeRate
}));

const performanceTrendData = [
  { month: 'Jul', collections: 950 },
  { month: 'Aug', collections: 1050 },
  { month: 'Sep', collections: 1100 },
  { month: 'Oct', collections: 1180 },
  { month: 'Nov', collections: 1234 }
];

export default function DealerManagementTab() {
  return (
    <div className="space-y-6">
      {/* Dealer Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dealer Performance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dealer ID</TableHead>
                  <TableHead>Dealer Name</TableHead>
                  <TableHead>Areas Assigned</TableHead>
                  <TableHead>Today</TableHead>
                  <TableHead>This Month</TableHead>
                  <TableHead>Avg Response</TableHead>
                  <TableHead>On-Time Rate</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDealers.map((dealer) => (
                  <TableRow key={dealer.id}>
                    <TableCell className="font-mono">{dealer.id}</TableCell>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {dealer.areasAssigned.map((area) => (
                          <Badge key={area} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{dealer.collectionsToday}</TableCell>
                    <TableCell>{dealer.collectionsMonth.toLocaleString()}</TableCell>
                    <TableCell>{dealer.avgResponseTime} hrs</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{dealer.onTimeRate}%</span>
                        {dealer.onTimeRate >= 95 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{dealer.rating}/5</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={dealer.status === 'active' ? 'default' : 'secondary'}>
                        {dealer.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collections Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealerComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="collections" fill="#3b82f6" name="Collections This Month" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time & On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealerComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="responseTime" fill="#f59e0b" name="Avg Response Time (hrs)" />
                <Bar dataKey="onTimeRate" fill="#10b981" name="On-Time Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Average Dealer Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="collections" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Avg Collections per Dealer"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performers Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Top Performers This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDealers
              .sort((a, b) => b.collectionsMonth - a.collectionsMonth)
              .slice(0, 3)
              .map((dealer, index) => (
                <div key={dealer.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-slate-400 text-white' :
                      'bg-orange-700 text-white'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <div>{dealer.name}</div>
                      <div className="text-sm text-slate-600">
                        {dealer.collectionsMonth.toLocaleString()} collections • {dealer.rating}⭐
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600">{dealer.onTimeRate}%</div>
                    <div className="text-sm text-slate-600">On-time</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
