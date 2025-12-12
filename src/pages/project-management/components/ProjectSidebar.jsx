import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectSidebar = ({ activeProject, onProjectSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState(['src', 'components']);
  const [selectedBranch, setSelectedBranch] = useState('main');

  const projects = [
    {
      id: 'react-dashboard',
      name: 'React Dashboard',
      status: 'active',
      lastModified: '2 min ago',
      branches: ['main', 'feature/auth', 'develop']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'review',
      lastModified: '1 hour ago',
      branches: ['main', 'hotfix/security']
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      status: 'draft',
      lastModified: '3 hours ago',
      branches: ['main', 'feature/ui-redesign']
    }
  ];

  const fileTree = {
    'src': {
      type: 'folder',
      children: {
        'components': {
          type: 'folder',
          children: {
            'ui': {
              type: 'folder',
              children: {
                'Button.jsx': { type: 'file', modified: false },
                'Input.jsx': { type: 'file', modified: true },
                'Modal.jsx': { type: 'file', modified: false }
              }
            },
            'Header.jsx': { type: 'file', modified: true },
            'Sidebar.jsx': { type: 'file', modified: false },
            'Dashboard.jsx': { type: 'file', modified: true }
          }
        },
        'pages': {
          type: 'folder',
          children: {
            'Home.jsx': { type: 'file', modified: false },
            'Profile.jsx': { type: 'file', modified: false },
            'Settings.jsx': { type: 'file', modified: true }
          }
        },
        'hooks': {
          type: 'folder',
          children: {
            'useAuth.js': { type: 'file', modified: false },
            'useApi.js': { type: 'file', modified: true }
          }
        },
        'utils': {
          type: 'folder',
          children: {
            'api.js': { type: 'file', modified: false },
            'helpers.js': { type: 'file', modified: true },
            'constants.js': { type: 'file', modified: false }
          }
        }
      }
    },
    'public': {
      type: 'folder',
      children: {
        'index.html': { type: 'file', modified: false },
        'favicon.ico': { type: 'file', modified: false },
        'manifest.json': { type: 'file', modified: false }
      }
    },
    'package.json': { type: 'file', modified: false },
    'README.md': { type: 'file', modified: true },
    'vite.config.js': { type: 'file', modified: false }
  };

  const branches = [
    { name: 'main', commits: 234, lastCommit: '2 hours ago', isDefault: true },
    { name: 'feature/auth', commits: 12, lastCommit: '1 day ago', isDefault: false },
    { name: 'develop', commits: 45, lastCommit: '3 hours ago', isDefault: false },
    { name: 'hotfix/security', commits: 3, lastCommit: '5 hours ago', isDefault: false }
  ];

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (tree, level = 0) => {
    return Object.entries(tree).map(([name, item]) => (
      <div key={name} style={{ paddingLeft: `${level * 12}px` }}>
        {item.type === 'folder' ? (
          <div>
            <button
              onClick={() => toggleFolder(name)}
              className="w-full flex items-center space-x-2 py-1 px-2 text-sm text-foreground hover:bg-muted rounded transition-colors duration-200"
            >
              <Icon 
                name={expandedFolders.includes(name) ? "ChevronDown" : "ChevronRight"} 
                size={12} 
              />
              <Icon name="Folder" size={14} color="var(--color-accent)" />
              <span>{name}</span>
            </button>
            {expandedFolders.includes(name) && (
              <div className="ml-2">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <button className="w-full flex items-center space-x-2 py-1 px-2 text-sm text-foreground hover:bg-muted rounded transition-colors duration-200">
            <div className="w-3"></div>
            <Icon 
              name="FileText" 
              size={12} 
              color={item.modified ? "var(--color-warning)" : "var(--color-muted-foreground)"} 
            />
            <span className={item.modified ? "text-warning" : ""}>{name}</span>
            {item.modified && (
              <div className="w-1.5 h-1.5 bg-warning rounded-full ml-auto"></div>
            )}
          </button>
        )}
      </div>
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'review': return 'text-warning bg-warning/10';
      case 'draft': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Project Selector */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="FolderOpen" size={16} />
          <span>Projects</span>
        </h3>
        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                activeProject === project.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{project.lastModified}</p>
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-3"
          iconName="Plus"
          iconPosition="left"
        >
          New Project
        </Button>
      </div>

      {/* Branch Selector */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="GitBranch" size={16} />
          <span>Branches</span>
        </h3>
        <div className="space-y-1">
          {branches.slice(0, 4).map((branch) => (
            <button
              key={branch.name}
              onClick={() => setSelectedBranch(branch.name)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors duration-200 ${
                selectedBranch === branch.name
                  ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name="GitBranch" size={12} />
                <span className="text-sm truncate">{branch.name}</span>
                {branch.isDefault && (
                  <span className="text-xs bg-muted text-muted-foreground px-1 rounded">
                    default
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{branch.commits}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File Explorer */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="FolderTree" size={16} />
          <span>File Explorer</span>
        </h3>
        <div className="space-y-1">
          {renderFileTree(fileTree)}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            iconName="GitPullRequest"
            iconPosition="left"
          >
            New Pull Request
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            iconName="GitCommit"
            iconPosition="left"
          >
            Commit Changes
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            iconName="Upload"
            iconPosition="left"
          >
            Upload Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;