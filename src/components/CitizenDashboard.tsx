import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Bell, MapPin, Award, Calendar, Truck, AlertCircle, BookOpen, Gift, Phone, Clock, MapPinIcon } from 'lucide-react';
import SchedulePickupForm from './citizen/SchedulePickupForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface ActiveRequest {
  id: string;
  wasteTypes: string[];
  quantity: string;
  status: 'scheduled' | 'assigned' | 'enroute' | 'collected';
  scheduledDate: string;
  timeSlot: string;
  collector?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  eta?: string;
  address: string;
}

const mockActiveRequests: ActiveRequest[] = [
  {
    id: 'WR001234',
    wasteTypes: ['Plastic', 'Paper'],
    quantity: '15 kg',
    status: 'enroute',
    scheduledDate: 'Nov 6, 2025',
    timeSlot: 'Morning (9 AM - 12 PM)',
    address: '123 MG Road, Zone A',
    collector: {
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      vehicle: 'KA-01-AB-1234'
    },
    eta: '15 minutes'
  },
  {
    id: 'WR001235',
    wasteTypes: ['E-Waste'],
    quantity: '8 kg',
    status: 'scheduled',
    scheduledDate: 'Nov 7, 2025',
    timeSlot: 'Afternoon (12 PM - 3 PM)',
    address: '123 MG Road, Zone A'
  }
];

const mockHistory = [
  {
    id: 'WR001200',
    date: 'Nov 3, 2025',
    wasteTypes: ['Paper', 'Cardboard'],
    quantity: '12 kg',
    points: 120,
    rating: 5,
    collector: 'Suresh Singh'
  },
  {
    id: 'WR001180',
    date: 'Oct 28, 2025',
    wasteTypes: ['Plastic', 'Metal'],
    quantity: '18 kg',
    points: 180,
    rating: 5,
    collector: 'Ramesh Kumar'
  }
];

