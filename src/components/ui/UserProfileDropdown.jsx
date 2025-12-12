import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const UserProfileDropdown = ({ isOpen, onClose, triggerRef }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [user] = useState({
    name: 'John Developer',
    email: 'john@codecollab.dev',
    avatar: 'JD',
    role: 'Senior Developer',
    status: 'online',
    workspaces: [
      { id: 1, name: 'Personal Workspace', active: true },
      { id: 2, name: 'Team Alpha', active: false },
      { id: 3, name: 'Enterprise Hub', active: false }
    ],
    stats: {
      projects: 12,
      collaborations: 28,
      contributions: 156
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPreferences');
    navigate('/login');
    onClose();
  };

  const switchWorkspace = (workspaceId) => {
    // Simulate workspace switching
    console.log('Switching to workspace:', workspaceId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 glass border border-border rounded-xl shadow-focused animate-scale-in z-[1100]"
    >
      {/* User Info Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-medium">
              {user.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              user.status === 'online' ? 'bg-success' : 
              user.status === 'busy' ? 'bg-error' : 'bg-muted-foreground'
            }`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{user.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            <p className="text-xs text-accent font-medium">{user.role}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{user.stats.projects}</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">{user.stats.collaborations}</p>
            <p className="text-xs text-muted-foreground">Collabs</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">{user.stats.contributions}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </div>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Building2" size={14} />
          <span>Workspaces</span>
        </h4>
        <div className="space-y-1">
          {user.workspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => switchWorkspace(workspace.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors duration-200 ${
                workspace.active 
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-sm">{workspace.name}</span>
              {workspace.active && (
                <Icon name="Check" size={14} color="var(--color-primary)" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-2">
        <button
          onClick={() => handleNavigation('/user-profile-settings')}
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="Settings" size={16} />
          <span>Profile Settings</span>
        </button>
        
        <button
          onClick={() => handleNavigation('/dashboard')}
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="LayoutDashboard" size={16} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => handleNavigation('/project-management')}
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="FolderOpen" size={16} />
          <span>My Projects</span>
        </button>

        <div className="border-t border-border my-2"></div>

        <button
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="HelpCircle" size={16} />
          <span>Help & Support</span>
        </button>

        <button
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="Keyboard" size={16} />
          <span>Keyboard Shortcuts</span>
        </button>

        <div className="border-t border-border my-2"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors duration-200"
        >
          <Icon name="LogOut" size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30 rounded-b-xl">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>CodeCollab v2.1.0</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDropdown;