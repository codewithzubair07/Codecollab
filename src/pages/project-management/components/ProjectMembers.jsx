import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectMembers = ({ project }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const roleOptions = [
    { value: 'owner', label: 'Owner', description: 'Full access to all project settings' },
    { value: 'admin', label: 'Admin', description: 'Manage members and project settings' },
    { value: 'developer', label: 'Developer', description: 'Read and write access to code' },
    { value: 'reviewer', label: 'Reviewer', description: 'Review code and approve changes' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access to project' }
  ];

  const members = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@codecollab.dev',
      role: 'owner',
      avatar: 'SC',
      status: 'online',
      lastActive: 'Active now',
      joinDate: '2024-01-15',
      contributions: 156,
      permissions: ['read', 'write', 'admin', 'delete']
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@codecollab.dev',
      role: 'admin',
      avatar: 'MJ',
      status: 'coding',
      lastActive: '5 minutes ago',
      joinDate: '2024-02-20',
      contributions: 89,
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 3,
      name: 'Alex Kim',
      email: 'alex.kim@codecollab.dev',
      role: 'developer',
      avatar: 'AK',
      status: 'away',
      lastActive: '2 hours ago',
      joinDate: '2024-03-10',
      contributions: 67,
      permissions: ['read', 'write']
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@codecollab.dev',
      role: 'reviewer',
      avatar: 'ED',
      status: 'offline',
      lastActive: '1 day ago',
      joinDate: '2024-03-25',
      contributions: 34,
      permissions: ['read', 'review']
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@codecollab.dev',
      role: 'viewer',
      avatar: 'DW',
      status: 'offline',
      lastActive: '3 days ago',
      joinDate: '2024-04-05',
      contributions: 12,
      permissions: ['read']
    }
  ];

  const pendingInvitations = [
    {
      id: 1,
      email: 'john.doe@example.com',
      role: 'developer',
      invitedBy: 'Sarah Chen',
      invitedAt: '2 days ago',
      status: 'pending'
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      role: 'reviewer',
      invitedBy: 'Mike Johnson',
      invitedAt: '1 week ago',
      status: 'expired'
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteMember = () => {
    if (inviteEmail && inviteRole) {
      console.log('Inviting member:', { email: inviteEmail, role: inviteRole });
      setInviteEmail('');
      setInviteRole('developer');
    }
  };

  const handleRoleChange = (memberId, newRole) => {
    console.log('Changing role for member:', memberId, 'to:', newRole);
  };

  const handleRemoveMember = (memberId) => {
    console.log('Removing member:', memberId);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner': return 'text-primary bg-primary/10';
      case 'admin': return 'text-secondary bg-secondary/10';
      case 'developer': return 'text-success bg-success/10';
      case 'reviewer': return 'text-warning bg-warning/10';
      case 'viewer': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'coding': return 'bg-primary';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Invite New Member */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="UserPlus" size={20} />
          <span>Invite New Member</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="md:col-span-2"
          />
          <Select
            options={roleOptions}
            value={inviteRole}
            onChange={setInviteRole}
            placeholder="Select role"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            onClick={handleInviteMember}
            disabled={!inviteEmail || !inviteRole}
          >
            Send Invitation
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </motion.div>

      {/* Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass border border-border rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Users" size={20} />
            <span>Team Members ({filteredMembers.length})</span>
          </h3>
        </div>
        <div className="divide-y divide-border">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-card`}></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{member.contributions} contributions</p>
                    <p className="text-xs text-muted-foreground">Joined {member.joinDate}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Settings"
                      onClick={() => console.log('Edit member:', member.id)}
                    />
                    {member.role !== 'owner' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Trash2"
                        onClick={() => handleRemoveMember(member.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Permissions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {member.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border border-border rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Pending Invitations ({pendingInvitations.length})</span>
            </h3>
          </div>
          <div className="divide-y divide-border">
            {pendingInvitations.map((invitation) => (
              <div key={invitation.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{invitation.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Invited by {invitation.invitedBy} • {invitation.invitedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(invitation.role)}`}>
                    {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    invitation.status === 'pending' ?'bg-warning/20 text-warning' :'bg-error/20 text-error'
                  }`}>
                    {invitation.status}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="RotateCcw"
                      onClick={() => console.log('Resend invitation:', invitation.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="X"
                      onClick={() => console.log('Cancel invitation:', invitation.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectMembers;