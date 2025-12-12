import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'archived': return 'bg-muted text-muted-foreground border-border';
      case 'draft': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getLanguageIcon = (language) => {
    const icons = {
      'JavaScript': 'FileText',
      'TypeScript': 'FileCode',
      'Python': 'Code2',
      'React': 'Layers',
      'Vue': 'Zap',
      'Angular': 'Triangle'
    };
    return icons[language] || 'Code';
  };

  const handleJoinProject = () => {
    navigate('/code-editor-workspace', { state: { projectId: project.id } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        z: 50
      }}
      className="transform-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass border border-border rounded-xl p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-focused">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name={getLanguageIcon(project.language)} size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{project.files}</p>
            <p className="text-xs text-muted-foreground">Files</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">{project.commits}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">{project.lines}</p>
            <p className="text-xs text-muted-foreground">Lines</p>
          </div>
        </div>

        {/* Collaborators */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Collaborators</span>
            <span className="text-xs text-muted-foreground">{project.collaborators.length} active</span>
          </div>
          <div className="flex items-center space-x-2">
            {project.collaborators.slice(0, 4).map((collaborator, idx) => (
              <div key={idx} className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${collaborator.color}`}>
                  {collaborator.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                  collaborator.status === 'online' ? 'bg-success' : 
                  collaborator.status === 'coding' ? 'bg-primary' : 'bg-muted-foreground'
                }`}></div>
              </div>
            ))}
            {project.collaborators.length > 4 && (
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{project.collaborators.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Last Activity */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">Last activity</span>
          </div>
          <p className="text-sm text-foreground">{project.lastActivity.action}</p>
          <p className="text-xs text-muted-foreground">{project.lastActivity.time}</p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="flex space-x-2"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="default"
            size="sm"
            onClick={handleJoinProject}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            Join Session
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/project-management', { state: { projectId: project.id } })}
            iconName="Settings"
            iconPosition="left"
          >
            Manage
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;