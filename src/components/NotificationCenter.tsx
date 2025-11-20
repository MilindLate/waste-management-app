import { useState } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'collection';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'collection',
    title: 'Collection En Route',
    message: 'Your waste collector is 15 minutes away from your location.',
    timestamp: '5 min ago',
    read: false
  },
  {
    id: '2',
    type: 'success',
    title: 'Pickup Confirmed',
    message: 'Your waste pickup for Nov 7 has been confirmed.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'EcoPoints Earned',
    message: 'You earned 50 EcoPoints for your last recycling contribution!',
    timestamp: '2 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'warning',
    title: 'Pickup Reminder',
    message: 'Scheduled pickup tomorrow at 9 AM. Please keep waste ready.',
    timestamp: 'Yesterday',
    read: true
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'collection':
        return <Truck className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50';
      case 'warning':
        return 'bg-amber-50';
      case 'collection':
        return 'bg-blue-50';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Stay updated with your waste management activities
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="w-full"
            >
              Mark all as read
            </Button>
          )}

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`${!notification.read ? 'border-emerald-200' : ''} transition-all`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className={`${getBackgroundColor(notification.type)} p-2 rounded-lg h-fit`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className="text-sm mb-1">
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                                )}
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400">
                                {notification.timestamp}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 -mt-1"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-7 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
