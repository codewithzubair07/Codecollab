import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and avatar'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Theme, shortcuts, and notifications'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Plug',
      description: 'Connected services and plugins'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'workspace',
      label: 'Workspace',
      icon: 'Palette',
      description: '3D environment customization'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'CreditCard',
      description: 'Subscription and payment'
    }
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Settings</h2>
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 spring group ${
            activeSection === item.id
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-elevated'
              : 'text-foreground hover:bg-muted hover:text-primary'
          }`}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            activeSection === item.id
              ? 'bg-primary/20' :'bg-muted group-hover:bg-primary/10'
          }`}>
            <Icon 
              name={item.icon} 
              size={18} 
              color={activeSection === item.id ? "var(--color-primary)" : "currentColor"}
            />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground group-hover:text-muted-foreground">
              {item.description}
            </p>
          </div>
          {activeSection === item.id && (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default SettingsNavigation;