import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "New Project",
      description: "Start a new collaborative project",
      icon: "Plus",
      color: "bg-gradient-to-br from-primary to-secondary",
      action: () => navigate('/project-management')
    },
    {
      id: 2,
      title: "Join Session",
      description: "Join an active coding session",
      icon: "Users",
      color: "bg-gradient-to-br from-success to-accent",
      action: () => navigate('/code-editor-workspace')
    },
    {
      id: 3,
      title: "Import Project",
      description: "Import from Git repository",
      icon: "Download",
      color: "bg-gradient-to-br from-secondary to-accent",
      action: () => navigate('/project-management')
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "React Dashboard Review",
      time: "2:30 PM",
      participants: ["Sarah", "Mike", "Alex"],
      status: "starting-soon"
    },
    {
      id: 2,
      title: "API Integration Sprint",
      time: "4:00 PM",
      participants: ["John", "Emma"],
      status: "scheduled"
    },
    {
      id: 3,
      title: "Code Review Session",
      time: "Tomorrow 10:00 AM",
      participants: ["Team Alpha"],
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="glass border border-border rounded-xl p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Quick Actions</span>
        </h2>
        
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className="w-full flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <Icon name={action.icon} size={20} color="white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="glass border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={20} />
            <span>Upcoming Sessions</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/project-management')}
          >
            Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">{session.title}</h3>
                  {session.status === 'starting-soon' && (
                    <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-full animate-pulse">
                      Starting Soon
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{session.participants.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                onClick={() => navigate('/code-editor-workspace')}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;