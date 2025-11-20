import { useState } from 'react';
import { Search, MapPin, Calendar, User, FileText, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Badge } from './ui/badge';

interface SearchResult {
  id: string;
  title: string;
  type: 'request' | 'dealer' | 'zone' | 'report';
  description: string;
  badge?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Request #WR001234',
    type: 'request',
    description: 'Plastic & Paper - 15 kg - Zone A',
    badge: 'En Route'
  },
  {
    id: '2',
    title: 'Ramesh Kumar',
    type: 'dealer',
    description: 'Collection Dealer - Zone A, B',
    badge: 'Active'
  },
  {
    id: '3',
    title: 'Zone A - MG Road',
    type: 'zone',
    description: '234 active users - 12 dealers',
    badge: 'High Priority'
  },
  {
    id: '4',
    title: 'Monthly Collection Report',
    type: 'report',
    description: 'November 2025 - 47.8T collected',
    badge: 'Recent'
  }
];

interface GlobalSearchProps {
  role: 'citizen' | 'dealer' | 'admin';
}

export default function GlobalSearch({ role }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'request':
        return <FileText className="w-4 h-4" />;
      case 'dealer':
        return <User className="w-4 h-4" />;
      case 'zone':
        return <MapPin className="w-4 h-4" />;
      case 'report':
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  useState(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  });

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search requests, dealers, zones..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Recent Searches">
            {mockSearchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => {
                  setOpen(false);
                }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded">
                  {getIcon(result.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{result.title}</span>
                    {result.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {result.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{result.description}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Quick Actions">
            {role === 'citizen' && (
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Schedule New Pickup</span>
              </CommandItem>
            )}
            {role === 'dealer' && (
              <CommandItem>
                <MapPin className="mr-2 h-4 w-4" />
                <span>View Route Map</span>
              </CommandItem>
            )}
            {role === 'admin' && (
              <CommandItem>
                <TrendingUp className="mr-2 h-4 w-4" />
                <span>Generate Report</span>
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
