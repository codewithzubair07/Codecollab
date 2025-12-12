import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkspaceHeader = ({ 
  onToggleFileTree, 
  onToggleCollaboration, 
  fileTreeExpanded, 
  collaborationExpanded 
}) => {
  const navigate = useNavigate();
  const [projectName] = useState('React Dashboard Pro');
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, unsaved
  const [isOnline, setIsOnline] = useState(true);
  const [collaborators] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      color: '#00D9FF',
      status: 'online',
      isTyping: false
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'MJ',
      color: '#8B5CF6',
      status: 'coding',
      isTyping: true
    },
    {
      id: 3,
      name: 'Alex Kim',
      avatar: 'AK',
      color: '#F59E0B',
      status: 'online',
      isTyping: false
    }
  ]);

  const [currentUser] = useState({
    name: 'John Developer',
    avatar: 'JD',
    color: '#10B981'
  });

  useEffect(() => {
    // Simulate auto-save functionality
    const interval = setInterval(() => {
      if (saveStatus === 'unsaved') {
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 1000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [saveStatus]);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Loader2';
      case 'unsaved':
        return 'AlertCircle';
      default:
        return 'Check';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-primary';
      case 'unsaved':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'coding':
        return 'bg-primary';
      case 'away':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <motion.header 
      className="h-14 bg-card border-b border-border flex items-center justify-between px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Panel Toggle Buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFileTree}
            className={`hover:bg-muted ${fileTreeExpanded ? 'text-primary' : 'text-muted-foreground'}`}
            title="Toggle File Explorer"
          >
            <Icon name="PanelLeft" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollaboration}
            className={`hover:bg-muted ${collaborationExpanded ? 'text-primary' : 'text-muted-foreground'}`}
            title="Toggle Collaboration Panel"
          >
            <Icon name="PanelRight" size={18} />
          </Button>
        </div>

        {/* Project Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Code2" size={16} color="white" />
          </div>
          <div>
            <h1 className="text-sm font-heading font-semibold text-foreground">
              {projectName}
            </h1>
            <div className="flex items-center space-x-2">
              <motion.div
                className={`flex items-center space-x-1 text-xs ${getSaveStatusColor()}`}
                animate={saveStatus === 'saving' ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: saveStatus === 'saving' ? Infinity : 0 }}
              >
                <Icon name={getSaveStatusIcon()} size={12} />
                <span className="capitalize">{saveStatus}</span>
              </motion.div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-error'} animate-pulse`}></div>
                <span>{isOnline ? 'Connected' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Collaborator Avatars */}
      <div className="flex items-center space-x-2">
        <AnimatePresence>
          {collaborators.map((collaborator, index) => (
            <motion.div
              key={collaborator.id}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                y: collaborator.isTyping ? [-2, 2, -2] : 0
              }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                y: { duration: 1, repeat: collaborator.isTyping ? Infinity : 0 }
              }}
              className="relative group cursor-pointer"
              title={`${collaborator.name} - ${collaborator.status}`}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-card shadow-lg transform-3d group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: collaborator.color }}
              >
                {collaborator.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(collaborator.status)}`}></div>
              
              {collaborator.isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs text-foreground whitespace-nowrap shadow-lg"
                >
                  typing...
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current User Avatar */}
        <motion.div
          className="relative ml-2"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-primary shadow-lg"
            style={{ backgroundColor: currentUser.color }}
          >
            {currentUser.avatar}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
        </motion.div>

        <div className="text-xs text-muted-foreground ml-2">
          {collaborators.length + 1} online
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Action Buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          iconName="Save"
          iconPosition="left"
          disabled={saveStatus === 'saved'}
        >
          Save
        </Button>

        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          iconPosition="left"
        >
          Share
        </Button>

        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          iconPosition="left"
        >
          Settings
        </Button>

        {/* Navigation */}
        <div className="border-l border-border pl-2 ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            iconName="LayoutDashboard"
            iconPosition="left"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default WorkspaceHeader;