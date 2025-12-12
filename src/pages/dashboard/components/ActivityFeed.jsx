import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'commit': 'GitCommit',
      'merge': 'GitMerge',
      'branch': 'GitBranch',
      'join': 'UserPlus',
      'leave': 'UserMinus',
      'edit': 'Edit3',
      'create': 'Plus',
      'delete': 'Trash2'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'commit': 'text-success',
      'merge': 'text-primary',
      'branch': 'text-secondary',
      'join': 'text-success',
      'leave': 'text-warning',
      'edit': 'text-accent',
      'create': 'text-primary',
      'delete': 'text-error'
    };
    return colors[type] || 'text-muted-foreground';
  };

  return (
    <div className="glass border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>Recent Activity</span>
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${activity.user.color}`}>
                  {activity.user.avatar}
                </div>
                <span className="text-sm font-medium text-foreground">{activity.user.name}</span>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              
              <p className="text-sm text-foreground mb-1">{activity.action}</p>
              
              {activity.project && (
                <div className="flex items-center space-x-2">
                  <Icon name="Folder" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{activity.project}</span>
                </div>
              )}
              
              {activity.details && (
                <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;