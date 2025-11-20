# 🚀 EcoSort Quick Start Guide

## For New Users

### Getting Started in 3 Steps

#### 1. Choose Your Role
On the landing page, select your role:
- **👤 Citizen**: Schedule waste pickups and track collections
- **🚛 Dealer**: Manage collection routes and operations  
- **🛡️ Admin**: Monitor system and manage resources

#### 2. Login or Register
Each role has dedicated authentication:

**Demo Credentials Available**:

**Citizen Portal**
- Email: `demo@citizen.com`
- Password: `citizen123`

**Dealer Portal**
- Username: `dealer1`
- Password: `dealer123`

**Admin Portal**
- Username: `admin`
- Password: `admin123`
- 2FA Code: `123456`

#### 3. Start Using the Platform

**As a Citizen**:
1. Click "Schedule Pickup" on your dashboard
2. Fill out the multi-step form
3. Track your request in the "Active Requests" section
4. Earn EcoPoints for completed pickups!

**As a Dealer**:
1. View your assigned collections in the sheet
2. Use the interactive map to plan your route
3. Click "Navigate" to get directions
4. Mark collections as completed with photos

**As an Admin**:
1. Check the Overview tab for system metrics
2. Review dealer performance
3. Manage zones and assignments
4. Generate reports and analytics

---

## For Developers

### Project Setup

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
/
├── App.tsx                    # Main router & landing page
├── components/
│   ├── auth/                  # Authentication components
│   │   ├── CitizenAuth.tsx
│   │   ├── DealerAuth.tsx
│   │   └── AdminAuth.tsx
│   ├── citizen/               # Citizen-specific components
│   ├── admin/                 # Admin tab components
│   ├── MapplsMap.tsx          # Map integration component
│   ├── CitizenDashboard.tsx   # Citizen dashboard
│   ├── DealerDashboard.tsx    # Dealer dashboard (with map)
│   ├── AdminDashboard.tsx     # Admin dashboard
│   └── ui/                    # ShadCN UI components
└── styles/
    └── globals.css            # Global styles & tokens
```

### Key Files to Know

**Main Application**:
- `App.tsx` - Routing, landing page, role selection
- `styles/globals.css` - Design tokens, typography

**Dashboards**:
- `CitizenDashboard.tsx` - User-facing interface
- `DealerDashboard.tsx` - Collection management with map
- `AdminDashboard.tsx` - Administrative controls

**Map Integration**:
- `MapplsMap.tsx` - Interactive map component
- See `MAP_INTEGRATION.md` for details

**Authentication**:
- `auth/CitizenAuth.tsx` - Citizen login/register
- `auth/DealerAuth.tsx` - Dealer login/register
- `auth/AdminAuth.tsx` - Admin login with 2FA

### Understanding the State Flow

#### Landing Page → Auth → Dashboard

```
Landing Page (App.tsx)
    ↓ (User selects role)
Role Selection
    ↓ (Clicks "Enter Portal")
Auth Component (Role-specific)
    ↓ (Successful login)
Dashboard Component
```

#### Current State Management

```typescript
// In App.tsx
const [currentPage, setCurrentPage] = useState('landing');
const [selectedRole, setSelectedRole] = useState<string | null>(null);

// State transitions:
'landing' → 'citizen-auth' → 'citizen-dashboard'
'landing' → 'dealer-auth' → 'dealer-dashboard'
'landing' → 'admin-auth' → 'admin-dashboard'
```

### Working with the Map

#### Basic Usage

```tsx
import MapplsMap from './components/MapplsMap';

<MapplsMap
  locations={locations}  // Array of MapLocation objects
  onLocationClick={(loc) => {
    // Handle marker click
    console.log('Clicked:', loc);
  }}
/>
```

#### MapLocation Interface

```typescript
interface MapLocation {
  id: number;
  lat: number;          // Latitude (decimal)
  lng: number;          // Longitude (decimal)
  location: string;     // Address
  citizenName: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'pending' | 'collected';
  wasteTypes: string[];
  quantity: number;     // kg
  contact?: string;
}
```

### Customizing the Design

#### Color Scheme

Edit `styles/globals.css`:

```css
:root {
  --primary: #059669;        /* Emerald green */
  --secondary: #14b8a6;      /* Teal */
  --accent-blue: #3b82f6;    /* Citizen */
  --accent-orange: #f97316;  /* Dealer */
  --accent-purple: #8b5cf6;  /* Admin */
}
```

#### Typography

Do NOT use Tailwind classes for:
- Font size (handled by globals.css)
- Font weight (handled by globals.css)
- Line height (handled by globals.css)

Only use semantic HTML tags: `<h1>`, `<h2>`, `<h3>`, etc.

### Adding New Features

#### 1. Create Component

```tsx
// components/MyNewComponent.tsx
export default function MyNewComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Feature</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Your content */}
      </CardContent>
    </Card>
  );
}
```

#### 2. Import in Dashboard

```tsx
import MyNewComponent from './MyNewComponent';

// In dashboard component:
<MyNewComponent />
```

#### 3. Add State if Needed

```tsx
const [myState, setMyState] = useState(initialValue);
```

### Using ShadCN Components

Available components in `/components/ui/`:
- `button`, `card`, `badge`, `input`, `select`
- `dialog`, `alert`, `toast`, `tabs`, `table`
- `checkbox`, `switch`, `slider`, `calendar`
- And many more!

**Import Example**:
```tsx
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
```

### Common Tasks

#### Add a New Tab to Admin Dashboard

1. Create new file: `components/admin/MyNewTab.tsx`
2. Add tab to `AdminDashboard.tsx`:
```tsx
<TabsList>
  <TabsTrigger value="mynew">My New Tab</TabsTrigger>
