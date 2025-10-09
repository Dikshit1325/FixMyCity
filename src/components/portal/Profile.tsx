import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Upload, Camera, User, Shield, Settings, Bell, Lock, Globe, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from './LanguageContext';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  status: 'uploading' | 'success' | 'error';
}

const Profile = () => {
  const { t } = useLanguage();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Akshita',
    email: 'akshita@email.com',
    mobile: '+91 9876543210',
    aadhaar: 'XXXX XXXX XXXX 1234',
    addressLine1: '123 Main Street',
    addressLine2: 'Apartment 4B',
    city: 'Bangalore',
    state: 'Karnataka',
    pinCode: '560001',
    occupation: 'Software Engineer',
    dateOfBirth: '1990-05-15'
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: true,
    smsAlerts: false,
    language: 'en',
    theme: 'light'
  });

  const handleImageUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setProfileImage(file);
    setProfileImageUrl(URL.createObjectURL(file));
    toast.success('Profile image uploaded successfully');
  };

  const handleDocumentUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return;
      }

      const newDocument: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: 'success'
      };

      setUploadedDocuments(prev => [...prev, newDocument]);
      toast.success(`${file.name} uploaded successfully`);
    });
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('Document removed');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleDocumentUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreferences = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl">{t('citizenProfile')}</h2>
          <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Badge variant="secondary" className="self-start sm:self-auto">{t('verifiedCitizen')}</Badge>
      </div>

      <Tabs defaultValue="personal" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs sm:text-sm">Settings</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 sm:space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Picture</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                  <AvatarImage src={profileImageUrl} alt="Profile" />
                  <AvatarFallback className="text-lg">AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-image"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('profile-image')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('personalInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input 
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => updateFormData('mobile', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input 
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => updateFormData('occupation', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input 
                    id="aadhaar"
                    value={formData.aadhaar}
                    onChange={(e) => updateFormData('aadhaar', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input 
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={(e) => updateFormData('addressLine1', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input 
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) => updateFormData('addressLine2', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code</Label>
                  <Input 
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => updateFormData('pinCode', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={saveProfile}>
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Identity Documents</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Upload government-issued identity documents for verification</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base">Drag and drop files here, or click to select</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Supported: PDF, JPG, PNG (Max 10MB each)
                    </p>
                  </div>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="document-upload"
                    onChange={(e) => e.target.files && handleDocumentUpload(e.target.files)}
                  />
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => document.getElementById('document-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Uploaded Documents */}
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {uploadedDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="shrink-0">
                              {doc.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                              {doc.status === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                              {doc.status === 'uploading' && <div className="h-5 w-5 animate-spin border-2 border-primary border-t-transparent rounded-full" />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(doc.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Document Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Required Documents</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Aadhaar Card</li>
                      <li>• PAN Card</li>
                      <li>• Address Proof</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Optional Documents</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Voter ID</li>
                      <li>• Driving License</li>
                      <li>• Passport</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about complaint updates</p>
                </div>
                <Switch 
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => updatePreferences('notifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Updates</p>
                  <p className="text-sm text-muted-foreground">Get email notifications for important updates</p>
                </div>
                <Switch 
                  checked={preferences.emailUpdates}
                  onCheckedChange={(checked) => updatePreferences('emailUpdates', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS for urgent notifications</p>
                </div>
                <Switch 
                  checked={preferences.smsAlerts}
                  onCheckedChange={(checked) => updatePreferences('smsAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Application Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={preferences.language} onValueChange={(value) => updatePreferences('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="ta">தமிழ்</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={preferences.theme} onValueChange={(value) => updatePreferences('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => toast.success('Preferences saved!')}>
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button>Change Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">Download My Data</Button>
              <Button variant="destructive" className="w-full">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;