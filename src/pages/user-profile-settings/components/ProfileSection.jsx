import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    displayName: 'John Developer',
    email: 'john@codecollab.dev',
    bio: 'Senior Full-Stack Developer with 8+ years of experience in React, Node.js, and cloud technologies. Passionate about collaborative coding and mentoring junior developers.',
    location: 'San Francisco, CA',
    website: 'https://johndeveloper.dev',
    github: 'johndeveloper',
    linkedin: 'john-developer',
    twitter: 'johndev'
  });

  const [avatarPreview, setAvatarPreview] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal information and how others see you on CodeCollab.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Camera" size={20} />
          <span>Profile Avatar</span>
        </h4>
        
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 transform-3d group-hover:scale-105 transition-transform duration-300 spring">
              <Image
                src={avatarPreview}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="animate-spin text-primary" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Icon name="Camera" size={20} color="white" />
            </div>
          </div>
          
          <div className="flex-1">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                disabled={isUploading}
                className="cursor-pointer"
              >
                {isUploading ? 'Uploading...' : 'Change Avatar'}
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 5MB. Recommended 400x400px.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="User" size={20} />
          <span>Basic Information</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Display Name"
            type="text"
            value={profileData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
            placeholder="Enter your display name"
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            required
            description="This will be your primary contact email"
          />
          
          <Input
            label="Location"
            type="text"
            value={profileData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, Country"
          />
          
          <Input
            label="Website"
            type="url"
            value={profileData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell others about yourself..."
            rows={4}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {profileData.bio.length}/500 characters
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Link" size={20} />
          <span>Social Links</span>
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Github" size={18} />
            </div>
            <Input
              label="GitHub Username"
              type="text"
              value={profileData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="username"
              className="flex-1"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Linkedin" size={18} />
            </div>
            <Input
              label="LinkedIn Profile"
              type="text"
              value={profileData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="profile-name"
              className="flex-1"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Twitter" size={18} />
            </div>
            <Input
              label="Twitter Handle"
              type="text"
              value={profileData.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value)}
              placeholder="username"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
        >
          {isSaving ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;