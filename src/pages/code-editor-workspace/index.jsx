import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import WorkspaceHeader from './components/WorkspaceHeader';
import FileTreePanel from './components/FileTreePanel';
import CodeEditorPanel from './components/CodeEditorPanel';
import CollaborationPanel from './components/CollaborationPanel';
import TerminalPanel from './components/TerminalPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CodeEditorWorkspace = () => {
  const [fileTreeExpanded, setFileTreeExpanded] = useState(true);
  const [collaborationExpanded, setCollaborationExpanded] = useState(true);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    // Simulate workspace initialization
    const initializeWorkspace = async () => {
      setConnectionStatus('connecting');
      
      // Simulate connection and loading
      setTimeout(() => {
        setConnectionStatus('connected');
        setIsLoading(false);
      }, 2000);
    };

    initializeWorkspace();

    // Cleanup on unmount
    return () => {
      setConnectionStatus('disconnected');
    };
  }, []);

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            setFileTreeExpanded(prev => !prev);
            break;
          case 'j':
            e.preventDefault();
            setCollaborationExpanded(prev => !prev);
            break;
          case '`':
            e.preventDefault();
            setTerminalExpanded(prev => !prev);
            break;
          case 's':
            e.preventDefault();
            // Save functionality would be handled by CodeEditorPanel
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFileTree = () => setFileTreeExpanded(prev => !prev);
  const toggleCollaboration = () => setCollaborationExpanded(prev => !prev);
  const toggleTerminal = () => setTerminalExpanded(prev => !prev);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Loading Workspace - CodeCollab</title>
        </Helmet>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Code2" size={32} color="white" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Initializing Workspace
          </h2>
          <p className="text-muted-foreground mb-6">
            Setting up your collaborative coding environment...
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
            <span className="ml-2">Connecting to workspace...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Code Editor Workspace - CodeCollab</title>
        <meta name="description" content="Real-time collaborative coding workspace with advanced 3D interactions and seamless multi-user support." />
      </Helmet>

      {/* Workspace Header */}
      <WorkspaceHeader
        onToggleFileTree={toggleFileTree}
        onToggleCollaboration={toggleCollaboration}
        fileTreeExpanded={fileTreeExpanded}
        collaborationExpanded={collaborationExpanded}
      />

      {/* Main Workspace Layout */}
      <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* File Tree Panel */}
        <motion.div
          className="border-r border-border"
          animate={{ 
            width: fileTreeExpanded ? '320px' : '0px',
            opacity: fileTreeExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {fileTreeExpanded && (
            <FileTreePanel
              isExpanded={fileTreeExpanded}
              onToggle={toggleFileTree}
            />
          )}
        </motion.div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 min-w-0">
              <CodeEditorPanel />
            </div>

            {/* Collaboration Panel */}
            <motion.div
              className="border-l border-border"
              animate={{ 
                width: collaborationExpanded ? '320px' : '0px',
                opacity: collaborationExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {collaborationExpanded && (
                <CollaborationPanel
                  isExpanded={collaborationExpanded}
                  onToggle={toggleCollaboration}
                />
              )}
            </motion.div>
          </div>

          {/* Terminal Panel */}
          <TerminalPanel
            isExpanded={terminalExpanded}
            onToggle={toggleTerminal}
          />
        </div>
      </div>

      {/* Floating Action Button for Terminal */}
      {!terminalExpanded && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="default"
            size="icon"
            onClick={toggleTerminal}
            className="w-12 h-12 rounded-full shadow-focused hover:shadow-elevated transition-all duration-200"
            title="Open Terminal (Ctrl+`)"
          >
            <Icon name="Terminal" size={20} />
          </Button>
        </motion.div>
      )}

      {/* Connection Status Indicator */}
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg glass border border-border text-xs ${
          connectionStatus === 'connected' ? 'text-success' : 
          connectionStatus === 'connecting' ? 'text-warning' : 'text-error'
        }`}>
          <motion.div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-success' : 
              connectionStatus === 'connecting' ? 'bg-warning' : 'bg-error'
            }`}
            animate={connectionStatus === 'connecting' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: connectionStatus === 'connecting' ? Infinity : 0 }}
          />
          <span className="capitalize">{connectionStatus}</span>
        </div>
      </motion.div>

      {/* Keyboard Shortcuts Help */}
      <motion.div
        className="fixed top-20 right-4 z-40 glass border border-border rounded-lg p-3 text-xs text-muted-foreground"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <span>Toggle File Tree</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Toggle Collaboration</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+J</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Toggle Terminal</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+`</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Save File</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+S</kbd>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditorWorkspace;