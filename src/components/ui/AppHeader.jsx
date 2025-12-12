import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New collaboration request from Sarah', time: '2 min ago', unread: true },
    { id: 2, message: 'Project "React Dashboard" updated', time: '15 min ago', unread: true },
    { id: 3, message: 'Code review completed', time: '1 hour ago', unread: false }
  ]);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setIsProfileOpen(false);
  };

  const isAuthenticated = location.pathname !== '/login' && location.pathname !== '/register';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] glass border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform-3d group-hover:scale-110 transition-transform duration-200 spring">
                <Icon name="Code2" size={18} color="var(--color-primary-foreground)" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              CodeCollab
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
            </div>
            <input
              type="text"
              placeholder="Search projects, files..."
              className="w-64 pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-muted"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative hover:bg-muted"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 glass border border-border rounded-lg shadow-focused animate-scale-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">John Developer</p>
                      <p className="text-sm text-muted-foreground">john@codecollab.dev</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation('/user-profile-settings')}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="LayoutDashboard" size={16} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden" ref={mobileMenuRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-muted"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 glass border border-border rounded-lg shadow-focused animate-slide-down">
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">John Developer</p>
                    <p className="text-sm text-muted-foreground">john@codecollab.dev</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="LayoutDashboard" size={18} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleNavigation('/code-editor-workspace')}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Code2" size={18} />
                  <span>Code Editor</span>
                </button>
                <button
                  onClick={() => handleNavigation('/project-management')}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="FolderOpen" size={18} />
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => handleNavigation('/user-profile-settings')}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Settings" size={18} />
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-border mt-2 pt-2">
                  <div className="px-4 py-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-error hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                  >
                    <Icon name="LogOut" size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;