import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  const activities = [
    {
      id: 1,
      type: 'commit',
      user: 'Sarah Chen',
      avatar: 'SC',
      action: 'committed changes to',
      target: 'feature/authentication',
      message: 'Implement JWT token validation',
      timestamp: '2 minutes ago',
      details: {
        additions: 45,
        deletions: 12,
        files: 3
      }
    },
    {
      id: 2,
      type: 'pull_request',
      user: 'Mike Johnson',
      avatar: 'MJ',
      action: 'opened pull request',
      target: '#23: Add user profile settings',
      message: 'This PR adds comprehensive user profile management with avatar upload and preference settings.',
      timestamp: '15 minutes ago',
      details: {
        status: 'open',
        reviewers: ['Sarah Chen', 'Alex Kim']
      }
    },
    {
      id: 3,
      type: 'review',
      user: 'Alex Kim',
      avatar: 'AK',
      action: 'approved pull request',
      target: '#22: Fix responsive layout issues',
      message: 'LGTM! Great work on the mobile responsiveness.',
      timestamp: '1 hour ago',
      details: {
        status: 'approved'
      }
    },
    {
      id: 4,
      type: 'merge',
      user: 'Sarah Chen',
      avatar: 'SC',
      action: 'merged pull request',
      target: '#22: Fix responsive layout issues',
      message: 'Merged into main branch',
      timestamp: '2 hours ago',
      details: {
        branch: 'main',
        commits: 4
      }
    },
    {
      id: 5,
      type: 'issue',
      user: 'Emma Davis',
      avatar: 'ED',
      action: 'created issue',
      target: '#45: Performance optimization needed',
      message: 'The dashboard is loading slowly with large datasets. We need to implement virtualization.',
      timestamp: '3 hours ago',
      details: {
        priority: 'high',
        labels: ['performance', 'bug']
      }
    },
    {
      id: 6,
      type: 'branch',
      user: 'Mike Johnson',
      avatar: 'MJ',
      action: 'created branch',
      target: 'feature/dark-mode',
      message: 'Starting work on dark mode implementation',
      timestamp: '4 hours ago',
      details: {
        from: 'main'
      }
    },
    {
      id: 7,
      type: 'member',
      user: 'Sarah Chen',
      avatar: 'SC',
      action: 'invited',
      target: 'david.wilson@codecollab.dev',
      message: 'Added as a reviewer to the project',
      timestamp: '1 day ago',
      details: {
        role: 'reviewer'
      }
    },
    {
      id: 8,
      type: 'release',
      user: 'Alex Kim',
      avatar: 'AK',
      action: 'published release',
      target: 'v2.1.0',
      message: 'Major update with new collaboration features and performance improvements.',
      timestamp: '2 days ago',
      details: {
        tag: 'v2.1.0',
        assets: 3
      }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'commits', label: 'Commits', icon: 'GitCommit' },
    { value: 'pull_requests', label: 'Pull Requests', icon: 'GitPullRequest' },
    { value: 'issues', label: 'Issues', icon: 'AlertCircle' },
    { value: 'releases', label: 'Releases', icon: 'Tag' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'commits') return activity.type === 'commit';
    if (filter === 'pull_requests') return activity.type === 'pull_request' || activity.type === 'review' || activity.type === 'merge';
    if (filter === 'issues') return activity.type === 'issue';
    if (filter === 'releases') return activity.type === 'release';
    return true;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit': return 'GitCommit';
      case 'pull_request': return 'GitPullRequest';
      case 'review': return 'Eye';
      case 'merge': return 'GitMerge';
      case 'issue': return 'AlertCircle';
      case 'branch': return 'GitBranch';
      case 'member': return 'UserPlus';
      case 'release': return 'Tag';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'commit': return 'text-primary';
      case 'pull_request': return 'text-secondary';
      case 'review': return 'text-success';
      case 'merge': return 'text-success';
      case 'issue': return 'text-warning';
      case 'branch': return 'text-accent';
      case 'member': return 'text-secondary';
      case 'release': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const renderActivityDetails = (activity) => {
    switch (activity.type) {
      case 'commit':
        return (
          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
            <span className="text-success">+{activity.details.additions}</span>
            <span className="text-error">-{activity.details.deletions}</span>
            <span>{activity.details.files} files</span>
          </div>
        );
      case 'pull_request':
        return (
          <div className="mt-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className={`px-2 py-1 rounded-full ${
                activity.details.status === 'open' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
              }`}>
                {activity.details.status}
              </span>
              <span>Reviewers: {activity.details.reviewers.join(', ')}</span>
            </div>
          </div>
        );
      case 'issue':
        return (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                activity.details.priority === 'high' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
              }`}>
                {activity.details.priority}
              </span>
              {activity.details.labels.map((label) => (
                <span key={label} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {label}
                </span>
              ))}
            </div>
          </div>
        );
      case 'release':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
            <span>Tag: {activity.details.tag}</span>
            <span>{activity.details.assets} assets</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                timeRange === option.value
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass border border-border rounded-xl p-4 hover:shadow-focused transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                  {activity.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-card rounded-full flex items-center justify-center border-2 border-card`}>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={12} 
                    color={`var(--color-${getActivityColor(activity.type).split('-')[1]})`}
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{activity.user}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  <span className="font-medium text-foreground">{activity.target}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{activity.message}</p>
                
                {renderActivityDetails(activity)}
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" iconName="MessageCircle" />
                    <Button variant="ghost" size="icon" iconName="Heart" />
                    <Button variant="ghost" size="icon" iconName="Share" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="outline" iconName="ChevronDown" iconPosition="left">
          Load More Activity
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;