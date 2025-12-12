import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AppHeader from '../../components/ui/AppHeader';
import WorkspaceSidebar from '../../components/ui/WorkspaceSidebar';
import SettingsNavigation from './components/SettingsNavigation';
import ProfileSection from './components/ProfileSection';
import PreferencesSection from './components/PreferencesSection';
import IntegrationsSection from './components/IntegrationsSection';
import SecuritySection from './components/SecuritySection';
import WorkspaceSection from './components/WorkspaceSection';
import BillingSection from './components/BillingSection';

const UserProfileSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    // Language would be applied here in a real app
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'security':
        return <SecuritySection />;
      case 'workspace':
        return <WorkspaceSection />;
      case 'billing':
        return <BillingSection />;
      default:
        return <ProfileSection />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      profile: 'Profile Settings',
      preferences: 'Preferences',
      integrations: 'Integrations',
      security: 'Security',
      workspace: 'Workspace',
      billing: 'Billing'
    };
    return titles[activeSection] || 'Settings';
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Profile Settings - CodeCollab</title>
        <meta name="description" content="Customize your CodeCollab profile, preferences, and workspace settings for the ultimate collaborative coding experience." />
      </Helmet>

      <AppHeader />
      <WorkspaceSidebar />

      <div className="lg:ml-80 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Settings Navigation Sidebar */}
          <div className="hidden md:block w-80 border-r border-border bg-card/50 backdrop-blur-sm">
            <div className="p-6 h-full overflow-y-auto">
              <SettingsNavigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>

          {/* Mobile Settings Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="fixed top-20 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-elevated"
            >
              <span className="sr-only">Toggle settings menu</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
              </div>
            </button>

            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="fixed top-16 left-0 bottom-0 w-80 bg-card border-r border-border shadow-focused overflow-y-auto">
                  <div className="p-6">
                    <SettingsNavigation 
                      activeSection={activeSection} 
                      onSectionChange={(section) => {
                        setActiveSection(section);
                        setIsMobileMenuOpen(false);
                      }} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 md:p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {getSectionTitle().charAt(0)}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {getSectionTitle()}
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Customize your CodeCollab experience and manage your account settings.
                </p>
              </div>

              {/* Content with smooth transitions */}
              <div className="animate-fade-in">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-focused flex items-center justify-center transform-3d hover:scale-110 transition-transform duration-200 spring"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default UserProfileSettings;