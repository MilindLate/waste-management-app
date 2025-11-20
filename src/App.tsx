import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import CitizenDashboard from './components/CitizenDashboard';
import DealerDashboard from './components/DealerDashboard';
import AdminDashboard from './components/AdminDashboard';
import CitizenAuth from './components/auth/CitizenAuth';
import DealerAuth from './components/auth/DealerAuth';
import AdminAuth from './components/auth/AdminAuth';
import NotificationCenter from './components/NotificationCenter';
import UserProfile from './components/UserProfile';
import GlobalSearch from './components/GlobalSearch';
import QuickActionButton from './components/QuickActionButton';
import { User, Truck, Shield, Recycle, Moon, Sun, Menu, Bell, Play, CheckCircle2, Clock, TrendingUp, HelpCircle, MapPin, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { motion } from 'motion/react';

export default function App() {
  const [activeRole, setActiveRole] = useState<'citizen' | 'dealer' | 'admin' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (user: any) => {
    setUserData(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setActiveRole(null);
  };

  // Show auth page if role selected but not authenticated
  if (activeRole && !isAuthenticated) {
    if (activeRole === 'citizen') {
      return <CitizenAuth onLogin={handleLogin} onBack={() => setActiveRole(null)} />;
    }
    if (activeRole === 'dealer') {
      return <DealerAuth onLogin={handleLogin} onBack={() => setActiveRole(null)} />;
    }
    if (activeRole === 'admin') {
      return <AdminAuth onLogin={handleLogin} onBack={() => setActiveRole(null)} />;
    }
  }

  if (!activeRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-emerald-900">EcoSort</h1>
                  <p className="text-emerald-600 text-sm">Smart Waste Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Landing Page */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              Powered by AI & Real-time Analytics
            </Badge>
            <h2 className="mb-4 text-emerald-900">Welcome to EcoSort</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A comprehensive waste management platform connecting citizens, collection dealers, 
              and administrators for efficient, sustainable waste disposal and recycling.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Citizen Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-emerald-500 h-full"
                onClick={() => setActiveRole('citizen')}
              >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Citizen Portal</CardTitle>
                <CardDescription>
                  Schedule pickups, track requests, and earn rewards for recycling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Schedule waste pickups
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Track collection status
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Earn EcoPoints rewards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Access recycling guide
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Enter Citizen Portal
                </Button>
              </CardContent>
            </Card>
            </motion.div>

            {/* Dealer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-emerald-500 h-full"
                onClick={() => setActiveRole('dealer')}
              >
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Dealer Portal</CardTitle>
                <CardDescription>
                  Manage collections, optimize routes, and track performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    View collection sheet
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Interactive route map
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Bulk operations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Performance metrics
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  Enter Dealer Portal
                </Button>
              </CardContent>
            </Card>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-emerald-500 h-full"
                onClick={() => setActiveRole('admin')}
              >
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Admin Portal</CardTitle>
                <CardDescription>
                  Monitor operations, analyze data, and manage resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    System analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Dealer management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Zone configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Advanced reporting
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  Enter Admin Portal
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                Simple & Efficient Process
              </Badge>
              <h3 className="mb-3 text-slate-900">How EcoSort Works</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our streamlined waste management system connects citizens, dealers, and administrators 
                for seamless waste collection and recycling.
              </p>
            </div>

            {/* Process Flow */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center h-full border-2 border-blue-200 bg-blue-50/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                      1
                    </div>
                    <h4 className="mb-2 text-blue-900">Schedule Pickup</h4>
                    <p className="text-sm text-slate-600">
                      Citizens book waste collection through the app with preferred date and time
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center h-full border-2 border-orange-200 bg-orange-50/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                      2
                    </div>
                    <h4 className="mb-2 text-orange-900">Route Optimization</h4>
                    <p className="text-sm text-slate-600">
                      System assigns requests to dealers with optimized collection routes
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center h-full border-2 border-emerald-200 bg-emerald-50/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                      3
                    </div>
                    <h4 className="mb-2 text-emerald-900">Collection & Sorting</h4>
                    <p className="text-sm text-slate-600">
                      Dealers collect waste, sort by type, and update status in real-time
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="text-center h-full border-2 border-purple-200 bg-purple-50/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                      4
                    </div>
                    <h4 className="mb-2 text-purple-900">Track & Reward</h4>
                    <p className="text-sm text-slate-600">
                      Citizens earn EcoPoints, admins monitor system performance and analytics
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Role-Based Usage Guide */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">For Citizens</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-blue-600 shrink-0">1.</span>
                      <span>Create account and complete profile</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 shrink-0">2.</span>
                      <span>Schedule pickup with waste details</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 shrink-0">3.</span>
                      <span>Track collection status in real-time</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 shrink-0">4.</span>
                      <span>Earn EcoPoints and redeem rewards</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 shrink-0">5.</span>
                      <span>View history and recycling impact</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">For Dealers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-orange-600 shrink-0">1.</span>
                      <span>Register and get admin approval</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 shrink-0">2.</span>
                      <span>View assigned collection schedule</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 shrink-0">3.</span>
                      <span>Use map view for route optimization</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 shrink-0">4.</span>
                      <span>Update pickup status and waste weight</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 shrink-0">5.</span>
                      <span>Track performance and earnings</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">For Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-purple-600 shrink-0">1.</span>
                      <span>Monitor system-wide operations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 shrink-0">2.</span>
                      <span>Approve and manage dealer accounts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 shrink-0">3.</span>
                      <span>Configure zones and assign dealers</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 shrink-0">4.</span>
                      <span>Analyze waste collection trends</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 shrink-0">5.</span>
                      <span>Generate reports and insights</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-3">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Quick Start Guide</span>
                  </div>
                  <h3 className="text-emerald-900">Get Started in 3 Easy Steps</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <User className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-3 text-sm">
                      1
                    </div>
                    <h4 className="mb-2">Choose Your Role</h4>
                    <p className="text-sm text-slate-600">
                      Select Citizen, Dealer, or Admin portal based on your needs
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-3 text-sm">
                      2
                    </div>
                    <h4 className="mb-2">Create Account</h4>
                    <p className="text-sm text-slate-600">
                      Sign up with your details or use demo credentials to explore
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <TrendingUp className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-3 text-sm">
                      3
                    </div>
                    <h4 className="mb-2">Start Managing</h4>
                    <p className="text-sm text-slate-600">
                      Schedule pickups, track collections, or monitor operations
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Play className="w-4 h-4 mr-2" />
                    Get Started Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Stats */}
          <div className="mt-16 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-center mb-6 text-white">Our Impact This Month</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-1">15.2K</div>
                    <p className="text-emerald-50 text-sm">Pickups Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">47.8T</div>
                    <p className="text-emerald-50 text-sm">Waste Collected</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">89%</div>
                    <p className="text-emerald-50 text-sm">Recycling Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">3.2K</div>
                    <p className="text-emerald-50 text-sm">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Waste Types Section */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="mb-3 text-slate-900">What We Collect</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We handle various types of waste for proper disposal and recycling
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center border-emerald-200 bg-emerald-50/30">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-emerald-900 text-sm">Organic Waste</h4>
                  <p className="text-xs text-slate-600">
                    Food scraps, yard waste, compostable materials
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-blue-200 bg-blue-50/30">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-blue-900 text-sm">Recyclables</h4>
                  <p className="text-xs text-slate-600">
                    Paper, plastic, glass, metal items
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-orange-200 bg-orange-50/30">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-orange-900 text-sm">E-Waste</h4>
                  <p className="text-xs text-slate-600">
                    Electronics, batteries, appliances
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-red-200 bg-red-50/30">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-red-900 text-sm">Hazardous</h4>
                  <p className="text-xs text-slate-600">
                    Chemicals, paints, medical waste
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-center mb-8 text-slate-900">Platform Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Recycle className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="mb-2">Eco-Friendly</h4>
                <p className="text-sm text-slate-600">
                  Promoting sustainable waste management and recycling practices
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="mb-2">Real-time Updates</h4>
                <p className="text-sm text-slate-600">
                  Live tracking and instant notifications for all stakeholders
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="mb-2">Secure & Reliable</h4>
                <p className="text-sm text-slate-600">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-3">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-600">Frequently Asked Questions</span>
              </div>
              <h3 className="text-slate-900">Common Questions</h3>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    How do I schedule a waste pickup?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Login to your Citizen account, navigate to "Schedule Pickup", select waste type, 
                  choose date and time, and confirm your request. You'll receive real-time updates 
                  on collection status.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2">
                    <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    What are EcoPoints and how do I earn them?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  EcoPoints are rewards for responsible waste disposal. Earn points for each successful 
                  pickup, proper waste segregation, and consistent recycling. Redeem points for discounts 
                  and rewards.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    Which areas does EcoSort serve?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  We currently serve 12 zones across the city. During registration, you'll see if your 
                  area is covered. We're constantly expanding to new neighborhoods based on demand.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2">
                    <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    How do dealers get assigned to collection requests?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Our smart routing system automatically assigns requests to dealers based on location, 
                  availability, waste type expertise, and route optimization for maximum efficiency.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2">
                    <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    What are the pickup time slots available?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  We offer flexible time slots: Morning (6 AM - 10 AM), Afternoon (12 PM - 4 PM), 
                  and Evening (4 PM - 8 PM). Choose the most convenient slot during scheduling.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 border-t border-emerald-100 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-1.5 rounded-lg">
                  <Recycle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-900">EcoSort</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Making waste management smarter, cleaner, and more sustainable.
              </p>
              <p className="text-xs text-slate-400">
                &copy; 2025 EcoSort. All rights reserved. Built with ♻️ for a better tomorrow.
              </p>
            </div>
          </footer>
        </div>

        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Role Selector */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl cursor-pointer" onClick={() => setActiveRole(null)}>
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-slate-900 cursor-pointer" onClick={() => setActiveRole(null)}>EcoSort</h1>
                <p className="text-slate-500 text-sm">Smart Waste Management</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-md hidden md:block">
              <GlobalSearch role={activeRole} />
            </div>
            
            <div className="flex items-center gap-2">
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as any)} className="w-auto">
                <TabsList>
                  <TabsTrigger value="citizen" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Citizen</span>
                  </TabsTrigger>
                  <TabsTrigger value="dealer" className="gap-2">
                    <Truck className="w-4 h-4" />
                    <span className="hidden sm:inline">Dealer</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <NotificationCenter />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <UserProfile role={activeRole} onLogout={handleLogout} userData={userData} />
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <GlobalSearch role={activeRole} />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto">
        {activeRole === 'citizen' && <CitizenDashboard />}
        {activeRole === 'dealer' && <DealerDashboard />}
        {activeRole === 'admin' && <AdminDashboard />}
      </div>

      {/* Quick Action Button (Mobile) */}
      <QuickActionButton role={activeRole} />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
