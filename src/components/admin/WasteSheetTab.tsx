import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Download, Filter, Search, Eye, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface WasteRequest {
  requestId: string;
  date: string;
  time: string;
  area: string;
  location: string;
  citizen: string;
  contact: string;
  wasteTypes: string[];
  quantity: number;
  timePreference: string;
  dealerAssigned: string;
  collector: string;
  status: 'pending' | 'collected' | 'overdue';
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  storageTime: string;
  collectionTime?: string;
}

const mockWasteData: WasteRequest[] = [
  {
    requestId: 'WR001234',
    date: 'Nov 6',
    time: '08:30',
    area: 'Zone A',
    location: '123 MG Road',
    citizen: 'Rahul S.',
    contact: '98xxx123',
    wasteTypes: ['Plastic', 'Paper'],
    quantity: 15,
    timePreference: 'Morning 9-12',
    dealerAssigned: 'Dealer A',
    collector: 'Collector 1',
    status: 'pending',
    priority: 'High',
    storageTime: '2 hrs'
  },
  {
    requestId: 'WR001235',
    date: 'Nov 6',
    time: '09:15',
    area: 'Zone B',
    location: '456 Park St',
    citizen: 'Priya M.',
    contact: '97xxx456',
    wasteTypes: ['E-Waste'],
    quantity: 8,
    timePreference: 'Flexible',
    dealerAssigned: 'Dealer B',
    collector: 'Collector 3',
    status: 'collected',
    priority: 'Medium',
    storageTime: '4 hrs',
    collectionTime: '11:45 AM'
  },
  {
    requestId: 'WR001236',
    date: 'Nov 5',
    time: '14:30',
    area: 'Zone C',
    location: '789 Lake View',
    citizen: 'Amit P.',
    contact: '96xxx789',
    wasteTypes: ['Metal'],
    quantity: 22,
    timePreference: 'Evening 3-6',
    dealerAssigned: 'Dealer C',
    collector: 'Collector 2',
    status: 'overdue',
    priority: 'Urgent',
    storageTime: '20 hrs'
  },
  {
    requestId: 'WR001237',
    date: 'Nov 6',
    time: '10:00',
    area: 'Zone A',
    location: '321 Brigade Rd',
    citizen: 'Sneha K.',
    contact: '95xxx234',
    wasteTypes: ['Paper', 'Cardboard'],
    quantity: 18,
    timePreference: 'Afternoon 12-3',
    dealerAssigned: 'Dealer A',
    collector: 'Collector 1',
    status: 'pending',
    priority: 'Medium',
    storageTime: '1 hr'
  },
  {
    requestId: 'WR001238',
    date: 'Nov 6',
    time: '07:45',
    area: 'Zone D',
    location: '555 Residency Rd',
    citizen: 'Karthik R.',
    contact: '94xxx567',
    wasteTypes: ['Plastic', 'Glass'],
    quantity: 12,
    timePreference: 'Morning 9-12',
    dealerAssigned: 'Dealer D',
    collector: 'Collector 4',
    status: 'pending',
    priority: 'High',
    storageTime: '3 hrs'
  },
  {
    requestId: 'WR001239',
    date: 'Nov 6',
    time: '11:30',
    area: 'Zone B',
    location: '888 Indiranagar',
    citizen: 'Divya S.',
    contact: '93xxx890',
    wasteTypes: ['Organic'],
    quantity: 25,
    timePreference: 'Flexible',
    dealerAssigned: 'Dealer B',
    collector: 'Collector 5',
    status: 'collected',
    priority: 'Low',
    storageTime: '6 hrs',
    collectionTime: '1:15 PM'
  }
];

