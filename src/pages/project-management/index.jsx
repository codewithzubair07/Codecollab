import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AppHeader from '../../components/ui/AppHeader';
import WorkspaceSidebar from '../../components/ui/WorkspaceSidebar';
import ProjectOverview from './components/ProjectOverview';
import ProjectMembers from './components/ProjectMembers';
import ProjectSettings from './components/ProjectSettings';
import ProjectSidebar from './components/ProjectSidebar';
import ActivityFeed from './components/ActivityFeed';

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeProject, setActiveProject] = useState('react-dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3', description: 'Project statistics and analytics' },
    { id: 'members', label: 'Members', icon: 'Users', description: 'Team management and permissions' },
    { id: 'activity', label: 'Activity', icon: 'Activity', description: 'Recent project activity' },
    { id: 'settings', label: 'Settings', icon: 'Settings', description: 'Project configuration' }
  ];

  const currentProject = {
    id: activeProject,
    name: 'React Dashboard',
    description: 'A modern collaborative dashboard built with React and real-time features',
    status: 'active',
    visibility: 'private',
    created: '2024-01-15',
    lastModified: '2 minutes ago',
    contributors: 4,
    commits: 234,
    branches: 6,
    issues: 8
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/project-management' },
    { label: currentProject.name, path: `/project-management/${activeProject}` }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleProjectSelect = (projectId) => {
    setActiveProject(projectId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={currentProject} />;
      case 'members':
        return <ProjectMembers project={currentProject} />;
      case 'activity':
        return <ActivityFeed />;
      case 'settings':
        return <ProjectSettings project={currentProject} />;
      default:
        return <ProjectOverview project={currentProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <WorkspaceSidebar />
      
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-80'
      } pt-16`}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Project Sidebar */}
          <div className={`transition-all duration-300 border-r border-border bg-card/50 ${
            sidebarExpanded ? 'w-80' : 'w-16'
          } ${isMobile ? 'hidden' : 'block'}`}>
            {sidebarExpanded ? (
              <ProjectSidebar 
                activeProject={activeProject}
                onProjectSelect={handleProjectSelect}
              />
            ) : (
              <div className="p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarExpanded(true)}
                  className="w-full"
                >
                  <Icon name="PanelLeftOpen" size={20} />
                </Button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-border bg-card/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {!sidebarExpanded && !isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarExpanded(true)}
                    >
                      <Icon name="PanelLeftOpen" size={20} />
                    </Button>
                  )}
                  
                  {/* Breadcrumbs */}
                  <nav className="flex items-center space-x-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={crumb.path}>
                        <button
                          onClick={() => navigate(crumb.path)}
                          className={`transition-colors duration-200 ${
                            index === breadcrumbs.length - 1
                              ? 'text-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {crumb.label}
                        </button>
                        {index < breadcrumbs.length - 1 && (
                          <Icon name="ChevronRight" size={14} color="var(--color-muted-foreground)" />
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={() => setActiveTab('members')}
                  >
                    Invite Members
                  </Button>
                  <Button
                    variant="default"
                    iconName="Code2"
                    iconPosition="left"
                    onClick={() => navigate('/code-editor-workspace')}
                  >
                    Open Editor
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {currentProject.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">{currentProject.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} />
                      <span>{currentProject.contributors} contributors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="GitCommit" size={16} />
                      <span>{currentProject.commits} commits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="GitBranch" size={16} />
                      <span>{currentProject.branches} branches</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} />
                      <span>{currentProject.issues} issues</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentProject.status === 'active' ? 'bg-success/20 text-success' :
                    currentProject.status === 'review'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentProject.status}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                    {currentProject.visibility}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border bg-card/20">
              <div className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;