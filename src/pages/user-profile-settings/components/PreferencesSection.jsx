import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    fontSize: 'medium',
    tabSize: 2,
    wordWrap: true,
    lineNumbers: true,
    minimap: true,
    autoSave: true,
    notifications: {
      email: true,
      push: true,
      mentions: true,
      collaborations: true,
      updates: false
    },
    shortcuts: {
      save: 'Ctrl+S',
      find: 'Ctrl+F',
      replace: 'Ctrl+H',
      comment: 'Ctrl+/',
      format: 'Shift+Alt+F'
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const themes = [
    { id: 'dark', name: 'Dark Theme', preview: 'bg-gray-900' },
    { id: 'light', name: 'Light Theme', preview: 'bg-gray-100' },
    { id: 'neon', name: 'Neon Theme', preview: 'bg-gradient-to-br from-purple-900 to-blue-900' },
    { id: 'forest', name: 'Forest Theme', preview: 'bg-gradient-to-br from-green-900 to-teal-900' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small (12px)', size: 'text-xs' },
    { id: 'medium', name: 'Medium (14px)', size: 'text-sm' },
    { id: 'large', name: 'Large (16px)', size: 'text-base' },
    { id: 'xlarge', name: 'Extra Large (18px)', size: 'text-lg' }
  ];

  const handlePreferenceChange = (category, key, value) => {
    if (category) {
      setPreferences(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize your coding environment and notification settings.
        </p>
      </div>

      {/* Theme Selection */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Palette" size={20} />
          <span>Theme & Appearance</span>
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handlePreferenceChange(null, 'theme', theme.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 spring ${
                preferences.theme === theme.id
                  ? 'border-primary shadow-elevated'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <div className={`w-full h-16 rounded-lg ${theme.preview} mb-3`}></div>
              <p className="text-sm font-medium text-foreground">{theme.name}</p>
              {preferences.theme === theme.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Font Size</label>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handlePreferenceChange(null, 'fontSize', size.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    preferences.fontSize === size.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  <span className={size.size}>{size.name}</span>
                  {preferences.fontSize === size.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Tab Size</label>
            <div className="flex space-x-2">
              {[2, 4, 8].map((size) => (
                <button
                  key={size}
                  onClick={() => handlePreferenceChange(null, 'tabSize', size)}
                  className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                    preferences.tabSize === size
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  {size} spaces
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Settings */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Code2" size={20} />
          <span>Editor Settings</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Word Wrap"
              description="Wrap long lines to fit the editor width"
              checked={preferences.wordWrap}
              onChange={(e) => handlePreferenceChange(null, 'wordWrap', e.target.checked)}
            />
            
            <Checkbox
              label="Line Numbers"
              description="Show line numbers in the editor"
              checked={preferences.lineNumbers}
              onChange={(e) => handlePreferenceChange(null, 'lineNumbers', e.target.checked)}
            />
            
            <Checkbox
              label="Minimap"
              description="Show code minimap for navigation"
              checked={preferences.minimap}
              onChange={(e) => handlePreferenceChange(null, 'minimap', e.target.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Auto Save"
              description="Automatically save changes while typing"
              checked={preferences.autoSave}
              onChange={(e) => handlePreferenceChange(null, 'autoSave', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} />
          <span>Notifications</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={preferences.notifications.email}
              onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
            />
            
            <Checkbox
              label="Push Notifications"
              description="Browser push notifications"
              checked={preferences.notifications.push}
              onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
            />
            
            <Checkbox
              label="Mentions"
              description="When someone mentions you"
              checked={preferences.notifications.mentions}
              onChange={(e) => handlePreferenceChange('notifications', 'mentions', e.target.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Collaboration Invites"
              description="New collaboration requests"
              checked={preferences.notifications.collaborations}
              onChange={(e) => handlePreferenceChange('notifications', 'collaborations', e.target.checked)}
            />
            
            <Checkbox
              label="Product Updates"
              description="New features and updates"
              checked={preferences.notifications.updates}
              onChange={(e) => handlePreferenceChange('notifications', 'updates', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Keyboard" size={20} />
          <span>Keyboard Shortcuts</span>
        </h4>
        
        <div className="space-y-3">
          {Object.entries(preferences.shortcuts).map(([action, shortcut]) => (
            <div key={action} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium text-foreground capitalize">
                {action.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-foreground">
                  {shortcut}
                </kbd>
                <Button variant="ghost" size="icon">
                  <Icon name="Edit2" size={14} />
                </Button>
              </div>
            </div>
          ))}
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
          {isSaving ? 'Saving Preferences...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSection;