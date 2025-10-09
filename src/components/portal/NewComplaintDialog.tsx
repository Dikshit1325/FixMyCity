import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Plus, Camera, Upload, X, Mic, Type } from 'lucide-react';
import { complaintServiceTypes, locationOptions } from './data';
import { NewComplaint, ComplaintWithVote } from './types';
import VoiceInput from './VoiceInput';

interface NewComplaintDialogProps {
  onComplaintSubmit: (complaint: ComplaintWithVote) => void;
}

const NewComplaintDialog = ({ onComplaintSubmit }: NewComplaintDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState<NewComplaint>({
    serviceType: '',
    location: '',
    title: '',
    description: '',
    images: [],
    priority: 'medium'
  });
  const [dragActive, setDragActive] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'voice'>('text');

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        
        // Check file type
        const allowedTypes = ['image/', 'video/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const isValidType = allowedTypes.some(type => file.type.startsWith(type));
        
        if (!isValidType) {
          toast.error(`${file.name} is not a supported file type`);
          return false;
        }
        
        return true;
      });

      const newImages = validFiles.slice(0, 5 - newComplaint.images.length);
      
      if (newImages.length > 0) {
        setNewComplaint(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
        toast.success(`${newImages.length} file(s) uploaded successfully`);
      }
      
      if (validFiles.length > newImages.length) {
        toast.error('Maximum 5 files allowed');
      }
    }
  };

  const removeImage = (index: number) => {
    setNewComplaint(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const submitComplaint = () => {
    if (!newComplaint.serviceType || !newComplaint.location || !newComplaint.title || !newComplaint.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newComplaintData: ComplaintWithVote = {
      id: `CMP${Date.now()}`,
      title: newComplaint.title,
      description: newComplaint.description,
      category: complaintServiceTypes.find(s => s.value === newComplaint.serviceType)?.label || '',
      status: 'Pending',
      priority: newComplaint.priority,
      submittedBy: 'Akshita',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      location: locationOptions.find(l => l.value === newComplaint.location)?.label || '',
      votes: 0,
      hasVoted: false
    };

    onComplaintSubmit(newComplaintData);
    toast.success('Complaint submitted successfully!');
    setIsOpen(false);
    setNewComplaint({
      serviceType: '',
      location: '',
      title: '',
      description: '',
      images: [],
      priority: 'medium'
    });
    setInputMethod('text');
  };

  const handleVoiceTranscript = (transcript: string) => {
    // Parse voice input to extract complaint details
    const cleanTranscript = transcript.trim();
    
    if (cleanTranscript) {
      // If it's a short phrase, use as title; if longer, use as description
      if (cleanTranscript.length < 50) {
        setNewComplaint(prev => ({ ...prev, title: cleanTranscript }));
      } else {
        // Try to extract title (first sentence) and description
        const sentences = cleanTranscript.split(/[.!?]+/);
        const title = sentences[0]?.trim() || '';
        const description = sentences.slice(1).join('. ').trim() || cleanTranscript;
        
        setNewComplaint(prev => ({
          ...prev,
          title: title.length > 0 ? title : 'Voice complaint',
          description: description
        }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2 self-start">
          <Plus className="h-4 w-4" />
          <span className="text-sm sm:text-base">Lodge New Complaint</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg sm:text-xl">Lodge New Complaint</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Submit a new complaint about civic issues in your area. You can use text or voice input to describe the problem.
          </DialogDescription>
        </DialogHeader>
        
        {/* Input Method Selection */}
        <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'text' | 'voice')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Text Input</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center space-x-2">
              <Mic className="h-4 w-4" />
              <span>Voice Input</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            {/* Service Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="service-type" className="text-sm sm:text-base">Service Type *</Label>
              <Select value={newComplaint.serviceType} onValueChange={(value) => 
                setNewComplaint(prev => ({ ...prev, serviceType: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {complaintServiceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{service.icon}</span>
                        <span className="text-sm">{service.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm sm:text-base">Location *</Label>
              <Select value={newComplaint.location} onValueChange={(value) => 
                setNewComplaint(prev => ({ ...prev, location: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location.value} value={location.value} className="text-sm">
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm sm:text-base">Complaint Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                className="h-10 sm:h-auto text-sm sm:text-base"
                value={newComplaint.title}
                onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm sm:text-base">Priority Level</Label>
              <Select value={newComplaint.priority} onValueChange={(value: 'low' | 'medium' | 'high') => 
                setNewComplaint(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="text-sm">Low Priority</SelectItem>
                  <SelectItem value="medium" className="text-sm">Medium Priority</SelectItem>
                  <SelectItem value="high" className="text-sm">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm sm:text-base">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Upload Files (Optional)</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  Drag and drop images here, or click to select
                </p>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  Maximum 5 images, up to 10MB each
                </p>
                <Input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-sm">Choose Files</span>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simulate opening camera
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.capture = 'environment';
                      input.onchange = (e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files) handleImageUpload(target.files);
                      };
                      input.click();
                    }}
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    <span className="text-sm">Take Photo</span>
                  </Button>
                </div>
              </div>

              {/* Image Preview */}
              {newComplaint.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                  {newComplaint.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-16 sm:h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                className="order-2 sm:order-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitComplaint}
                className="order-1 sm:order-2"
              >
                Submit Complaint
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            {/* Service Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="service-type" className="text-sm sm:text-base">Service Type *</Label>
              <Select value={newComplaint.serviceType} onValueChange={(value) => 
                setNewComplaint(prev => ({ ...prev, serviceType: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {complaintServiceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{service.icon}</span>
                        <span className="text-sm">{service.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm sm:text-base">Location *</Label>
              <Select value={newComplaint.location} onValueChange={(value) => 
                setNewComplaint(prev => ({ ...prev, location: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location.value} value={location.value} className="text-sm">
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm sm:text-base">Priority Level</Label>
              <Select value={newComplaint.priority} onValueChange={(value: 'low' | 'medium' | 'high') => 
                setNewComplaint(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger className="h-10 sm:h-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="text-sm">Low Priority</SelectItem>
                  <SelectItem value="medium" className="text-sm">Medium Priority</SelectItem>
                  <SelectItem value="high" className="text-sm">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Voice Input Section */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Voice Complaint *</Label>
              <div className="p-4 border rounded-lg bg-muted/30">
                <VoiceInput 
                  onTranscriptUpdate={handleVoiceTranscript}
                  placeholder="Tap the microphone and describe your complaint. Speak clearly and include details about the issue and location."
                />
              </div>
            </div>

            {/* Show extracted title and description */}
            {(newComplaint.title || newComplaint.description) && (
              <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Label className="text-sm sm:text-base">Extracted Information:</Label>
                {newComplaint.title && (
                  <div>
                    <p className="text-xs text-muted-foreground">Title:</p>
                    <p className="text-sm font-medium">{newComplaint.title}</p>
                  </div>
                )}
                {newComplaint.description && (
                  <div>
                    <p className="text-xs text-muted-foreground">Description:</p>
                    <p className="text-sm">{newComplaint.description}</p>
                  </div>
                )}
              </div>
            )}

            {/* Image Upload - same as text version */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Upload Files (Optional)</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  Maximum 5 files (images, videos, PDFs, documents), up to 10MB each
                </p>
                <Input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  id="image-upload-voice"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('image-upload-voice')?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-sm">Choose Files</span>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simulate opening camera
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.capture = 'environment';
                      input.onchange = (e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files) handleImageUpload(target.files);
                      };
                      input.click();
                    }}
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    <span className="text-sm">Take Photo</span>
                  </Button>
                </div>
              </div>

              {/* Image Preview */}
              {newComplaint.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                  {newComplaint.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-16 sm:h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                className="order-2 sm:order-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitComplaint}
                className="order-1 sm:order-2"
              >
                Submit Complaint
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewComplaintDialog;