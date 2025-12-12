import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProjectFilters = ({ onFilterChange, onSortChange, onViewChange, currentView }) => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    language: 'all',
    team: 'all'
  });

  const [sortBy, setSortBy] = useState('recent');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
    { value: 'draft', label: 'Draft' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ];

  const teamOptions = [
    { value: 'all', label: 'All Teams' },
    { value: 'personal', label: 'Personal' },
    { value: 'team-alpha', label: 'Team Alpha' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Updated' },
    { value: 'name', label: 'Project Name' },
    { value: 'created', label: 'Date Created' },
    { value: 'collaborators', label: 'Most Collaborators' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    const clearedFilters = { status: 'all', language: 'all', team: 'all' };
    setActiveFilters(clearedFilters);
    setSortBy('recent');
    onFilterChange(clearedFilters);
    onSortChange('recent');
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== 'all') || sortBy !== 'recent';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass border border-border rounded-xl p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select
              options={statusOptions}
              value={activeFilters.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Status"
              className="w-32"
            />
            
            <Select
              options={languageOptions}
              value={activeFilters.language}
              onChange={(value) => handleFilterChange('language', value)}
              placeholder="Language"
              className="w-36"
            />
            
            <Select
              options={teamOptions}
              value={activeFilters.team}
              onChange={(value) => handleFilterChange('team', value)}
              placeholder="Team"
              className="w-32"
            />
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              placeholder="Sort by"
              className="w-40"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 p-1 bg-muted rounded-lg">
            <Button
              variant={currentView === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => onViewChange('grid')}
              className="px-3"
            />
            <Button
              variant={currentView === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => onViewChange('list')}
              className="px-3"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border"
        >
          {Object.entries(activeFilters).map(([key, value]) => {
            if (value === 'all') return null;
            return (
              <span
                key={key}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
              >
                <span>{key}: {value}</span>
                <button
                  onClick={() => handleFilterChange(key, 'all')}
                  className="hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
          
          {sortBy !== 'recent' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
              <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <button
                onClick={() => handleSortChange('recent')}
                className="hover:text-secondary/80 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectFilters;