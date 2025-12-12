import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ActivityFeed from './components/ActivityFeed';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import ProjectFilters from './components/ProjectFilters';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('grid');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filters, setFilters] = useState({ status: 'all', language: 'all', team: 'all' });
  const [sortBy, setSortBy] = useState('recent');

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "React Dashboard",
      description: "Modern admin dashboard with real-time analytics",
      language: "React",
      status: "active",
      files: 47,
      commits: 156,
      lines: "12.5k",
      collaborators: [
        { name: "Sarah Chen", avatar: "SC", color: "bg-success", status: "online" },
        { name: "Mike Johnson", avatar: "MJ", color: "bg-primary", status: "coding" },
        { name: "Alex Kim", avatar: "AK", color: "bg-secondary", status: "away" }
      ],
      lastActivity: {
        action: "Updated authentication module",
        time: "2 minutes ago"
      }
    },
    {
      id: 2,
      name: "API Gateway",
      description: "Microservices API gateway with rate limiting",
      language: "TypeScript",
      status: "active",
      files: 23,
      commits: 89,
      lines: "8.2k",
      collaborators: [
        { name: "Emma Wilson", avatar: "EW", color: "bg-accent", status: "online" },
        { name: "David Lee", avatar: "DL", color: "bg-warning", status: "coding" }
      ],
      lastActivity: {
        action: "Fixed rate limiting bug",
        time: "15 minutes ago"
      }
    },
    {
      id: 3,
      name: "Mobile App",
      description: "Cross-platform mobile application",
      language: "React",
      status: "draft",
      files: 31,
      commits: 45,
      lines: "6.8k",
      collaborators: [
        { name: "Lisa Zhang", avatar: "LZ", color: "bg-error", status: "away" }
      ],
      lastActivity: {
        action: "Created navigation structure",
        time: "1 hour ago"
      }
    },
    {
      id: 4,
      name: "Data Analytics",
      description: "Real-time data processing and visualization",
      language: "Python",
      status: "active",
      files: 18,
      commits: 203,
      lines: "15.3k",
      collaborators: [
        { name: "John Smith", avatar: "JS", color: "bg-primary", status: "online" },
        { name: "Maria Garcia", avatar: "MG", color: "bg-success", status: "coding" },
        { name: "Tom Brown", avatar: "TB", color: "bg-secondary", status: "online" }
      ],
      lastActivity: {
        action: "Optimized data pipeline",
        time: "3 hours ago"
      }
    },
    {
      id: 5,
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution",
      language: "Vue",
      status: "archived",
      files: 67,
      commits: 312,
      lines: "22.1k",
      collaborators: [
        { name: "Anna Johnson", avatar: "AJ", color: "bg-accent", status: "away" },
        { name: "Chris Wilson", avatar: "CW", color: "bg-warning", status: "away" }
      ],
      lastActivity: {
        action: "Archived project",
        time: "2 days ago"
      }
    },
    {
      id: 6,
      name: "Chat Application",
      description: "Real-time messaging with video calls",
      language: "JavaScript",
      status: "active",
      files: 29,
      commits: 78,
      lines: "9.4k",
      collaborators: [
        { name: "Ryan Davis", avatar: "RD", color: "bg-error", status: "coding" },
        { name: "Sophie Miller", avatar: "SM", color: "bg-primary", status: "online" }
      ],
      lastActivity: {
        action: "Added video call feature",
        time: "4 hours ago"
      }
    }
  ];

  // Mock data for statistics
  const stats = [
    {
      id: 1,
      label: "Active Projects",
      value: "12",
      change: "+2",
      trend: "up",
      icon: "FolderOpen",
      bgColor: "bg-gradient-to-br from-primary to-secondary",
      description: "Currently active collaborative projects",
      progress: 75,
      progressColor: "bg-primary"
    },
    {
      id: 2,
      label: "Total Collaborators",
      value: "28",
      change: "+5",
      trend: "up",
      icon: "Users",
      bgColor: "bg-gradient-to-br from-success to-accent",
      description: "Team members across all projects",
      progress: 85,
      progressColor: "bg-success"
    },
    {
      id: 3,
      label: "Code Commits",
      value: "1,247",
      change: "+156",
      trend: "up",
      icon: "GitCommit",
      bgColor: "bg-gradient-to-br from-secondary to-accent",
      description: "Total commits this month",
      progress: 92,
      progressColor: "bg-secondary"
    },
    {
      id: 4,
      label: "Lines of Code",
      value: "89.2k",
      change: "+12.5k",
      trend: "up",
      icon: "Code2",
      bgColor: "bg-gradient-to-br from-accent to-warning",
      description: "Total lines across all projects",
      progress: 68,
      progressColor: "bg-accent"
    }
  ];

  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      type: "commit",
      user: { name: "Sarah Chen", avatar: "SC", color: "bg-success" },
      action: "Committed changes to React Dashboard",
      project: "React Dashboard",
      details: "Updated authentication module with OAuth integration",
      timestamp: "2 min ago"
    },
    {
      id: 2,
      type: "join",
      user: { name: "Mike Johnson", avatar: "MJ", color: "bg-primary" },
      action: "Joined coding session",
      project: "API Gateway",
      details: "Started working on rate limiting feature",
      timestamp: "15 min ago"
    },
    {
      id: 3,
      type: "merge",
      user: { name: "Alex Kim", avatar: "AK", color: "bg-secondary" },
      action: "Merged pull request",
      project: "Mobile App",
      details: "Navigation structure implementation",
      timestamp: "1 hour ago"
    },
    {
      id: 4,
      type: "create",
      user: { name: "Emma Wilson", avatar: "EW", color: "bg-accent" },
      action: "Created new branch",
      project: "Data Analytics",
      details: "Feature/data-visualization branch",
      timestamp: "2 hours ago"
    },
    {
      id: 5,
      type: "edit",
      user: { name: "David Lee", avatar: "DL", color: "bg-warning" },
      action: "Updated project documentation",
      project: "Chat Application",
      details: "Added API documentation and usage examples",
      timestamp: "3 hours ago"
    }
  ];

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...projects];

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(project => project.status === filters.status);
    }
    if (filters.language !== 'all') {
      filtered = filtered.filter(project => project.language.toLowerCase() === filters.language);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'created':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'collaborators':
        filtered.sort((a, b) => b.collaborators.length - a.collaborators.length);
        break;
      default: // recent
        filtered.sort((a, b) => a.id - b.id);
    }

    setFilteredProjects(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pt-16 lg:pl-80">
        <div className="p-6 space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
          >
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your collaborative projects today.
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('/project-management')}
                iconName="Plus"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Create New Project
              </Button>
            </motion.div>
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Projects Section */}
            <div className="xl:col-span-8 space-y-6">
              {/* Project Filters */}
              <ProjectFilters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onViewChange={handleViewChange}
                currentView={currentView}
              />

              {/* Projects Grid/List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="FolderOpen" size={24} />
                    <span>Your Projects</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      ({filteredProjects.length})
                    </span>
                  </h2>
                </div>

                {filteredProjects.length > 0 ? (
                  <div className={
                    currentView === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" :"space-y-4"
                  }>
                    {filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 glass border border-border rounded-xl"
                  >
                    <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or create a new project.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/project-management')}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Project
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-4 space-y-6">
              <QuickActions />
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;