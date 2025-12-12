import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProjectOverview = ({ project }) => {
  const [selectedMetric, setSelectedMetric] = useState('commits');

  const commitData = [
    { name: 'Mon', commits: 12, additions: 245, deletions: 89 },
    { name: 'Tue', commits: 8, additions: 189, deletions: 45 },
    { name: 'Wed', commits: 15, additions: 312, deletions: 123 },
    { name: 'Thu', commits: 22, additions: 456, deletions: 167 },
    { name: 'Fri', commits: 18, additions: 298, deletions: 78 },
    { name: 'Sat', commits: 5, additions: 67, deletions: 23 },
    { name: 'Sun', commits: 3, additions: 34, deletions: 12 }
  ];

  const languageData = [
    { name: 'JavaScript', value: 45, color: '#F7DF1E' },
    { name: 'TypeScript', value: 30, color: '#3178C6' },
    { name: 'CSS', value: 15, color: '#1572B6' },
    { name: 'HTML', value: 10, color: '#E34F26' }
  ];

  const contributorActivity = [
    { name: 'Sarah Chen', commits: 45, linesAdded: 1234, linesRemoved: 456, avatar: 'SC' },
    { name: 'Mike Johnson', commits: 38, linesAdded: 987, linesRemoved: 234, avatar: 'MJ' },
    { name: 'Alex Kim', commits: 29, linesAdded: 756, linesRemoved: 189, avatar: 'AK' },
    { name: 'Emma Davis', commits: 22, linesAdded: 543, linesRemoved: 123, avatar: 'ED' }
  ];

  const recentCommits = [
    {
      id: '1a2b3c4',
      message: 'Implement user authentication with JWT tokens',
      author: 'Sarah Chen',
      timestamp: '2 hours ago',
      additions: 45,
      deletions: 12,
      files: 3
    },
    {
      id: '5d6e7f8',
      message: 'Fix responsive layout issues on mobile devices',
      author: 'Mike Johnson',
      timestamp: '4 hours ago',
      additions: 23,
      deletions: 8,
      files: 2
    },
    {
      id: '9g0h1i2',
      message: 'Add unit tests for API endpoints',
      author: 'Alex Kim',
      timestamp: '6 hours ago',
      additions: 67,
      deletions: 5,
      files: 4
    },
    {
      id: '3j4k5l6',
      message: 'Update documentation and README',
      author: 'Emma Davis',
      timestamp: '8 hours ago',
      additions: 12,
      deletions: 3,
      files: 2
    }
  ];

  const projectStats = {
    totalCommits: 234,
    totalContributors: 4,
    linesOfCode: 12456,
    openIssues: 8,
    closedIssues: 45,
    pullRequests: 12,
    branches: 6,
    releases: 3
  };

  return (
    <div className="space-y-6">
      {/* Project Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Commits', value: projectStats.totalCommits, icon: 'GitCommit', color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Contributors', value: projectStats.totalContributors, icon: 'Users', color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Lines of Code', value: projectStats.linesOfCode.toLocaleString(), icon: 'Code2', color: 'text-success', bg: 'bg-success/10' },
          { label: 'Open Issues', value: projectStats.openIssues, icon: 'AlertCircle', color: 'text-warning', bg: 'bg-warning/10' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass border border-border rounded-xl p-6 hover:shadow-focused transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} color={`var(--color-${stat.color.split('-')[1]})`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commit Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Weekly Activity</h3>
            <div className="flex space-x-2">
              {['commits', 'additions', 'deletions'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                    selectedMetric === metric
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Bar
                  dataKey={selectedMetric}
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Language Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {languageData.map((lang) => (
              <div key={lang.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                ></div>
                <span className="text-sm text-foreground">{lang.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{lang.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contributor Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Top Contributors</h3>
        <div className="space-y-4">
          {contributorActivity.map((contributor, index) => (
            <div key={contributor.name} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                {contributor.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{contributor.name}</p>
                <p className="text-sm text-muted-foreground">{contributor.commits} commits</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success">+{contributor.linesAdded}</p>
                <p className="text-sm text-error">-{contributor.linesRemoved}</p>
              </div>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${(contributor.commits / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Commits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Recent Commits</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentCommits.map((commit) => (
            <div key={commit.id} className="flex items-start space-x-4 p-4 hover:bg-muted/30 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="GitCommit" size={16} color="var(--color-muted-foreground)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{commit.message}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                  <span>{commit.author}</span>
                  <span>{commit.timestamp}</span>
                  <span className="text-success">+{commit.additions}</span>
                  <span className="text-error">-{commit.deletions}</span>
                  <span>{commit.files} files</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {commit.id}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectOverview;