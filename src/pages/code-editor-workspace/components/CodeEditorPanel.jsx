import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeEditorPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState(`import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;`);
  
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      color: '#00D9FF',
      cursor: { line: 15, column: 12 },
      selection: { start: { line: 15, column: 8 }, end: { line: 15, column: 20 } },
      active: true
    },
    {
      id: 2,
      name: 'Mike Johnson',
      color: '#8B5CF6',
      cursor: { line: 8, column: 25 },
      selection: null,
      active: true
    }
  ]);
  
  const [tabs, setTabs] = useState([
    { id: 1, name: 'Header.jsx', path: 'src/components/Header.jsx', modified: true, language: 'javascript' },
    { id: 2, name: 'Dashboard.jsx', path: 'src/pages/Dashboard.jsx', modified: false, language: 'javascript' },
    { id: 3, name: 'styles.css', path: 'src/styles/styles.css', modified: true, language: 'css' }
  ]);

  const editorRef = useRef(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Mark current tab as modified
    setTabs(prev => prev.map(tab => 
      tab.id === tabs[activeTab].id 
        ? { ...tab, modified: true }
        : tab
    ));
  };

  const closeTab = (tabIndex) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((_, index) => index !== tabIndex);
      setTabs(newTabs);
      if (activeTab >= newTabs.length) {
        setActiveTab(newTabs.length - 1);
      } else if (activeTab > tabIndex) {
        setActiveTab(activeTab - 1);
      }
    }
  };

  const executeCode = async () => {
    setIsExecuting(true);
    // Simulate code execution
    setTimeout(() => {
      setExecutionResult({
        success: true,
        output: "Code executed successfully!\nOutput: Dashboard component rendered",
        timestamp: new Date().toLocaleTimeString()
      });
      setIsExecuting(false);
    }, 2000);
  };

  const saveFile = () => {
    // Simulate save
    setTabs(prev => prev.map(tab => 
      tab.id === tabs[activeTab].id 
        ? { ...tab, modified: false }
        : tab
    ));
  };

  const getLanguageIcon = (language) => {
    switch (language) {
      case 'javascript':
        return 'FileCode';
      case 'css':
        return 'Palette';
      case 'html':
        return 'Globe';
      default:
        return 'File';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Tab Bar */}
      <div className="flex items-center bg-muted/30 border-b border-border overflow-x-auto">
        <AnimatePresence>
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`flex items-center space-x-2 px-4 py-3 border-r border-border cursor-pointer group relative ${
                activeTab === index 
                  ? 'bg-card text-primary border-b-2 border-primary' :'text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <Icon 
                name={getLanguageIcon(tab.language)} 
                size={14} 
                color={activeTab === index ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
              />
              <span className="text-sm font-medium">{tab.name}</span>
              {tab.modified && (
                <motion.div 
                  className="w-2 h-2 bg-warning rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(index);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-error/20 rounded p-1 transition-all duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 hover:bg-muted"
        >
          <Icon name="Plus" size={16} />
        </Button>
      </div>

      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-2 bg-muted/20 border-b border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={saveFile}
            iconName="Save"
            iconPosition="left"
            disabled={!tabs[activeTab]?.modified}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Undo"
            iconPosition="left"
          >
            Undo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Redo"
            iconPosition="left"
          >
            Redo
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={executeCode}
            loading={isExecuting}
            iconName="Play"
            iconPosition="left"
          >
            Run Code
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          {/* Line Numbers */}
          <div className="w-12 bg-muted/10 border-r border-border flex flex-col text-xs text-muted-foreground font-mono">
            {code.split('\n').map((_, index) => (
              <div key={index} className="h-6 flex items-center justify-end px-2">
                {index + 1}
              </div>
            ))}
          </div>
          
          {/* Editor Content */}
          <div className="flex-1 relative">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none"
              style={{ lineHeight: '1.5rem' }}
              spellCheck={false}
            />
            
            {/* Collaborative Cursors */}
            <AnimatePresence>
              {collaborators.map((collaborator) => (
                <motion.div
                  key={collaborator.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute pointer-events-none"
                  style={{
                    top: `${(collaborator.cursor.line - 1) * 24 + 16}px`,
                    left: `${collaborator.cursor.column * 8 + 16}px`,
                  }}
                >
                  <div 
                    className="w-0.5 h-6 animate-pulse"
                    style={{ backgroundColor: collaborator.color }}
                  />
                  <motion.div
                    className="absolute -top-8 left-0 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
                    style={{ backgroundColor: collaborator.color }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {collaborator.name}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>JavaScript</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Connected</span>
          </div>
          <span>{collaborators.length} collaborators</span>
          {executionResult && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center space-x-1 ${
                executionResult.success ? 'text-success' : 'text-error'
              }`}
            >
              <Icon name={executionResult.success ? "CheckCircle" : "XCircle"} size={12} />
              <span>Executed at {executionResult.timestamp}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPanel;