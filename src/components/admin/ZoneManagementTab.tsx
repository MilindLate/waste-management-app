import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';

interface Zone {
  zone: string;
  totalCollections: number;
  pending: number;
  overdue: number;
  dealersAssigned: number;
  avgResponseTime: number;
  recyclingRate: number;
  citizens: number;
  performanceScore: number;
}

const mockZones: Zone[] = [
  {
    zone: 'Zone A',
    totalCollections: 2345,
    pending: 234,
    overdue: 12,
    dealersAssigned: 5,
    avgResponseTime: 2.8,
    recyclingRate: 72,
    citizens: 8900,
    performanceScore: 92
  },
  {
    zone: 'Zone B',
    totalCollections: 1890,
    pending: 189,
    overdue: 8,
    dealersAssigned: 4,
    avgResponseTime: 3.1,
    recyclingRate: 68,
    citizens: 7200,
    performanceScore: 88
  },
  {
    zone: 'Zone C',
    totalCollections: 2567,
    pending: 301,
    overdue: 18,
    dealersAssigned: 6,
    avgResponseTime: 3.5,
    recyclingRate: 65,
    citizens: 9800,
    performanceScore: 85
  },
  {
    zone: 'Zone D',
    totalCollections: 2100,
    pending: 198,
    overdue: 9,
    dealersAssigned: 5,
    avgResponseTime: 2.9,
    recyclingRate: 70,
    citizens: 8100,
    performanceScore: 90
  },
  {
    zone: 'Zone E',
    totalCollections: 1950,
    pending: 176,
    overdue: 7,
    dealersAssigned: 4,
    avgResponseTime: 3.0,
    recyclingRate: 69,
    citizens: 7500,
    performanceScore: 89
  }
];

const zoneComparisonData = mockZones.map(z => ({
  zone: z.zone,
  collections: z.totalCollections,
  target: 2500,
  recyclingRate: z.recyclingRate
}));

const getPerformanceBadge = (score: number) => {
  if (score >= 90) return <Badge className="bg-green-500 text-white">🟢 Excellent</Badge>;
  if (score >= 85) return <Badge className="bg-yellow-500 text-white">🟡 Good</Badge>;
  return <Badge className="bg-orange-500 text-white">🟠 Fair</Badge>;
};

export default function ZoneManagementTab() {
  return (
    <div className="space-y-6">
      {/* Geographic Map View */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Boundaries & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 rounded-lg h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">Interactive Zone Map</p>
                <p className="text-sm text-slate-500 mt-2">Color-coded by performance score</p>
              </div>
            </div>

            {/* Simulated zones with performance colors */}
            <div className="absolute top-20 left-20 w-40 h-40 bg-green-500 opacity-30 rounded-lg"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 opacity-30 rounded-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-500 opacity-30 rounded-lg"></div>
            <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-green-500 opacity-30 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-500 opacity-30 rounded-lg"></div>

            {/* Zone labels */}
            <div className="absolute top-24 left-24 text-xs bg-white px-2 py-1 rounded shadow">Zone A (92%)</div>
            <div className="absolute top-24 right-24 text-xs bg-white px-2 py-1 rounded shadow">Zone B (88%)</div>
            <div className="absolute bottom-24 left-1/4 text-xs bg-white px-2 py-1 rounded shadow">Zone C (85%)</div>
            <div className="absolute bottom-24 right-1/4 text-xs bg-white px-2 py-1 rounded shadow">Zone D (90%)</div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 opacity-60 rounded"></div>
                <span>Excellent (≥90%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 opacity-60 rounded"></div>
                <span>Good (85-89%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 opacity-60 rounded"></div>
                <span>Fair (&lt;85%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone</TableHead>
                  <TableHead>Total Collections</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Overdue</TableHead>
                  <TableHead>Dealers</TableHead>
                  <TableHead>Avg Response</TableHead>
                  <TableHead>Recycling Rate</TableHead>
                  <TableHead>Citizens</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockZones.map((zone) => (
                  <TableRow key={zone.zone}>
                    <TableCell>{zone.zone}</TableCell>
                    <TableCell>{zone.totalCollections.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{zone.pending}</Badge>
                    </TableCell>
                    <TableCell>
                      {zone.overdue > 0 ? (
                        <Badge variant="destructive">{zone.overdue}</Badge>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </TableCell>
                    <TableCell>{zone.dealersAssigned}</TableCell>
                    <TableCell>{zone.avgResponseTime} hrs</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{zone.recyclingRate}%</span>
                        {zone.recyclingRate >= 70 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{zone.citizens.toLocaleString()}</TableCell>
                    <TableCell>{getPerformanceBadge(zone.performanceScore)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Zone Comparison Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collections vs Target by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="collections" fill="#3b82f6" name="Actual Collections" />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recycling Rate by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="recyclingRate" fill="#10b981" name="Recycling Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zone Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Top Performing Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockZones
              .sort((a, b) => b.performanceScore - a.performanceScore)
              .slice(0, 3)
              .map((zone, index) => (
                <div key={zone.zone} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-slate-400 text-white' :
                      'bg-orange-700 text-white'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <div>{zone.zone}</div>
                      <div className="text-sm text-slate-600">
                        {zone.totalCollections.toLocaleString()} collections • {zone.citizens.toLocaleString()} citizens
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600">{zone.performanceScore}%</div>
                    <div className="text-sm text-slate-600">Performance Score</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
