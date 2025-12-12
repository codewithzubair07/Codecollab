import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationsSection = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect your GitHub account for repository access and version control',
      icon: 'Github',
      connected: true,
      connectedAccount: 'johndeveloper',
      permissions: ['Read repositories', 'Create pull requests', 'Manage webhooks'],
      lastSync: '2 hours ago'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in your Slack workspace',
      icon: 'MessageSquare',
      connected: true,
      connectedAccount: 'CodeCollab Workspace',
      permissions: ['Send messages', 'Read channels', 'Manage notifications'],
      lastSync: '15 minutes ago'
    },
    {
      id: 'vscode',
      name: 'VS Code',
      description: 'Sync settings and extensions with Visual Studio Code',
      icon: 'Code2',
      connected: false,
      connectedAccount: null,
      permissions: ['Sync settings', 'Install extensions', 'Access workspace'],
      lastSync: null
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Share your coding status and join voice channels',
      icon: 'MessageCircle',
      connected: false,
      connectedAccount: null,
      permissions: ['Update status', 'Join voice channels', 'Send messages'],
      lastSync: null
    },
    {
      id: 'figma',
      name: 'Figma',
      description: 'Import designs and collaborate on UI/UX projects',
      icon: 'Figma',
      connected: true,
      connectedAccount: 'john.developer@email.com',
      permissions: ['Access files', 'Create comments', 'Export assets'],
      lastSync: '1 day ago'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Link code changes to Jira issues and track progress',
      icon: 'Bug',
      connected: false,
      connectedAccount: null,
      permissions: ['Read issues', 'Update status', 'Create links'],
      lastSync: null
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(null);

  const handleConnect = async (integrationId) => {
    setIsConnecting(integrationId);
    
    // Simulate OAuth connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            connected: true, 
            connectedAccount: 'Connected Account',
            lastSync: 'Just now'
          }
        : integration
    ));
    
    setIsConnecting(null);
  };

  const handleDisconnect = async (integrationId) => {
    setIsConnecting(integrationId);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            connected: false, 
            connectedAccount: null,
            lastSync: null
          }
        : integration
    ));
    
    setIsConnecting(null);
  };

  const handleSync = async (integrationId) => {
    setIsConnecting(integrationId);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: 'Just now' }
        : integration
    ));
    
    setIsConnecting(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your favorite tools and services to enhance your coding workflow.
        </p>
      </div>

      {/* Connected Services */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Plug" size={20} />
          <span>Connected Services</span>
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          {integrations.filter(integration => integration.connected).map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} size={20} color="var(--color-success)" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{integration.name}</h5>
                  <p className="text-sm text-muted-foreground">{integration.connectedAccount}</p>
                  <p className="text-xs text-success">Last synced: {integration.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  loading={isConnecting === integration.id}
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => handleSync(integration.id)}
                >
                  Sync
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  loading={isConnecting === integration.id}
                  iconName="Unlink"
                  iconPosition="left"
                  onClick={() => handleDisconnect(integration.id)}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Plus" size={20} />
          <span>Available Integrations</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.filter(integration => !integration.connected).map((integration) => (
            <div key={integration.id} className="border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 spring">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">{integration.name}</h5>
                  <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-foreground mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.permissions.map((permission, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    loading={isConnecting === integration.id}
                    iconName="Link"
                    iconPosition="left"
                    onClick={() => handleConnect(integration.id)}
                    fullWidth
                  >
                    {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Tips */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} />
          <span>Integration Tips</span>
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="Github" size={12} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">GitHub Integration</p>
              <p className="text-xs text-muted-foreground">
                Connect GitHub to automatically sync your repositories and enable seamless version control within CodeCollab.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="MessageSquare" size={12} color="var(--color-secondary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Slack Notifications</p>
              <p className="text-xs text-muted-foreground">
                Get real-time notifications about code reviews, collaborations, and project updates directly in Slack.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="Code2" size={12} color="var(--color-accent)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">VS Code Sync</p>
              <p className="text-xs text-muted-foreground">
                Sync your VS Code settings, themes, and extensions to maintain consistency across all your coding environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;