export default function WasteSheetTab() {
  const [data] = useState<WasteRequest[]>(mockWasteData);
  const [selectedRequest, setSelectedRequest] = useState<WasteRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterArea, setFilterArea] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWasteType, setFilterWasteType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: '🟡 Pending', variant: 'secondary' as const },
      collected: { label: '🟢 Collected', variant: 'default' as const },
      overdue: { label: '🔴 Overdue', variant: 'destructive' as const }
    };
    const c = config[status as keyof typeof config];
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      Urgent: 'bg-red-500 text-white',
      High: 'bg-orange-500 text-white',
      Medium: 'bg-yellow-500 text-white',
      Low: 'bg-green-500 text-white'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getRowClass = (request: WasteRequest) => {
    if (request.status === 'overdue') return 'bg-red-50';
    if (request.status === 'collected') return 'bg-green-50';
    if (request.priority === 'High') return 'bg-orange-50';
    if (request.priority === 'Urgent') return 'bg-red-100';
    if (request.date === 'Nov 6') return 'bg-yellow-50';
    return '';
  };

  const filteredData = data.filter(request => {
    if (filterArea !== 'all' && request.area !== filterArea) return false;
    if (filterStatus !== 'all' && request.status !== filterStatus) return false;
    if (filterWasteType !== 'all' && !request.wasteTypes.includes(filterWasteType)) return false;
    if (searchQuery && 
        !request.requestId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.citizen.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const stats = {
    total: filteredData.length,
    pending: filteredData.filter(r => r.status === 'pending').length,
    collected: filteredData.filter(r => r.status === 'collected').length,
    overdue: filteredData.filter(r => r.status === 'overdue').length
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Master Waste Collection Sheet</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Save Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="text-sm text-slate-600">Total Records</div>
              <div className="text-slate-900">{stats.total}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Pending</div>
              <div className="text-orange-600">{stats.pending} ({Math.round((stats.pending/stats.total)*100)}%)</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Collected</div>
              <div className="text-green-600">{stats.collected} ({Math.round((stats.collected/stats.total)*100)}%)</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Overdue</div>
              <div className="text-red-600">{stats.overdue} ({Math.round((stats.overdue/stats.total)*100)}%)</div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-5 gap-3">
            <Select value={filterArea} onValueChange={setFilterArea}>
              <SelectTrigger>
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Zone A">Zone A</SelectItem>
                <SelectItem value="Zone B">Zone B</SelectItem>
                <SelectItem value="Zone C">Zone C</SelectItem>
                <SelectItem value="Zone D">Zone D</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="collected">Collected</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterWasteType} onValueChange={setFilterWasteType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
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

            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by ID, citizen, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">{selectedRows.length} rows selected</span>
              <Button size="sm" variant="outline">Export Selected</Button>
              <Button size="sm" variant="outline">Reassign Dealer</Button>
              <Button size="sm" variant="outline">Generate Report</Button>
            </div>
          )}

          {/* Master Data Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.length === paginatedData.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows(paginatedData.map(r => r.requestId));
                          } else {
                            setSelectedRows([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Citizen</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Time Pref</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((request) => (
                    <TableRow key={request.requestId} className={getRowClass(request)}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(request.requestId)}
                          onCheckedChange={() => toggleRowSelection(request.requestId)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{request.requestId}</TableCell>
                      <TableCell className="text-sm">
                        {request.date}
                        <div className="text-xs text-slate-500">{request.time}</div>
                      </TableCell>
                      <TableCell className="text-sm">{request.area}</TableCell>
                      <TableCell className="text-sm max-w-[150px] truncate" title={request.location}>
                        {request.location}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.citizen}
                        <div className="text-xs text-slate-500">{request.contact}</div>
                      </TableCell>
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
                      <TableCell className="text-sm">
                        {request.dealerAssigned}
                        <div className="text-xs text-slate-500">{request.collector}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell className="text-sm">
                        {request.storageTime}
                        {request.status === 'overdue' && (
                          <AlertCircle className="w-3 h-3 text-red-500 inline ml-1" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowDetailModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} records
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Details - {selectedRequest?.requestId}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Status</h4>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Priority</h4>
                  {getPriorityBadge(selectedRequest.priority)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Citizen</h4>
                  <p>{selectedRequest.citizen}</p>
                  <p className="text-sm text-slate-500">{selectedRequest.contact}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Location</h4>
                  <p>{selectedRequest.location}</p>
                  <p className="text-sm text-slate-500">{selectedRequest.area}</p>
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
                  <h4 className="text-sm text-slate-600 mb-1">Requested Date/Time</h4>
                  <p>{selectedRequest.date} at {selectedRequest.time}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Time Preference</h4>
                  <p>{selectedRequest.timePreference}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Dealer Assigned</h4>
                  <p>{selectedRequest.dealerAssigned}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Collector</h4>
                  <p>{selectedRequest.collector}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-600 mb-1">Storage Duration</h4>
                  <p>{selectedRequest.storageTime}</p>
                </div>
                {selectedRequest.collectionTime && (
                  <div>
                    <h4 className="text-sm text-slate-600 mb-1">Collection Time</h4>
                    <p>{selectedRequest.collectionTime}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
