import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborationPanel = ({ isExpanded, onToggle }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'SC',
      message: 'Hey everyone! I just pushed the latest changes to the Header component.',
      timestamp: new Date(Date.now() - 300000),
      type: 'message'
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'MJ',
      message: 'Great work! I can see the improvements in real-time.',
      timestamp: new Date(Date.now() - 240000),
      type: 'message'
    },
    {
      id: 3,
      user: 'System',
      avatar: 'SYS',
      message: 'Alex Kim joined the session',
      timestamp: new Date(Date.now() - 180000),
      type: 'system'
    },
    {
      id: 4,
      user: 'Alex Kim',
      avatar: 'AK',
      message: 'Hi team! Working on the Dashboard component now.',
      timestamp: new Date(Date.now() - 120000),
      type: 'message'
    },
    {
      id: 5,
      user: 'You',
      avatar: 'JD',
      message: 'Perfect timing! Let me know if you need any help with the API integration.',
      timestamp: new Date(Date.now() - 60000),
      type: 'message'
    }
  ]);

  const [collaborators] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      status: 'online',
      role: 'Frontend Developer',
      currentFile: 'src/components/Header.jsx',
      color: '#00D9FF',
      lastSeen: 'Active now'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'MJ',
      status: 'coding',
      role: 'Full Stack Developer',
      currentFile: 'src/utils/api.js',
      color: '#8B5CF6',
      lastSeen: 'Active now'
    },
    {
      id: 3,
      name: 'Alex Kim',
      avatar: 'AK',
      status: 'online',
      role: 'Backend Developer',
      currentFile: 'src/pages/Dashboard.jsx',
      color: '#F59E0B',
      lastSeen: 'Active now'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'EW',
      status: 'away',
      role: 'UI/UX Designer',
      currentFile: null,
      color: '#10B981',
      lastSeen: '5 minutes ago'
    }
  ]);

  const [executionOutput] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Build completed successfully',
      timestamp: new Date(Date.now() - 120000),
      details: 'All components compiled without errors'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Unused variable detected',
      timestamp: new Date(Date.now() - 90000),
      details: 'Variable "tempData" in Dashboard.jsx line 15'
    },
    {
      id: 3,
      type: 'info',
      message: 'Hot reload triggered',
      timestamp: new Date(Date.now() - 30000),
      details: 'Changes detected in Header.jsx'
    }
  ]);

  const chatRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'JD',
        message: message.trim(),
        timestamp: new Date(),
        type: 'message'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
      case 'offline':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getOutputIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
        return 'Info';
      default:
        return 'Terminal';
    }
  };

  const getOutputColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'info':
        return 'text-primary';
      default:
        return 'text-foreground';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      className="h-full flex flex-col bg-card border-l border-border"
      animate={{ width: isExpanded ? '100%' : '0%' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={18} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground">Collaboration</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hover:bg-muted"
        >
          <Icon name="PanelRightClose" size={16} />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {[
          { id: 'chat', label: 'Chat', icon: 'MessageSquare' },
          { id: 'users', label: 'Users', icon: 'Users' },
          { id: 'output', label: 'Output', icon: 'Terminal' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex space-x-3 ${
                        msg.type === 'system' ? 'justify-center' : ''
                      }`}
                    >
                      {msg.type !== 'system' && (
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                            msg.user === 'You' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {msg.avatar}
                          </div>
                        </div>
                      )}
                      <div className={`flex-1 ${msg.type === 'system' ? 'text-center' : ''}`}>
                        {msg.type !== 'system' && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-foreground">
                              {msg.user}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                        )}
                        <div className={`text-sm ${
                          msg.type === 'system' ?'text-muted-foreground italic bg-muted/30 px-3 py-1 rounded-full inline-block' :'text-foreground'
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto p-4"
            >
              <div className="space-y-3">
                {collaborators.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <div className="relative">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(user.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {user.role}
                        </span>
                      </div>
                      {user.currentFile ? (
                        <p className="text-xs text-primary truncate">
                          Editing: {user.currentFile}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {user.lastSeen}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'output' && (
            <motion.div
              key="output"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto p-4"
            >
              <div className="space-y-3">
                {executionOutput.map((output) => (
                  <motion.div
                    key={output.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30"
                  >
                    <Icon 
                      name={getOutputIcon(output.type)} 
                      size={16} 
                      className={getOutputColor(output.type)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium ${getOutputColor(output.type)}`}>
                          {output.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(output.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {output.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CollaborationPanel;