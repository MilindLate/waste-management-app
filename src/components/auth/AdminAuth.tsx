import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Toaster } from '../ui/sonner';
import { Shield, Mail, Lock, ArrowLeft, KeyRound } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from '../ui/alert';

interface AdminAuthProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

export default function AdminAuth({ onLogin, onBack }: AdminAuthProps) {
  // Login state only - no registration for admin
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);

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

    // Simulate 2FA requirement
    if (!showTwoFactor) {
      setShowTwoFactor(true);
      toast.info('Two-factor authentication code sent to your email');
      return;
    }

    if (!twoFactorCode || twoFactorCode.length !== 6) {
      toast.error('Please enter valid 6-digit code');
      return;
    }

    toast.success('Login successful!');
    onLogin({
      role: 'admin',
      name: 'Admin User',
      email: loginEmail,
      phone: '+91 98765 43210',
      department: 'System Administration'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
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
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle>Admin Portal</CardTitle>
            <CardDescription>
              Secure access for system administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-purple-50 border-purple-200">
              <Shield className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-900">
                Admin access requires special credentials. Contact IT support for access.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@ecosort.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={showTwoFactor}
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
                    disabled={showTwoFactor}
                  />
                </div>
              </div>

              {showTwoFactor && (
                <div className="space-y-2">
                  <Label htmlFor="two-factor-code">Two-Factor Authentication Code</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="two-factor-code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="pl-10 text-center tracking-wider"
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Check your email for the authentication code
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                {showTwoFactor ? 'Verify & Login' : 'Continue'}
              </Button>

              {showTwoFactor && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowTwoFactor(false);
                    setTwoFactorCode('');
                  }}
                >
                  Back to Login
                </Button>
              )}

              <div className="text-center">
                <Button variant="link" type="button" className="text-sm">
                  Contact IT Support
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <p className="text-sm text-purple-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-purple-700">Email: admin@ecosort.com</p>
            <p className="text-xs text-purple-700">Password: demo123</p>
            <p className="text-xs text-purple-700">2FA Code: 123456 (for demo)</p>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-slate-50 border-slate-200">
          <CardContent className="pt-6">
            <p className="text-xs text-slate-600 text-center">
              🔒 All admin sessions are monitored and logged for security purposes
            </p>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
