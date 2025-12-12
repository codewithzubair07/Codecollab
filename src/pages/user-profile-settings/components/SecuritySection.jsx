import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const [activeSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Windows Desktop',
      browser: 'Edge 120.0',
      location: 'New York, NY',
      ipAddress: '10.0.0.50',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    
    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const codes = [
      'A1B2C3D4', 'E5F6G7H8', 'I9J0K1L2', 'M3N4O5P6',
      'Q7R8S9T0', 'U1V2W3X4', 'Y5Z6A7B8', 'C9D0E1F2'
    ];
    
    setBackupCodes(codes);
    setTwoFactorEnabled(true);
    setShowBackupCodes(true);
    setIsEnabling2FA(false);
  };

  const handleDisable2FA = async () => {
    setIsEnabling2FA(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTwoFactorEnabled(false);
    setBackupCodes([]);
    setShowBackupCodes(false);
    setIsEnabling2FA(false);
  };

  const handleRevokeSession = async (sessionId) => {
    // Simulate session revocation
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) return 'Smartphone';
    if (device.includes('iPad') || device.includes('Tablet')) return 'Tablet';
    if (device.includes('Mac')) return 'Laptop';
    return 'Monitor';
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security, password, and authentication methods.
        </p>
      </div>

      {/* Password Change */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lock" size={20} />
          <span>Change Password</span>
        </h4>
        
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            placeholder="Enter current password"
            required
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password"
            description="Must be at least 8 characters with uppercase, lowercase, and numbers"
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
            error={passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword ? "Passwords don't match" : ""}
            required
          />
          
          <Button
            variant="default"
            loading={isChangingPassword}
            iconName="Save"
            iconPosition="left"
            onClick={handlePasswordChange}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
          >
            {isChangingPassword ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} />
          <span>Two-Factor Authentication</span>
        </h4>
        
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-success' : 'bg-muted-foreground'}`}></div>
              <span className="text-sm font-medium text-foreground">
                {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account by requiring a verification code in addition to your password.
            </p>
            
            {!twoFactorEnabled ? (
              <Button
                variant="default"
                loading={isEnabling2FA}
                iconName="Shield"
                iconPosition="left"
                onClick={handleEnable2FA}
              >
                {isEnabling2FA ? 'Enabling 2FA...' : 'Enable Two-Factor Authentication'}
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="destructive"
                  loading={isEnabling2FA}
                  iconName="ShieldOff"
                  iconPosition="left"
                  onClick={handleDisable2FA}
                >
                  {isEnabling2FA ? 'Disabling 2FA...' : 'Disable Two-Factor Authentication'}
                </Button>
                
                {showBackupCodes && (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <h5 className="font-medium text-warning mb-2 flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} />
                      <span>Backup Codes</span>
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {backupCodes.map((code, index) => (
                        <code key={index} className="text-xs bg-background p-2 rounded border font-mono">
                          {code}
                        </code>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => setShowBackupCodes(false)}
                    >
                      Download Codes
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Monitor" size={20} />
          <span>Active Sessions</span>
        </h4>
        
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(session.device)} size={18} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-foreground">{session.device}</h5>
                    {session.current && (
                      <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session.browser}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} • {session.ipAddress} • {session.lastActive}
                  </p>
                </div>
              </div>
              
              {!session.current && (
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleRevokeSession(session.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="LogOut"
            iconPosition="left"
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="ShieldCheck" size={20} />
          <span>Security Recommendations</span>
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="Check" size={12} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Strong Password</p>
              <p className="text-xs text-muted-foreground">
                Your password meets our security requirements.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="AlertTriangle" size={12} color="var(--color-warning)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security to protect your account from unauthorized access.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="Info" size={12} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Regular Security Checkups</p>
              <p className="text-xs text-muted-foreground">
                Review your active sessions and connected applications regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;