export default function CitizenDashboard() {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [activeRequests] = useState<ActiveRequest[]>(mockActiveRequests);
  const totalPoints = 2450;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'Scheduled', variant: 'secondary' as const },
      assigned: { label: 'Assigned', variant: 'default' as const },
      enroute: { label: 'En Route', variant: 'default' as const },
      collected: { label: 'Collected', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-slate-900 mb-2">Welcome back, Rahul!</h2>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span>MG Road, Bangalore - 560001</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-slate-600">Reward Points</div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-slate-900">{totalPoints}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Button 
          onClick={() => setShowScheduleForm(true)}
          className="h-24 flex-col gap-2"
        >
          <Calendar className="w-6 h-6" />
          Schedule Pickup
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Truck className="w-6 h-6" />
          Track Request
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <AlertCircle className="w-6 h-6" />
          Report Issue
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <BookOpen className="w-6 h-6" />
          Recycling Guide
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Gift className="w-6 h-6" />
          My Rewards
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="education">Learn</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Active Requests */}
        <TabsContent value="active" className="space-y-4">
          {activeRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600 mb-4">No active pickup requests</p>
                <Button onClick={() => setShowScheduleForm(true)}>
                  Schedule Your First Pickup
                </Button>
              </CardContent>
            </Card>
          ) : (
            activeRequests.map((request) => (
              <Card key={request.id} className={request.status === 'enroute' ? 'border-green-500 border-2' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Request #{request.id}
                        {getStatusBadge(request.status)}
                      </CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        {request.address}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-slate-600 text-sm">Waste Types</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.wasteTypes.map((type) => (
                          <Badge key={type} variant="secondary">{type}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm">Quantity</div>
                      <div>{request.quantity}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm">Scheduled Date</div>
                      <div>{request.scheduledDate}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm">Time Slot</div>
                      <div>{request.timeSlot}</div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={request.status === 'scheduled' || request.status === 'assigned' || request.status === 'enroute' || request.status === 'collected' ? 'text-green-600' : 'text-slate-400'}>Scheduled</span>
                      <span className={request.status === 'assigned' || request.status === 'enroute' || request.status === 'collected' ? 'text-green-600' : 'text-slate-400'}>Assigned</span>
                      <span className={request.status === 'enroute' || request.status === 'collected' ? 'text-green-600' : 'text-slate-400'}>En Route</span>
                      <span className={request.status === 'collected' ? 'text-green-600' : 'text-slate-400'}>Collected</span>
                    </div>
                    <Progress 
                      value={
                        request.status === 'scheduled' ? 25 : 
                        request.status === 'assigned' ? 50 : 
                        request.status === 'enroute' ? 75 : 100
                      } 
                      className="h-2"
                    />
                  </div>

                  {/* Collector Details */}
                  {request.collector && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-slate-600">Collector Details</div>
                          <div className="mt-1">{request.collector.name}</div>
                          <div className="text-sm text-slate-600">Vehicle: {request.collector.vehicle}</div>
                        </div>
                        <div className="text-right">
                          {request.eta && (
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                              <Clock className="w-4 h-4" />
                              <span>ETA: {request.eta}</span>
                            </div>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <a href={`tel:${request.collector.phone}`}>
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {request.status === 'enroute' && (
                    <div className="bg-slate-100 rounded-lg p-8 text-center">
                      <MapPinIcon className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                      <div className="text-slate-600">Live tracking map coming soon</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Track on Map</Button>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="outline">Reschedule</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Request #{item.id}</CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Award className="w-4 h-4" />
                      <span>+{item.points} points</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-slate-600 text-sm">Waste Types</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.wasteTypes.map((type) => (
                        <Badge key={type} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-sm">Quantity</div>
                    <div>{item.quantity}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-sm">Collector</div>
                    <div>{item.collector}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-sm">Rating</div>
                    <div>{'⭐'.repeat(item.rating)}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">View Receipt</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Educational Content */}
        <TabsContent value="education" className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Segregation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Separate wet and dry waste at source</li>
                <li>• Rinse plastic containers before disposal</li>
                <li>• Remove labels from bottles and cans</li>
                <li>• Flatten cardboard boxes to save space</li>
                <li>• Store recyclables in a clean, dry place</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recycling Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Reduces landfill waste by up to 70%</li>
                <li>• Conserves natural resources</li>
                <li>• Saves energy in manufacturing</li>
                <li>• Creates green jobs</li>
                <li>• Protects the environment for future generations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Do's</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>✓ Clean containers before recycling</li>
                <li>✓ Remove caps and lids</li>
                <li>✓ Separate different materials</li>
                <li>✓ Compress plastic bottles</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Don'ts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>✗ Don't mix wet and dry waste</li>
                <li>✗ Don't include food-contaminated items</li>
                <li>✗ Don't recycle broken glass without wrapping</li>
                <li>✗ Don't put batteries in regular waste</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Dashboard */}
        <TabsContent value="rewards">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Your Rewards Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-slate-600 text-sm">Total Points</div>
                    <div className="text-yellow-600">{totalPoints}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-slate-600 text-sm">This Month</div>
                    <div className="text-green-600">+450</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-slate-600 text-sm">Rank</div>
                    <div className="text-blue-600">#234</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Gold Tier</span>
                    <span>{totalPoints}/5000</span>
                  </div>
                  <Progress value={(totalPoints / 5000) * 100} />
                </div>

                <div>
                  <h3 className="mb-4">Redemption Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <div>₹50 Mobile Recharge</div>
                        <div className="text-sm text-slate-600">500 points</div>
                      </div>
                      <Button size="sm">Redeem</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <div>₹100 Shopping Voucher</div>
                        <div className="text-sm text-slate-600">1000 points</div>
                      </div>
                      <Button size="sm">Redeem</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <div>Plant a Tree</div>
                        <div className="text-sm text-slate-600">200 points</div>
                      </div>
                      <Button size="sm">Redeem</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl mb-2">🌟</div>
                    <div className="text-sm">First Pickup</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl mb-2">♻️</div>
                    <div className="text-sm">Eco Warrior</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-sm">Monthly Champion</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg opacity-50">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-sm">Consistency King</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Pickup Form Dialog */}
      <Dialog open={showScheduleForm} onOpenChange={setShowScheduleForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Waste Pickup</DialogTitle>
            <DialogDescription>
              Fill out the form below to schedule a waste pickup at your location.
            </DialogDescription>
          </DialogHeader>
          <SchedulePickupForm onClose={() => setShowScheduleForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
