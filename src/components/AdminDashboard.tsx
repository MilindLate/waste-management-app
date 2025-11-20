import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown, Users, Trash2, AlertCircle } from 'lucide-react';
import OverviewTab from './admin/OverviewTab';
import WasteSheetTab from './admin/WasteSheetTab';
import DealerManagementTab from './admin/DealerManagementTab';
import ZoneManagementTab from './admin/ZoneManagementTab';
import AnalyticsTab from './admin/AnalyticsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock statistics
  const stats = {
    collectionsToday: 1245,
    collectionsWeek: 8567,
    collectionsMonth: 34890,
    collectionsGrowth: 12.5,
    activeCitizens: 45678,
    activeDealers: 234,
    activeCollectors: 567,
    newRegistrations: 89,
    wasteToday: 12456,
    wasteMonth: 456789,
    recyclingRate: 68,
    wasteGrowth: 8.3,
    pendingUrgent: 123,
    pendingToday: 456,
    overdue: 34,
    avgResponseTime: 4.5
  };

  return (
    <div className="py-6 px-4">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-slate-900 mb-2">Admin Dashboard</h2>
            <div className="text-slate-600">Bangalore Municipal Corporation</div>
            <div className="text-sm text-slate-500 mt-1">Thursday, November 6, 2025 • 10:30 AM</div>
          </div>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Collections</CardTitle>
            <Trash2 className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900 mb-1">{stats.collectionsToday.toLocaleString()}</div>
            <p className="text-xs text-slate-600">
              Today • This Week: {stats.collectionsWeek.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.collectionsGrowth}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
            <Users className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900 mb-1">{stats.activeCitizens.toLocaleString()}</div>
            <p className="text-xs text-slate-600">
              Citizens • Dealers: {stats.activeDealers} • Collectors: {stats.activeCollectors}
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.newRegistrations} new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Waste Processed</CardTitle>
            <Trash2 className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900 mb-1">{stats.wasteToday.toLocaleString()} kg</div>
            <p className="text-xs text-slate-600">
              Today • This Month: {stats.wasteMonth.toLocaleString()} kg
            </p>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
              <span>Recycling Rate: {stats.recyclingRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Collections</CardTitle>
            <AlertCircle className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900 mb-1">{stats.pendingToday}</div>
            <p className="text-xs text-slate-600">
              Today • Urgent: <span className="text-red-600">{stats.pendingUrgent}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <AlertCircle className="w-3 h-3" />
              <span>{stats.overdue} overdue requests</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
          <TabsTrigger value="wastesheet">Complete Waste Sheet</TabsTrigger>
          <TabsTrigger value="dealers">Dealer Management</TabsTrigger>
          <TabsTrigger value="zones">Zone Management</TabsTrigger>
          <TabsTrigger value="analytics">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="wastesheet" className="mt-6">
          <WasteSheetTab />
        </TabsContent>

        <TabsContent value="dealers" className="mt-6">
          <DealerManagementTab />
        </TabsContent>

        <TabsContent value="zones" className="mt-6">
          <ZoneManagementTab />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
