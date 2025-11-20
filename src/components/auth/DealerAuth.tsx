import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Toaster } from '../ui/sonner';
import { Truck, Mail, Lock, Phone, MapPin, ArrowLeft, Building } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DealerAuthProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

export default function DealerAuth({ onLogin, onBack }: DealerAuthProps) {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerCompany, setRegisterCompany] = useState('');
  const [registerVehicle, setRegisterVehicle] = useState('');
  const [registerLicense, setRegisterLicense] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mock validation
    if (loginPassword.length < 6) {
      toast.error('Invalid credentials');
      return;
    }

    toast.success('Login successful!');
    onLogin({
      role: 'dealer',
      name: 'Ramesh Kumar',
      email: loginEmail,
      phone: '+91 98765 43210',
      company: 'GreenCollect Services',
      vehicle: 'KA-01-AB-1234',
      zone: 'Zone A'
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPhone || !registerCompany || 
        !registerVehicle || !registerLicense || !registerPassword || !registerConfirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (registerPhone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    toast.success('Registration successful! Please wait for admin approval.');
    setActiveTab('login');
    setLoginEmail(registerEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle>Dealer Portal</CardTitle>
            <CardDescription>
              Manage collections and optimize routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Login
                  </Button>

                  <div className="text-center">
                    <Button variant="link" type="button" className="text-sm">
                      Forgot Password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-company">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-company"
                        type="text"
                        placeholder="GreenCollect Services"
                        className="pl-10"
                        value={registerCompany}
                        onChange={(e) => setRegisterCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-vehicle">Vehicle Number</Label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-vehicle"
                        type="text"
                        placeholder="KA-01-AB-1234"
                        className="pl-10"
                        value={registerVehicle}
                        onChange={(e) => setRegisterVehicle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-license">Business License Number</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-license"
                        type="text"
                        placeholder="LIC-2025-001234"
                        className="pl-10"
                        value={registerLicense}
                        onChange={(e) => setRegisterLicense(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Register as Dealer
                  </Button>

                  <p className="text-xs text-center text-slate-600">
                    Registration requires admin approval. You'll receive an email once verified.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <p className="text-sm text-orange-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-orange-700">Email: dealer@ecosort.com</p>
            <p className="text-xs text-orange-700">Password: demo123</p>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
