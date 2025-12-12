import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectSettings = ({ project }) => {
  const [projectName, setProjectName] = useState('React Dashboard');
  const [projectDescription, setProjectDescription] = useState('A modern collaborative dashboard built with React and real-time features');
  const [visibility, setVisibility] = useState('private');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [autoMerge, setAutoMerge] = useState(false);
  const [requireReviews, setRequireReviews] = useState(true);
  const [allowForceUpdates, setAllowForceUpdates] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);

  const visibilityOptions = [
    { value: 'private', label: 'Private', description: 'Only team members can access' },
    { value: 'internal', label: 'Internal', description: 'Organization members can access' },
    { value: 'public', label: 'Public', description: 'Anyone can view the project' }
  ];

  const branchOptions = [
    { value: 'main', label: 'main' },
    { value: 'master', label: 'master' },
    { value: 'develop', label: 'develop' },
    { value: 'staging', label: 'staging' }
  ];

  const integrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Sync with GitHub repository',
      icon: 'Github',
      connected: true,
      status: 'active',
      lastSync: '2 minutes ago'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in Slack',
      icon: 'MessageSquare',
      connected: true,
      status: 'active',
      lastSync: '5 minutes ago'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Link issues and track progress',
      icon: 'ExternalLink',
      connected: false,
      status: 'inactive',
      lastSync: 'Never'
    },
    {
      id: 'docker',
      name: 'Docker Hub',
      description: 'Automated container builds',
      icon: 'Package',
      connected: false,
      status: 'inactive',
      lastSync: 'Never'
    }
  ];

  const webhooks = [
    {
      id: 1,
      url: 'https://api.example.com/webhooks/commits',
      events: ['push', 'pull_request'],
      status: 'active',
      lastTriggered: '1 hour ago'
    },
    {
      id: 2,
      url: 'https://ci.example.com/build-trigger',
      events: ['push'],
      status: 'inactive',
      lastTriggered: '2 days ago'
    }
  ];

  const handleSaveSettings = () => {
    console.log('Saving project settings:', {
      projectName,
      projectDescription,
      visibility,
      defaultBranch,
      autoMerge,
      requireReviews,
      allowForceUpdates,
      enableNotifications
    });
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      console.log('Deleting project');
    }
  };

  const toggleIntegration = (integrationId) => {
    console.log('Toggling integration:', integrationId);
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6 flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <span>General Settings</span>
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <Select
              label="Visibility"
              options={visibilityOptions}
              value={visibility}
              onChange={setVisibility}
            />
          </div>
          
          <Input
            label="Description"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            description="Brief description of your project"
          />
          
          <Select
            label="Default Branch"
            options={branchOptions}
            value={defaultBranch}
            onChange={setDefaultBranch}
            description="The default branch for new clones and pull requests"
          />
        </div>
      </motion.div>

      {/* Repository Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6 flex items-center space-x-2">
          <Icon name="GitBranch" size={20} />
          <span>Repository Settings</span>
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Auto-merge pull requests"
            description="Automatically merge pull requests when all checks pass"
            checked={autoMerge}
            onChange={(e) => setAutoMerge(e.target.checked)}
          />
          
          <Checkbox
            label="Require code reviews"
            description="Require at least one approval before merging"
            checked={requireReviews}
            onChange={(e) => setRequireReviews(e.target.checked)}
          />
          
          <Checkbox
            label="Allow force updates"
            description="Allow force pushes to protected branches"
            checked={allowForceUpdates}
            onChange={(e) => setAllowForceUpdates(e.target.checked)}
          />
          
          <Checkbox
            label="Enable notifications"
            description="Send email notifications for project activities"
            checked={enableNotifications}
            onChange={(e) => setEnableNotifications(e.target.checked)}
          />
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6 flex items-center space-x-2">
          <Icon name="Plug" size={20} />
          <span>Integrations</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={integration.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleIntegration(integration.id)}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={`px-2 py-1 rounded-full ${
                  integration.status === 'active' ?'bg-success/20 text-success' :'bg-muted text-muted-foreground'
                }`}>
                  {integration.status}
                </span>
                <span>Last sync: {integration.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Webhooks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Webhook" size={20} />
            <span>Webhooks</span>
          </h3>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Webhook
          </Button>
        </div>
        
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="p-4 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{webhook.url}</p>
                  <p className="text-sm text-muted-foreground">
                    Events: {webhook.events.join(', ')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    webhook.status === 'active' ?'bg-success/20 text-success' :'bg-muted text-muted-foreground'
                  }`}>
                    {webhook.status}
                  </span>
                  <Button variant="ghost" size="icon" iconName="Edit" />
                  <Button variant="ghost" size="icon" iconName="Trash2" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Last triggered: {webhook.lastTriggered}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-between"
      >
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" iconName="Archive">
            Archive Project
          </Button>
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={handleDeleteProject}
          >
            Delete Project
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectSettings;