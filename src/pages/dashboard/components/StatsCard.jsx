import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ stat, index }) => {
  const getIconColor = (trend) => {
    switch (trend) {
      case 'up': return 'var(--color-success)';
      case 'down': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className="glass border border-border rounded-xl p-6 transform-3d"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
          <Icon name={stat.icon} size={24} color="white" />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          stat.trend === 'up' ? 'bg-success/20 text-success' :
          stat.trend === 'down'? 'bg-error/20 text-error' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={getTrendIcon(stat.trend)} size={12} />
          <span>{stat.change}</span>
        </div>
      </div>

      <div className="space-y-2">
        <motion.h3 
          className="text-3xl font-heading font-bold text-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
        >
          {stat.value}
        </motion.h3>
        <p className="text-sm text-muted-foreground">{stat.label}</p>
        {stat.description && (
          <p className="text-xs text-muted-foreground">{stat.description}</p>
        )}
      </div>

      {stat.progress && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{stat.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${stat.progressColor || 'bg-primary'}`}
              initial={{ width: 0 }}
              animate={{ width: `${stat.progress}%` }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;