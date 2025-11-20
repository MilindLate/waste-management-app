import { User, LogOut, Settings, HelpCircle, Award, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface UserProfileProps {
  role: 'citizen' | 'dealer' | 'admin';
  onLogout?: () => void;
  userData?: any;
}

const defaultUserProfiles = {
  citizen: {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    avatar: 'PS',
    stats: {
      label: 'EcoPoints',
      value: '1,250'
    }
  },
  dealer: {
    name: 'Ramesh Kumar',
    email: 'ramesh.dealer@ecosort.com',
    avatar: 'RK',
    stats: {
      label: 'Collections Today',
      value: '24'
    }
  },
  admin: {
    name: 'Admin User',
    email: 'admin@ecosort.com',
    avatar: 'AU',
    stats: {
      label: 'Active Zones',
      value: '12'
    }
  }
};

export default function UserProfile({ role, onLogout, userData }: UserProfileProps) {
  const defaultProfile = defaultUserProfiles[role];
  
  // Use userData if available, otherwise fall back to default
  const profile = userData ? {
    name: userData.name || defaultProfile.name,
    email: userData.email || defaultProfile.email,
    avatar: userData.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || defaultProfile.avatar,
    stats: defaultProfile.stats
  } : defaultProfile;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-sm">
              {profile.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm">{profile.name}</span>
            <span className="text-xs text-slate-500">{profile.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">{profile.name}</p>
              <p className="text-xs text-slate-500">{profile.email}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {role.charAt(0).toUpperCase() + role.slice(1)} Account
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-3">
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-xs text-emerald-700 mb-1">{profile.stats.label}</p>
            <p className="text-xl text-emerald-900">{profile.stats.value}</p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          {role === 'citizen' && (
            <DropdownMenuItem>
              <Award className="mr-2 h-4 w-4" />
              <span>My Rewards</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
