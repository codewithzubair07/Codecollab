import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TerminalPanel = ({ isExpanded, onToggle }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    {
      id: 1,
      type: 'command',
      content: 'npm install',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'output',
      content: `added 1423 packages, and audited 1424 packages in 45s\n\n185 packages are looking for funding\n  run \`npm fund\` for details\n\nfound 0 vulnerabilities`,
      timestamp: new Date(Date.now() - 295000)
    },
    {
      id: 3,
      type: 'command',
      content: 'npm run dev',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 4,
      type: 'output',
      content: `> react-dashboard@0.1.0 dev\n> vite\n\n  VITE v4.4.5  ready in 1423 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h to show help`,
      timestamp: new Date(Date.now() - 115000)
    },
    {
      id: 5,
      type: 'success',
      content: 'Development server started successfully!',
      timestamp: new Date(Date.now() - 110000)
    }
  ]);
  
  const [commandHistory, setCommandHistory] = useState([
    'npm install',
    'npm run dev',
    'git status',
    'git add .',
    'git commit -m "Update components"'
  ]);
  
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const executeCommand = async (cmd) => {
    if (!cmd.trim()) return;

    const newCommand = {
      id: history.length + 1,
      type: 'command',
      content: cmd,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newCommand]);
    setCommand('');
    setIsProcessing(true);

    // Add to command history
    setCommandHistory(prev => {
      const filtered = prev.filter(c => c !== cmd);
      return [cmd, ...filtered].slice(0, 20);
    });

    // Simulate command execution
    setTimeout(() => {
      let output = '';
      let type = 'output';

      switch (cmd.toLowerCase().trim()) {
        case 'ls': case'dir':
          output = `src/\npublic/\npackage.json\nREADME.md\nvite.config.js\n.gitignore`;
          break;
        case 'pwd':
          output = '/Users/john/projects/react-dashboard';
          break;
        case 'git status':
          output = `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes in working directory)\n\n\tmodified:   src/components/Header.jsx\n\tmodified:   src/pages/Dashboard.jsx\n\nno changes added to commit (use "git add" or "git commit -a")`;
          break;
        case 'npm run build':
          output = `> react-dashboard@0.1.0 build\n> vite build\n\nvite v4.4.5 building for production...\n✓ 1423 modules transformed.\ndist/index.html                   0.46 kB │ gzip:  0.30 kB\ndist/assets/index-4a9c52dc.css   8.15 kB │ gzip:  2.12 kB\ndist/assets/index-8f7d4e2a.js  143.42 kB │ gzip: 46.13 kB\n✓ built in 3.45s`;
          type = 'success';
          break;
        case 'npm test':
          output = `> react-dashboard@0.1.0 test\n> vitest\n\n ✓ src/components/Header.test.jsx (3)\n ✓ src/utils/helpers.test.js (5)\n ✓ src/pages/Dashboard.test.jsx (2)\n\n Test Files  3 passed (3)\n      Tests  10 passed (10)\n   Start at  ${new Date().toLocaleTimeString()}\n   Duration  1.23s`;
          type = 'success';
          break;
        case 'clear':
          setHistory([]);
          setIsProcessing(false);
          return;
        case 'help':
          output = `Available commands:\n  ls, dir     - List directory contents\n  pwd         - Print working directory\n  git status  - Show git status\n  npm run build - Build the project\n  npm test    - Run tests\n  clear       - Clear terminal\n  help        - Show this help message`;
          break;
        default:
          if (cmd.startsWith('cd ')) {
            output = `bash: cd: ${cmd.slice(3)}: No such file or directory`;
            type = 'error';
          } else {
            output = `bash: ${cmd}: command not found`;
            type = 'error';
          }
      }

      if (output) {
        const newOutput = {
          id: history.length + 2,
          type,
          content: output,
          timestamp: new Date()
        };
        setHistory(prev => [...prev, newOutput]);
      }
      
      setIsProcessing(false);
    }, Math.random() * 1000 + 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'command':
        return 'text-primary';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'command':
        return 'ChevronRight';
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Terminal';
    }
  };

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '300px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-card border-t border-border flex flex-col overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-3 bg-muted/30 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Terminal" size={16} color="var(--color-primary)" />
              <h3 className="text-sm font-heading font-semibold text-foreground">Terminal</h3>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>bash</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHistory([])}
                className="hover:bg-muted"
                title="Clear Terminal"
              >
                <Icon name="Trash2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="hover:bg-muted"
                title="Close Terminal"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 bg-background/50 font-mono text-sm"
          >
            <AnimatePresence>
              {history.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  <div className="flex items-start space-x-2">
                    <Icon 
                      name={getTypeIcon(entry.type)} 
                      size={12} 
                      className={`mt-1 ${getTypeColor(entry.type)}`}
                    />
                    <div className="flex-1">
                      {entry.type === 'command' && (
                        <span className="text-muted-foreground">$ </span>
                      )}
                      <span className={getTypeColor(entry.type)}>
                        {entry.content.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Command Line */}
            <div className="flex items-center space-x-2 mt-4">
              <Icon name="ChevronRight" size={12} color="var(--color-primary)" />
              <span className="text-muted-foreground">$</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none"
                placeholder="Type a command..."
                disabled={isProcessing}
              />
              {isProcessing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Icon name="Loader2" size={12} color="var(--color-primary)" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalPanel;