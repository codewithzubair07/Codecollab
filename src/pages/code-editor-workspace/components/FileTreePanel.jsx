import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileTreePanel = ({ isExpanded, onToggle }) => {
  const [expandedFolders, setExpandedFolders] = useState(['src', 'components']);
  const [selectedFile, setSelectedFile] = useState('src/components/Header.jsx');
  const [searchQuery, setSearchQuery] = useState('');

  const fileTree = {
    'src': {
      type: 'folder',
      children: {
        'components': {
          type: 'folder',
          children: {
            'Header.jsx': { type: 'file', modified: true, status: 'M' },
            'Sidebar.jsx': { type: 'file', modified: false, status: '' },
            'Dashboard.jsx': { type: 'file', modified: true, status: 'M' },
            'CodeEditor.jsx': { type: 'file', modified: false, status: '' },
            'ChatPanel.jsx': { type: 'file', modified: true, status: 'M' }
          }
        },
        'pages': {
          type: 'folder',
          children: {
            'Home.jsx': { type: 'file', modified: false, status: '' },
            'Profile.jsx': { type: 'file', modified: false, status: '' },
            'Settings.jsx': { type: 'file', modified: true, status: 'M' }
          }
        },
        'utils': {
          type: 'folder',
          children: {
            'api.js': { type: 'file', modified: false, status: '' },
            'helpers.js': { type: 'file', modified: true, status: 'M' },
            'constants.js': { type: 'file', modified: false, status: '' }
          }
        },
        'hooks': {
          type: 'folder',
          children: {
            'useAuth.js': { type: 'file', modified: false, status: '' },
            'useSocket.js': { type: 'file', modified: true, status: 'M' }
          }
        }
      }
    },
    'public': {
      type: 'folder',
      children: {
        'index.html': { type: 'file', modified: false, status: '' },
        'favicon.ico': { type: 'file', modified: false, status: '' },
        'manifest.json': { type: 'file', modified: false, status: '' }
      }
    },
    'package.json': { type: 'file', modified: false, status: '' },
    'README.md': { type: 'file', modified: true, status: 'M' },
    'vite.config.js': { type: 'file', modified: false, status: '' },
    '.gitignore': { type: 'file', modified: false, status: '' }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const selectFile = (filePath) => {
    setSelectedFile(filePath);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'jsx': case'js':
        return 'FileCode';
      case 'css':
        return 'Palette';
      case 'json':
        return 'Braces';
      case 'md':
        return 'FileText';
      case 'html':
        return 'Globe';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'M':
        return 'text-warning';
      case 'A':
        return 'text-success';
      case 'D':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderFileTree = (tree, level = 0, parentPath = '') => {
    return Object.entries(tree).map(([name, item]) => {
      const currentPath = parentPath ? `${parentPath}/${name}` : name;
      
      if (item.type === 'folder') {
        const isExpanded = expandedFolders.includes(name);
        
        return (
          <motion.div 
            key={name} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={() => toggleFolder(name)}
              className="w-full flex items-center space-x-2 py-1.5 px-2 text-sm text-foreground hover:bg-muted rounded transition-all duration-200 group"
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="ChevronRight" size={14} />
              </motion.div>
              <motion.div
                animate={{ 
                  rotateY: isExpanded ? 15 : 0,
                  scale: isExpanded ? 1.1 : 1
                }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Icon 
                  name={isExpanded ? "FolderOpen" : "Folder"} 
                  size={16} 
                  color="var(--color-accent)" 
                />
              </motion.div>
              <span className="font-medium">{name}</span>
            </motion.button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {renderFileTree(item.children, level + 1, currentPath)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      } else {
        const isSelected = selectedFile === currentPath;
        
        return (
          <motion.button
            key={name}
            onClick={() => selectFile(currentPath)}
            className={`w-full flex items-center space-x-2 py-1.5 px-2 text-sm rounded transition-all duration-200 group ${
              isSelected 
                ? 'bg-primary/10 text-primary border-l-2 border-primary' :'text-foreground hover:bg-muted'
            }`}
            style={{ paddingLeft: `${level * 16 + 24}px` }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon 
              name={getFileIcon(name)} 
              size={14} 
              color={isSelected ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
            />
            <span className={`flex-1 text-left ${item.modified ? 'font-medium' : ''}`}>
              {name}
            </span>
            {item.status && (
              <span className={`text-xs font-bold ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            )}
            {item.modified && (
              <motion.div 
                className="w-2 h-2 bg-warning rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        );
      }
    });
  };

  const filteredTree = searchQuery ? 
    // Simple search implementation - in real app would be more sophisticated
    fileTree : fileTree;

  return (
    <motion.div 
      className="h-full flex flex-col bg-card border-r border-border"
      animate={{ width: isExpanded ? '100%' : '0%' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FolderTree" size={18} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground">Explorer</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hover:bg-muted"
        >
          <Icon name="PanelLeftClose" size={16} />
        </Button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Icon 
            name="Search" 
            size={14} 
            color="var(--color-muted-foreground)" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
          />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <motion.div 
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {renderFileTree(filteredTree)}
        </motion.div>
      </div>

      {/* Git Status */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="GitBranch" size={12} />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>5</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>3</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileTreePanel;