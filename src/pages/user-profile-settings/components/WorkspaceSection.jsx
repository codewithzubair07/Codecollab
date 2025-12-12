import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkspaceSection = () => {
  const [workspaceSettings, setWorkspaceSettings] = useState({
    environment: 'cyberpunk',
    particleIntensity: 'medium',
    animationSpeed: 'normal',
    collaboratorIndicators: {
      showAvatars: true,
      showCursors: true,
      showTypingIndicators: true,
      showPresenceStatus: true
    },
    visualEffects: {
      codeExecution: true,
      successAnimations: true,
      errorHighlights: true,
      focusMode: false
    },
    workspace3D: {
      enableRotation: true,
      autoOrbit: false,
      depthOfField: true,
      ambientLighting: 'warm'
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const environments = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Neon-lit futuristic environment',
      preview: 'bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900',
      colors: ['#8B5CF6', '#3B82F6', '#EC4899']
    },
    {
      id: 'forest',
      name: 'Digital Forest',
      description: 'Calming green nature theme',
      preview: 'bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900',
      colors: ['#10B981', '#14B8A6', '#059669']
    },
    {
      id: 'space',
      name: 'Deep Space',
      description: 'Cosmic void with stellar effects',
      preview: 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900',
      colors: ['#1F2937', '#1E40AF', '#3730A3']
    },
    {
      id: 'sunset',
      name: 'Digital Sunset',
      description: 'Warm orange and pink gradients',
      preview: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
      colors: ['#EA580C', '#DC2626', '#BE185D']
    }
  ];

  const particleIntensities = [
    { id: 'low', name: 'Low', description: 'Minimal particles for better performance' },
    { id: 'medium', name: 'Medium', description: 'Balanced visual effects' },
    { id: 'high', name: 'High', description: 'Maximum visual impact' },
    { id: 'off', name: 'Off', description: 'Disable all particle effects' }
  ];

  const animationSpeeds = [
    { id: 'slow', name: 'Slow', description: 'Gentle, relaxed animations' },
    { id: 'normal', name: 'Normal', description: 'Standard animation timing' },
    { id: 'fast', name: 'Fast', description: 'Quick, snappy animations' }
  ];

  const lightingOptions = [
    { id: 'warm', name: 'Warm', color: 'bg-orange-500' },
    { id: 'cool', name: 'Cool', color: 'bg-blue-500' },
    { id: 'neutral', name: 'Neutral', color: 'bg-gray-500' },
    { id: 'dynamic', name: 'Dynamic', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
  ];

  const handleSettingChange = (category, key, value) => {
    if (category) {
      setWorkspaceSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      }));
    } else {
      setWorkspaceSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Workspace Customization</h3>
        <p className="text-sm text-muted-foreground">
          Personalize your 3D coding environment and visual effects for an immersive experience.
        </p>
      </div>

      {/* 3D Environment Selection */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Globe" size={20} />
          <span>3D Environment</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => handleSettingChange(null, 'environment', env.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 spring text-left ${
                workspaceSettings.environment === env.id
                  ? 'border-primary shadow-elevated'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <div className={`w-full h-20 rounded-lg ${env.preview} mb-3 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2 flex space-x-1">
                  {env.colors.map((color, index) => (
                    <div key={index} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>
              <h5 className="font-medium text-foreground mb-1">{env.name}</h5>
              <p className="text-xs text-muted-foreground">{env.description}</p>
              {workspaceSettings.environment === env.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Effects Settings */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Sparkles" size={20} />
          <span>Visual Effects</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Particle Intensity</label>
            <div className="space-y-2">
              {particleIntensities.map((intensity) => (
                <button
                  key={intensity.id}
                  onClick={() => handleSettingChange(null, 'particleIntensity', intensity.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    workspaceSettings.particleIntensity === intensity.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{intensity.name}</p>
                    <p className="text-xs opacity-70">{intensity.description}</p>
                  </div>
                  {workspaceSettings.particleIntensity === intensity.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Animation Speed</label>
            <div className="space-y-2">
              {animationSpeeds.map((speed) => (
                <button
                  key={speed.id}
                  onClick={() => handleSettingChange(null, 'animationSpeed', speed.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    workspaceSettings.animationSpeed === speed.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{speed.name}</p>
                    <p className="text-xs opacity-70">{speed.description}</p>
                  </div>
                  {workspaceSettings.animationSpeed === speed.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Indicators */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Users" size={20} />
          <span>Collaboration Indicators</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Show Avatars"
              description="Display 3D avatars for collaborators"
              checked={workspaceSettings.collaboratorIndicators.showAvatars}
              onChange={(e) => handleSettingChange('collaboratorIndicators', 'showAvatars', e.target.checked)}
            />
            
            <Checkbox
              label="Show Cursors"
              description="Real-time cursor tracking"
              checked={workspaceSettings.collaboratorIndicators.showCursors}
              onChange={(e) => handleSettingChange('collaboratorIndicators', 'showCursors', e.target.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Typing Indicators"
              description="Show when others are typing"
              checked={workspaceSettings.collaboratorIndicators.showTypingIndicators}
              onChange={(e) => handleSettingChange('collaboratorIndicators', 'showTypingIndicators', e.target.checked)}
            />
            
            <Checkbox
              label="Presence Status"
              description="Online/offline status indicators"
              checked={workspaceSettings.collaboratorIndicators.showPresenceStatus}
              onChange={(e) => handleSettingChange('collaboratorIndicators', 'showPresenceStatus', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Advanced 3D Settings */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Box" size={20} />
          <span>Advanced 3D Settings</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Enable Rotation"
              description="Allow 3D workspace rotation"
              checked={workspaceSettings.workspace3D.enableRotation}
              onChange={(e) => handleSettingChange('workspace3D', 'enableRotation', e.target.checked)}
            />
            
            <Checkbox
              label="Auto Orbit"
              description="Automatic camera movement"
              checked={workspaceSettings.workspace3D.autoOrbit}
              onChange={(e) => handleSettingChange('workspace3D', 'autoOrbit', e.target.checked)}
            />
            
            <Checkbox
              label="Depth of Field"
              description="Blur background elements"
              checked={workspaceSettings.workspace3D.depthOfField}
              onChange={(e) => handleSettingChange('workspace3D', 'depthOfField', e.target.checked)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Ambient Lighting</label>
            <div className="grid grid-cols-2 gap-2">
              {lightingOptions.map((lighting) => (
                <button
                  key={lighting.id}
                  onClick={() => handleSettingChange('workspace3D', 'ambientLighting', lighting.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    workspaceSettings.workspace3D.ambientLighting === lighting.id
                      ? 'border-primary bg-primary/10' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${lighting.color} mx-auto mb-2`}></div>
                  <p className="text-xs font-medium text-foreground">{lighting.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Effect Toggles */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Interactive Effects</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Code Execution Effects"
              description="Visual feedback when running code"
              checked={workspaceSettings.visualEffects.codeExecution}
              onChange={(e) => handleSettingChange('visualEffects', 'codeExecution', e.target.checked)}
            />
            
            <Checkbox
              label="Success Animations"
              description="Celebrate successful operations"
              checked={workspaceSettings.visualEffects.successAnimations}
              onChange={(e) => handleSettingChange('visualEffects', 'successAnimations', e.target.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Error Highlights"
              description="Visual emphasis on errors"
              checked={workspaceSettings.visualEffects.errorHighlights}
              onChange={(e) => handleSettingChange('visualEffects', 'errorHighlights', e.target.checked)}
            />
            
            <Checkbox
              label="Focus Mode"
              description="Dim inactive code sections"
              checked={workspaceSettings.visualEffects.focusMode}
              onChange={(e) => handleSettingChange('visualEffects', 'focusMode', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Eye" size={20} />
          <span>Live Preview</span>
        </h4>
        
        <div className="bg-muted/30 rounded-lg p-6 border border-border">
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Icon name="Monitor" size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">3D Workspace Preview</p>
              <p className="text-xs opacity-70">Changes will be reflected in your coding environment</p>
            </div>
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
          {isSaving ? 'Saving Workspace...' : 'Save Workspace Settings'}
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceSection;