import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { 
  Shield, 
  Phone, 
  Mail, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Globe,
  CreditCard
} from 'lucide-react';

interface AuthSystemProps {
  onAuthSuccess: (user: any) => void;
}

interface LoginData {
  identifier: string; // email, phone, or aadhaar
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  aadhaar: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  agreeTerms: boolean;
  authMethod: 'otp' | 'biometric' | 'password';
}

const AuthSystem = ({ onAuthSuccess }: AuthSystemProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const [loginData, setLoginData] = useState<LoginData>({
    identifier: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    aadhaar: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    agreeTerms: false,
    authMethod: 'otp'
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Telangana',
    'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana',
    'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'West Bengal', 'Odisha'
  ];

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('One uppercase letter');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('One lowercase letter');

    if (/\d/.test(password)) score += 1;
    else feedback.push('One number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('One special character');

    setPasswordStrength({ score, feedback });
  };

  const handleLogin = async () => {
    if (!loginData.identifier || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        name: 'Akshita',
        email: 'akshita@email.com',
        phone: '+91 9876543210',
        verified: true,
        authMethod: 'password'
      };
      
      onAuthSuccess(user);
      toast.success('Login successful! Welcome back, Akshita');
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async () => {
    if (!validateRegistration()) return;

    setIsLoading(true);
    toast.success('Creating your account...', { description: 'Please wait while we set up your citizen portal' });

    // Simulate API call
    setTimeout(() => {
      const user = {
        name: registerData.fullName,
        email: registerData.email,
        phone: registerData.mobile,
        verified: false,
        authMethod: registerData.authMethod
      };
      
      onAuthSuccess(user);
      toast.success(`Welcome to Fix My City, ${registerData.fullName}!`, {
        description: 'Your account has been created successfully. You can now lodge complaints and track their progress.'
      });
      setIsLoading(false);
    }, 2000);
  };

  const validateRegistration = () => {
    if (!registerData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }

    if (!registerData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }

    if (!registerData.mobile.trim()) {
      toast.error('Please enter your mobile number');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate mobile format (Indian)
    const mobileRegex = /^(\+91|91|0)?[6789]\d{9}$/;
    if (!mobileRegex.test(registerData.mobile.replace(/\s+/g, ''))) {
      toast.error('Please enter a valid Indian mobile number');
      return false;
    }

    if (registerData.authMethod === 'password') {
      if (!registerData.password) {
        toast.error('Please enter a password');
        return false;
      }

      if (registerData.password !== registerData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }

      if (passwordStrength.score < 2) {
        toast.error('Please create a stronger password (at least 8 characters with uppercase, lowercase, and number)');
        return false;
      }
    }

    if (!registerData.agreeTerms) {
      toast.error('Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const sendOTP = () => {
    if (!registerData.mobile) {
      toast.error('Please enter your mobile number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast.success('OTP sent to your mobile number');
    }, 1000);
  };

  const verifyOTP = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    toast.success('Mobile number verified successfully');
    setActiveTab('login');
  };

  const enableBiometric = async () => {
    if (!navigator.credentials) {
      toast.error('Biometric authentication not supported');
      return;
    }

    try {
      // This would integrate with WebAuthn API in production
      toast.success('Biometric authentication enabled');
    } catch (error) {
      toast.error('Failed to enable biometric authentication');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Fix My City</h1>
          <p className="text-muted-foreground">Citizen Empowerment Platform</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="identifier">Email, Phone, or Aadhaar</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="identifier"
                        placeholder="Enter your email, phone, or Aadhaar"
                        className="pl-10"
                        value={loginData.identifier}
                        onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) => setLoginData(prev => ({ ...prev, rememberMe: !!checked }))}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Button variant="link" size="sm" className="p-0">
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={() => {
                      setLoginData({ identifier: 'demo@fixmycity.com', password: 'demo123', rememberMe: false });
                      setTimeout(handleLogin, 100);
                    }}
                    disabled={isLoading}
                  >
                    Try Demo Account
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={sendOTP}>
                      <Smartphone className="h-4 w-4 mr-1" />
                      OTP
                    </Button>
                    <Button variant="outline" size="sm" onClick={enableBiometric}>
                      <KeyRound className="h-4 w-4 mr-1" />
                      Biometric
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-1" />
                      OAuth
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Personal Information</h3>
                    
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile">Mobile *</Label>
                        <Input
                          id="mobile"
                          placeholder="+91 9876543210"
                          value={registerData.mobile}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, mobile: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="aadhaar">Aadhaar Number (Optional)</Label>
                      <Input
                        id="aadhaar"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={registerData.aadhaar}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, aadhaar: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Address Information</h3>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        value={registerData.address}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={registerData.city}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={registerData.state} onValueChange={(value) => setRegisterData(prev => ({ ...prev, state: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pinCode">PIN</Label>
                        <Input
                          id="pinCode"
                          placeholder="000000"
                          value={registerData.pinCode}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, pinCode: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Security Settings</h3>
                    
                    <div>
                      <Label htmlFor="authMethod">Preferred Authentication Method</Label>
                      <Select value={registerData.authMethod} onValueChange={(value: any) => setRegisterData(prev => ({ ...prev, authMethod: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="otp">OTP (SMS)</SelectItem>
                          <SelectItem value="biometric">Biometric</SelectItem>
                          <SelectItem value="password">Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {registerData.authMethod === 'password' && (
                      <>
                        <div>
                          <Label htmlFor="registerPassword">Password *</Label>
                          <div className="relative">
                            <Input
                              id="registerPassword"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a password"
                              value={registerData.password}
                              onChange={(e) => {
                                setRegisterData(prev => ({ ...prev, password: e.target.value }));
                                checkPasswordStrength(e.target.value);
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          
                          {registerData.password && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all ${getPasswordStrengthColor()}`}
                                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{getPasswordStrengthText()}</span>
                              </div>
                              {passwordStrength.feedback.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Missing: {passwordStrength.feedback.join(', ')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerData.agreeTerms}
                      onCheckedChange={(checked) => setRegisterData(prev => ({ ...prev, agreeTerms: !!checked }))}
                    />
                    <Label htmlFor="terms" className="text-xs leading-relaxed">
                      I agree to the <Button variant="link" size="sm" className="p-0 h-auto text-xs">Terms of Service</Button> and <Button variant="link" size="sm" className="p-0 h-auto text-xs">Privacy Policy</Button>
                    </Label>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleRegister}
                    disabled={isLoading || !registerData.agreeTerms}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={() => {
                      setRegisterData({
                        fullName: 'Akshita Sharma',
                        email: 'akshita.demo@fixmycity.com',
                        mobile: '+91 9876543210',
                        password: 'Demo123!',
                        confirmPassword: 'Demo123!',
                        aadhaar: '',
                        address: 'Demo Address',
                        city: 'Mumbai',
                        state: 'Maharashtra',
                        pinCode: '400001',
                        agreeTerms: true,
                        authMethod: 'password'
                      });
                      setPasswordStrength({ score: 4, feedback: [] });
                      setTimeout(() => {
                        if (validateRegistration()) {
                          handleRegister();
                        }
                      }, 500);
                    }}
                    disabled={isLoading}
                  >
                    Quick Demo Registration
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* OTP Verification Modal */}
            {otpSent && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle className="text-center">Verify Mobile Number</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">
                      Enter the 6-digit OTP sent to {registerData.mobile}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" onClick={() => setOtpSent(false)}>
                        Cancel
                      </Button>
                      <Button className="flex-1" onClick={verifyOTP}>
                        Verify
                      </Button>
                    </div>
                    <Button variant="link" size="sm" className="w-full">
                      Resend OTP
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Secure • Verified • Trusted</p>
          <p className="mt-1">Powered by Government of India Digital Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;