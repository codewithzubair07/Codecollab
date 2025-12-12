import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WorkspaceSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeProject, setActiveProject] = useState('react-dashboard');
  const [expandedFolders, setExpandedFolders] = useState(['src', 'components']);

  const isAuthenticated = location.pathname !== '/login' && location.pathname !== '/register';

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Project overview and analytics'
    },
    {
      label: 'Code Editor',
      path: '/code-editor-workspace',
      icon: 'Code2',
      description: 'Collaborative coding workspace'
    },
    {
      label: 'Projects',
      path: '/project-management',
      icon: 'FolderOpen',
      description: 'Manage your projects'
    },
    {
      label: 'Settings',
      path: '/user-profile-settings',
      icon: 'Settings',
      description: 'Profile and preferences'
    }
  ];

  const projects = [
    {
      id: 'react-dashboard',
      name: 'React Dashboard',
      status: 'active',
      collaborators: 3,
      lastModified: '2 min ago'
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'review',
      collaborators: 2,
      lastModified: '1 hour ago'
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      status: 'draft',
      collaborators: 1,
      lastModified: '3 hours ago'
    }
  ];

  const fileTree = {
    'src': {
      type: 'folder',
      children: {
        'components': {
          type: 'folder',
          children: {
            'Header.jsx': { type: 'file', modified: true },
            'Sidebar.jsx': { type: 'file', modified: false },
            'Dashboard.jsx': { type: 'file', modified: true }
          }
        },
        'pages': {
          type: 'folder',
          children: {
            'Home.jsx': { type: 'file', modified: false },
            'Profile.jsx': { type: 'file', modified: false }
          }
        },
        'utils': {
          type: 'folder',
          children: {
            'api.js': { type: 'file', modified: false },
            'helpers.js': { type: 'file', modified: true }
          }
        }
      }
    },
    'public': {
      type: 'folder',
      children: {
        'index.html': { type: 'file', modified: false },
        'favicon.ico': { type: 'file', modified: false }
      }
    },
    'package.json': { type: 'file', modified: false },
    'README.md': { type: 'file', modified: false }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (tree, level = 0) => {
    return Object.entries(tree).map(([name, item]) => (
      <div key={name} style={{ paddingLeft: `${level * 16}px` }}>
        {item.type === 'folder' ? (
          <div>
            <button
              onClick={() => toggleFolder(name)}
              className="w-full flex items-center space-x-2 py-1 px-2 text-sm text-foreground hover:bg-muted rounded transition-colors duration-200"
            >
              <Icon 
                name={expandedFolders.includes(name) ? "ChevronDown" : "ChevronRight"} 
                size={14} 
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
            <div className="w-4"></div>
            <Icon 
              name="FileText" 
              size={14} 
              color={item.modified ? "var(--color-warning)" : "var(--color-muted-foreground)"} 
            />
            <span className={item.modified ? "text-warning" : ""}>{name}</span>
            {item.modified && (
              <div className="w-2 h-2 bg-warning rounded-full ml-auto"></div>
            )}
          </button>
        )}
      </div>
    ));
  };

  const getContextualContent = () => {
    switch (location.pathname) {
      case '/code-editor-workspace':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="FolderTree" size={16} />
                <span>File Explorer</span>
              </h3>
              <div className="space-y-1">
                {renderFileTree(fileTree)}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>Collaborators</span>
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Sarah Chen', status: 'online', avatar: 'S', color: 'bg-success' },
                  { name: 'Mike Johnson', status: 'coding', avatar: 'M', color: 'bg-primary' },
                  { name: 'Alex Kim', status: 'away', avatar: 'A', color: 'bg-muted' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors duration-200">
                    <div className={`w-6 h-6 ${user.color} rounded-full flex items-center justify-center text-xs font-medium text-white`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.status}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-success' : 
                      user.status === 'coding' ? 'bg-primary' : 'bg-muted-foreground'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case '/project-management':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Briefcase" size={16} />
                <span>Active Projects</span>
              </h3>
              <div className="space-y-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProject(project.id)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      activeProject === project.id
                        ? 'border-primary bg-primary/10' :'border-border hover:border-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{project.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'active' ? 'bg-success/20 text-success' :
                        project.status === 'review'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.collaborators} collaborators</span>
                      <span>{project.lastModified}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <Button
                variant="outline"
                className="w-full"
                iconName="Plus"
                iconPosition="left"
              >
                New Project
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/project-management')}
                >
                  New Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="Code2"
                  iconPosition="left"
                  onClick={() => navigate('/code-editor-workspace')}
                >
                  Open Editor
                </Button>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Recent Activity</h3>
              <div className="space-y-2">
                {[
                  { action: 'Updated Dashboard.jsx', time: '2 min ago', icon: 'FileText' },
                  { action: 'Merged pull request', time: '15 min ago', icon: 'GitMerge' },
                  { action: 'Created new branch', time: '1 hour ago', icon: 'GitBranch' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors duration-200">
                    <Icon name={activity.icon} size={14} color="var(--color-muted-foreground)" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-[900] glass border-r border-border transition-all duration-300 spring ${
        isExpanded ? 'w-80' : 'w-16'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {isExpanded && (
              <h2 className="text-lg font-heading font-semibold text-foreground">Workspace</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:bg-muted"
            >
              <Icon name={isExpanded ? "PanelLeftClose" : "PanelLeftOpen"} size={18} />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            {isExpanded ? (
              <div className="p-4 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary border border-primary/20' :'text-foreground hover:bg-muted hover:text-primary'
                        }`}
                      >
                        <Icon 
                          name={item.icon} 
                          size={18} 
                          color={location.pathname === item.path ? "var(--color-primary)" : "currentColor"}
                        />
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contextual Content */}
                <div className="border-t border-border pt-4">
                  {getContextualContent()}
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-center p-3 rounded-lg transition-all duration-200 group relative ${
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                    title={item.label}
                  >
                    <Icon 
                      name={item.icon} 
                      size={18} 
                      color={location.pathname === item.path ? "var(--color-primary)" : "currentColor"}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* This will be handled by the mobile menu in AppHeader */}
      </div>
    </>
  );
};

export default WorkspaceSidebar;