</TabsList>
<TabsContent value="mynew">
  <MyNewTab />
</TabsContent>
```

#### Add Form Validation

Use React Hook Form:
```tsx
import { useForm } from 'react-hook-form@7.55.0';

const { register, handleSubmit, formState: { errors } } = useForm();
```

#### Show Toast Notification

```tsx
import { toast } from 'sonner@2.0.3';

toast.success('Success message');
toast.error('Error message');
toast('Info message');
```

#### Add Animation

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### MapmyIndia API Key

Current API key: `b1c23a72ffa93441c0caa32e7cea6992`

**⚠️ Security Note**: For production, move API key to:
- Environment variables
- Server-side proxy
- Secure configuration service

### Testing Your Changes

#### Manual Testing Checklist

**Landing Page**:
- [ ] All three role cards display correctly
- [ ] Dark mode toggle works
- [ ] Search opens (⌘K or Ctrl+K)
- [ ] Notifications panel opens
- [ ] User profile opens
- [ ] Mobile responsive

**Authentication**:
- [ ] Form validation works
- [ ] Demo credentials work
- [ ] Error messages display
- [ ] Success redirects to dashboard

**Citizen Dashboard**:
- [ ] Schedule pickup form works (all steps)
- [ ] Active requests display
- [ ] History shows past pickups
- [ ] EcoPoints update
- [ ] Education resources load

**Dealer Dashboard**:
- [ ] Collection sheet loads with data
- [ ] Filters work (status, waste type, search)
- [ ] Map displays all locations
- [ ] Markers show correct colors
- [ ] Clicking marker opens details
- [ ] Navigate button opens Google Maps
- [ ] Mark collected updates status
- [ ] Map filters work

**Admin Dashboard**:
- [ ] Overview stats display
- [ ] Charts render correctly
- [ ] All tabs accessible
- [ ] Data tables functional
- [ ] Export features work

### Debugging Tips

#### Map Not Loading
1. Check browser console for errors
2. Verify API key is correct
3. Check network tab for failed requests
4. Ensure coordinates are valid (lat/lng)

#### Component Not Rendering
1. Check import paths
2. Verify component export (default vs named)
3. Look for TypeScript errors
4. Check parent component state

#### Styles Not Applying
1. Verify Tailwind class names
2. Check for conflicting styles
3. Inspect element in DevTools
4. Review `globals.css` tokens

### Performance Best Practices

1. **Use React.memo** for expensive components
2. **Lazy load** large components
3. **Debounce** search inputs
4. **Virtualize** long lists
5. **Optimize images** (use WebP, lazy load)
6. **Code split** by route

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature

# Create pull request
```

### Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## Common Issues & Solutions

### Issue: Module not found
**Solution**: Check import path, ensure file exists

### Issue: Component props error
**Solution**: Verify interface/type definitions match

### Issue: Map markers not showing
**Solution**: Check lat/lng values, verify data format

### Issue: Toast not appearing
**Solution**: Ensure Toaster component is rendered in App

### Issue: Dark mode not working
**Solution**: Check localStorage value, verify CSS variables

---

## Resources

### Documentation
- [README.md](./README.md) - Project overview
- [MAP_INTEGRATION.md](./MAP_INTEGRATION.md) - Map details
- [AUTH_IMPLEMENTATION.md](./AUTH_IMPLEMENTATION.md) - Auth guide
- [LANDING_PAGE_ENHANCEMENTS.md](./LANDING_PAGE_ENHANCEMENTS.md) - Landing page info

### External Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)
- [Mappls API](https://apis.mappls.com/docs/)
- [Lucide Icons](https://lucide.dev)

---

## Need Help?

### For Users
1. Check the FAQ section on landing page
2. Use the in-app search (⌘K)
3. Review your dashboard's help sections

### For Developers
1. Read the relevant `.md` documentation
2. Check code comments
3. Review component examples
4. Use browser DevTools for debugging

---

## Next Steps

### For Users
- ✅ Explore your dashboard
- ✅ Try the demo features
- ✅ Schedule a test pickup (Citizens)
- ✅ Plan a route (Dealers)
- ✅ Review analytics (Admins)

### For Developers
- ✅ Set up development environment
- ✅ Explore component structure
- ✅ Make a small change
- ✅ Test your changes
- ✅ Read the documentation
- ✅ Start building features!

---

## Success Tips

### For Citizens
💡 **Tip**: Segregate waste properly to earn more EcoPoints!
💡 **Tip**: Schedule pickups during off-peak hours for faster service
💡 **Tip**: Check the Education Hub to learn best practices

### For Dealers
💡 **Tip**: Use map filters to focus on urgent pickups first
💡 **Tip**: Plan routes by zone to save time and fuel
💡 **Tip**: Update pickup status promptly for better ratings

### For Admins
💡 **Tip**: Monitor dealer performance weekly
💡 **Tip**: Use predictive analytics for zone planning
💡 **Tip**: Export reports regularly for stakeholders

### For Developers
💡 **Tip**: Start with small changes to understand the codebase
💡 **Tip**: Use TypeScript types to avoid runtime errors
💡 **Tip**: Test on mobile devices early and often
💡 **Tip**: Read existing code before adding new features

---

## Welcome to EcoSort! 🌱

Thank you for choosing EcoSort. Together, we're making waste management smarter, cleaner, and more sustainable. Whether you're a user or a developer, your contribution matters!

**Let's build a greener future! ♻️**
