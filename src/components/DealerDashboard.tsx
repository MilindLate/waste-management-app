import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { MapPin, Phone, Navigation, CheckCircle, Eye, Download, Filter, Route, TrendingUp, Clock, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import MapplsMap from './MapplsMap';

interface CollectionRequest {
  id: number;
  location: string;
  citizenName: string;
  wasteTypes: string[];
  quantity: number;
  timePreference: string;
  requestedDate: string;
  storageDuration: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  status: 'pending' | 'collected';
  contact?: string;
  landmark?: string;
  instructions?: string;
  lat?: number;
  lng?: number;
}

const mockRequests: CollectionRequest[] = [
  {
    id: 1,
    location: '123 MG Road, Zone A',
    citizenName: 'Rahul Sharma',
    wasteTypes: ['Plastic', 'Paper'],
    quantity: 15,
    timePreference: 'Morning 9-12',
    requestedDate: 'Nov 6, 2025',
    storageDuration: '2 hours',
    priority: 'High',
    status: 'pending',
    contact: '+91 98765 43210',
    landmark: 'Near City Mall',
    instructions: 'Call before arriving',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 2,
    location: '456 Park Street, Zone A',
    citizenName: 'Priya Singh',
    wasteTypes: ['E-Waste'],
    quantity: 8,
    timePreference: 'Flexible',
    requestedDate: 'Nov 6, 2025',
    storageDuration: '5 hours',
    priority: 'Medium',
    status: 'pending',
    contact: '+91 98765 43211',
    lat: 12.9726,
    lng: 77.5956
  },
  {
    id: 3,
    location: '789 Lake View, Zone B',
    citizenName: 'Amit Patel',
    wasteTypes: ['Metal', 'Glass'],
    quantity: 22,
    timePreference: 'Evening 3-6',
    requestedDate: 'Nov 5, 2025',
    storageDuration: '1 day',
    priority: 'Urgent',
    status: 'pending',
    contact: '+91 98765 43212',
    lat: 12.9736,
    lng: 77.5966
  },
  {
    id: 4,
    location: '321 Civil Lines',
    citizenName: 'Sneha Reddy',
    wasteTypes: ['Paper'],
    quantity: 10,
    timePreference: 'Afternoon',
    requestedDate: 'Nov 6, 2025',
    storageDuration: '3 hours',
    priority: 'Medium',
    status: 'collected',
    contact: '+91 98765 43213',
    lat: 12.9746,
    lng: 77.5976
  },
  {
    id: 5,
    location: '555 Brigade Road, Zone A',
    citizenName: 'Karthik Iyer',
    wasteTypes: ['Organic'],
    quantity: 12,
    timePreference: 'Morning 9-12',
    requestedDate: 'Nov 6, 2025',
    storageDuration: '4 hours',
    priority: 'Medium',
    status: 'pending',
    contact: '+91 98765 43214',
    lat: 12.9756,
    lng: 77.5986
  }
];

export default function DealerDashboard() {
  const [requests, setRequests] = useState<CollectionRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<CollectionRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWasteType, setFilterWasteType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [mapSelectedRequest, setMapSelectedRequest] = useState<CollectionRequest | null>(null);
  const [mapShowUrgentOnly, setMapShowUrgentOnly] = useState(false);
  const [mapHideCollected, setMapHideCollected] = useState(false);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const collectedToday = requests.filter(r => r.status === 'collected').length;
  const totalWeightToday = requests.filter(r => r.status === 'collected').reduce((sum, r) => sum + r.quantity, 0);
  const earningsToday = totalWeightToday * 27; // ₹27 per kg

  const getPriorityBadge = (priority: string) => {
    const colors = {
      Urgent: 'bg-red-500 text-white',
      High: 'bg-orange-500 text-white',
      Medium: 'bg-yellow-500 text-white',
      Low: 'bg-green-500 text-white'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'pending' ? (
      <Badge variant="secondary">🟡 Pending</Badge>
    ) : (
      <Badge variant="default">🟢 Collected</Badge>
    );
  };

  const getRowClass = (request: CollectionRequest) => {
    if (request.status === 'collected') return 'bg-green-50';
    if (request.priority === 'Urgent') return 'bg-red-50';
    if (request.priority === 'High') return 'bg-orange-50';
    if (request.requestedDate === 'Nov 6, 2025') return 'bg-yellow-50';
    return '';
  };

  const handleCollect = (request: CollectionRequest) => {
    setSelectedRequest(request);
    setShowCollectionModal(true);
  };

  const confirmCollection = () => {
    if (selectedRequest) {
      setRequests(prev => prev.map(r => 
        r.id === selectedRequest.id ? { ...r, status: 'collected' as const } : r
      ));
      toast.success('Collection marked as completed!');
      setShowCollectionModal(false);
      setSelectedRequest(null);
    }
  };

  const handleViewDetails = (request: CollectionRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const toggleRequestSelection = (id: number) => {
    setSelectedRequests(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const filteredRequests = requests.filter(request => {
    if (filterStatus !== 'all' && request.status !== filterStatus) return false;
    if (filterWasteType !== 'all' && !request.wasteTypes.includes(filterWasteType)) return false;
    if (searchQuery && !request.location.toLowerCase().includes(searchQuery.toLowerCase()) && !request.citizenName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="py-6 px-4">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-slate-900 mb-2">GreenCycle Solutions</h2>
            <div className="text-slate-600">Zone A & B, Bangalore</div>
            <div className="text-sm text-slate-500 mt-1">Thursday, November 6, 2025 • 10:30 AM</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-sm text-slate-600">Pending</div>
              <div className="text-orange-600">{pendingCount}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-slate-600">Today's Earnings</div>
              <div className="text-green-600">₹{earningsToday.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Summary Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daily Summary</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600">Target</div>
              <div>50</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Completed</div>
              <div className="text-green-600">{collectedToday}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Remaining</div>
              <div className="text-orange-600">{50 - collectedToday}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">On-time Rate</div>
              <div className="text-blue-600">95%</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{collectedToday}/50</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(collectedToday / 50) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT PANEL: Collection Sheet */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Waste Collection Sheet</span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filter Bar */}
              <div className="grid grid-cols-3 gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="collected">Collected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterWasteType} onValueChange={setFilterWasteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Waste Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Paper">Paper</SelectItem>
                    <SelectItem value="Plastic">Plastic</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Glass">Glass</SelectItem>
                    <SelectItem value="E-Waste">E-Waste</SelectItem>
                    <SelectItem value="Organic">Organic</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Bulk Actions */}
              {selectedRequests.length > 0 && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm">{selectedRequests.length} selected</span>
                  <Button size="sm" variant="outline">
                    <Route className="w-4 h-4 mr-2" />
                    Plan Route
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark Collected
                  </Button>
                </div>
              )}

              {/* Compact Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Citizen</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id} className={getRowClass(request)}>
                          <TableCell>
                            <Checkbox
                              checked={selectedRequests.includes(request.id)}
                              onCheckedChange={() => toggleRequestSelection(request.id)}
                            />
                          </TableCell>
                          <TableCell className="text-sm">
                            {request.location}
                            <div className="text-xs text-slate-500">{request.storageDuration}</div>
                          </TableCell>
                          <TableCell className="text-sm">{request.citizenName}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {request.wasteTypes.slice(0, 2).map((type) => (
                                <Badge key={type} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                              {request.wasteTypes.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{request.wasteTypes.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{request.quantity} kg</TableCell>
                          <TableCell className="text-sm">{request.timePreference}</TableCell>
                          <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {request.status === 'pending' ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleCollect(request)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewDetails(request)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm" variant="outline">
                                  Receipt
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL: Map View */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Collection Map</span>
                <Button variant="outline" size="sm">
                  <Route className="w-4 h-4 mr-2" />
                  Plan Route
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* MapmyIndia Interactive Map */}
              <MapplsMap 
                locations={filteredRequests
                  .filter(req => {
                    if (mapShowUrgentOnly && req.priority !== 'Urgent') return false;
                    if (mapHideCollected && req.status === 'collected') return false;
                    return true;
                  })
                  .map(req => ({
                    id: req.id,
                    lat: req.lat || 12.9716,
                    lng: req.lng || 77.5946,
                    location: req.location,
                    citizenName: req.citizenName,
                    priority: req.priority,
                    status: req.status,
                    wasteTypes: req.wasteTypes,
                    quantity: req.quantity,
                    contact: req.contact
                  }))}
                selectedLocation={mapSelectedRequest ? {
                  id: mapSelectedRequest.id,
                  lat: mapSelectedRequest.lat || 12.9716,
                  lng: mapSelectedRequest.lng || 77.5946,
                  location: mapSelectedRequest.location,
                  citizenName: mapSelectedRequest.citizenName,
                  priority: mapSelectedRequest.priority,
                  status: mapSelectedRequest.status,
                  wasteTypes: mapSelectedRequest.wasteTypes,
                  quantity: mapSelectedRequest.quantity,
                  contact: mapSelectedRequest.contact
                } : null}
                onLocationClick={(location) => {
                  const request = requests.find(r => r.id === location.id);
                  if (request) {
                    setMapSelectedRequest(request);
                    handleViewDetails(request);
                  }
                }}
              />

              {/* Map Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant={mapShowUrgentOnly ? "default" : "outline"}
                  onClick={() => setMapShowUrgentOnly(!mapShowUrgentOnly)}
                  className={mapShowUrgentOnly ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {mapShowUrgentOnly ? "✓" : ""} Show Urgent Only
                </Button>
                <Button 
                  size="sm" 
                  variant={mapHideCollected ? "default" : "outline"}
                  onClick={() => setMapHideCollected(!mapHideCollected)}
                  className={mapHideCollected ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  {mapHideCollected ? "✓" : ""} Hide Collected
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setMapShowUrgentOnly(false);
                    setMapHideCollected(false);
                    toast.success('Map filters cleared');
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Statistics */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-slate-600">Pending</div>
                  <div className="text-orange-600">{pendingCount}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Collected Today</div>
                  <div className="text-green-600">{collectedToday}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Total Weight</div>
                  <div>{totalWeightToday} kg</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Earnings</div>
                  <div className="text-green-600">₹{earningsToday}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Details Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collection Details - #{selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-slate-600 mb-1">Location</h4>
                <p>{selectedRequest.location}</p>
                {selectedRequest.landmark && (
                  <p className="text-sm text-slate-500">Landmark: {selectedRequest.landmark}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Citizen</h4>
                  <p>{selectedRequest.citizenName}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Contact</h4>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${selectedRequest.contact}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-600 mb-1">Waste Details</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedRequest.wasteTypes.map((type) => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                </div>
                <p className="text-sm">Quantity: {selectedRequest.quantity} kg</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Time Preference</h4>
                  <p>{selectedRequest.timePreference}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Storage Duration</h4>
                  <p>{selectedRequest.storageDuration}</p>
                </div>
              </div>

              {selectedRequest.instructions && (
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Special Instructions</h4>
                  <p className="text-sm">{selectedRequest.instructions}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    if (selectedRequest.lat && selectedRequest.lng) {
                      // Open in Google Maps for navigation
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${selectedRequest.lat},${selectedRequest.lng}`,
                        '_blank'
                      );
                      toast.success('Opening navigation...');
                    } else {
                      toast.error('Location coordinates not available');
                    }
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
                {selectedRequest.status === 'pending' && (
                  <Button className="flex-1" onClick={() => {
                    setShowDetailModal(false);
                    handleCollect(selectedRequest);
                  }}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Collected
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Collection Confirmation Modal */}
      <Dialog open={showCollectionModal} onOpenChange={setShowCollectionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Collection - #{selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">Location</p>
                <p>{selectedRequest.location}</p>
              </div>

              <div>
                <h4 className="mb-2">Actual Waste Collected</h4>
                <div className="space-y-2">
                  {selectedRequest.wasteTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2">Actual Weight (kg)</h4>
                <Input type="number" placeholder="Enter weight" defaultValue={selectedRequest.quantity} />
              </div>

              <div>
                <h4 className="mb-2">Quality Rating</h4>
                <Select defaultValue="good">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Well segregated</SelectItem>
                    <SelectItem value="good">Good - Mostly segregated</SelectItem>
                    <SelectItem value="fair">Fair - Needs improvement</SelectItem>
                    <SelectItem value="poor">Poor - Not segregated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2">Photo Upload</h4>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600">Upload collection photos</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCollectionModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={confirmCollection}>
                  Confirm Collection
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
