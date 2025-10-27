'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { userApi } from '@/lib/api';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { formatTimeAgo } from '@/lib/utils';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  telegramUsername?: string;
  telegramChatId?: string;
  preferences: {
    notifications: {
      email: boolean;
      telegram: boolean;
      priceAlerts: boolean;
      signalAlerts: boolean;
    };
    defaultTimeframe: string;
    theme: string;
  };
  stats: {
    watchlistCount: number;
    alertsCount: number;
    signalsReceived: number;
    joinedAt: string;
  };
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegramUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      telegram: false,
      priceAlerts: true,
      signalAlerts: true,
    },
    defaultTimeframe: '24h',
    theme: 'steampunk'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await userApi.getProfile();
        const profileData = response.data;
        
        setProfile(profileData);
        setFormData({
          name: profileData.name || '',
          email: profileData.email || '',
          telegramUsername: profileData.telegramUsername || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPreferences(profileData.preferences || preferences);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await userApi.updateProfile({
        name: formData.name,
        telegramUsername: formData.telegramUsername
      });
      
      setSuccess('Profile updated successfully');
      await refreshUser();
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setSaving(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setSaving(false);
      return;
    }

    try {
      await userApi.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setSuccess('Password changed successfully');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error: any) {
      setError(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await userApi.updatePreferences(preferences);
      setSuccess('Preferences updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleTelegramLink = async () => {
    try {
      const response = await userApi.generateTelegramLink();
      window.open(response.data.telegramUrl, '_blank');
    } catch (error: any) {
      setError(error.message || 'Failed to generate Telegram link');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 p-4 flex items-center justify-center">
        <Loading text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 p-4 flex items-center justify-center">
        <Frame className="p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-ascii-red mb-4">Profile Not Found</h2>
          <p className="text-ascii-green/70">Unable to load your profile.</p>
        </Frame>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ascii-dark-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Frame className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ascii-green mb-2">
                User Profile
              </h1>
              <p className="text-ascii-green/70">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="text-right">
              <div className="text-ascii-green font-bold">{profile.name}</div>
              <div className="text-ascii-green/70 text-sm">
                Member since {formatTimeAgo(profile.stats.joinedAt)}
              </div>
            </div>
          </div>
        </Frame>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Frame className="p-6 text-center">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-xl font-bold text-ascii-green">
              {profile.stats.watchlistCount}
            </div>
            <div className="text-sm text-ascii-green/70">Watchlist Items</div>
          </Frame>

          <Frame className="p-6 text-center">
            <div className="text-2xl mb-2">🔔</div>
            <div className="text-xl font-bold text-ascii-green">
              {profile.stats.alertsCount}
            </div>
            <div className="text-sm text-ascii-green/70">Active Alerts</div>
          </Frame>

          <Frame className="p-6 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xl font-bold text-ascii-green">
              {profile.stats.signalsReceived}
            </div>
            <div className="text-sm text-ascii-green/70">Signals Received</div>
          </Frame>

          <Frame className="p-6 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-xl font-bold text-ascii-green">
              {profile.telegramChatId ? 'Connected' : 'Not Connected'}
            </div>
            <div className="text-sm text-ascii-green/70">Telegram Bot</div>
          </Frame>
        </div>

        {/* Tabs */}
        <Frame className="p-2">
          <div className="flex space-x-1">
            {[
              { id: 'profile', label: '👤 Profile', icon: '👤' },
              { id: 'security', label: '🔐 Security', icon: '🔐' },
              { id: 'preferences', label: '⚙️ Preferences', icon: '⚙️' },
              { id: 'telegram', label: '🤖 Telegram', icon: '🤖' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </Frame>

        {/* Messages */}
        {error && (
          <div className="p-4 border border-ascii-red/50 bg-ascii-red/10 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-ascii-red">❌</span>
              <span className="text-ascii-red text-sm">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 border border-ascii-green/50 bg-ascii-green/10 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-ascii-green">✅</span>
              <span className="text-ascii-green text-sm">{success}</span>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <Frame className="p-8">
            <h2 className="text-xl font-bold text-ascii-green mb-6">
              Profile Information
            </h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-ascii-green text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-ascii-green text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    disabled
                    className="opacity-50"
                  />
                  <div className="text-xs text-ascii-green/60 mt-1">
                    Email cannot be changed
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={saving}>
                {saving ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </Frame>
        )}

        {activeTab === 'security' && (
          <Frame className="p-8">
            <h2 className="text-xl font-bold text-ascii-green mb-6">
              Security Settings
            </h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-ascii-green text-sm font-bold mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-ascii-green text-sm font-bold mb-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-ascii-green text-sm font-bold mb-2">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    disabled={saving}
                  />
                </div>
              </div>

              <Button type="submit" disabled={saving || !formData.currentPassword || !formData.newPassword}>
                {saving ? 'Changing Password...' : 'Change Password'}
              </Button>
            </form>
          </Frame>
        )}

        {activeTab === 'preferences' && (
          <Frame className="p-8">
            <h2 className="text-xl font-bold text-ascii-green mb-6">
              Preferences
            </h2>
            
            <div className="space-y-8">
              {/* Notifications */}
              <div>
                <h3 className="text-lg font-bold text-ascii-green mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  {Object.entries(preferences.notifications).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [key]: e.target.checked
                          }
                        }))}
                        className="w-4 h-4 text-ascii-green bg-ascii-dark-800 border-ascii-green/30 rounded focus:ring-ascii-green"
                      />
                      <span className="text-ascii-green capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Default Timeframe */}
              <div>
                <h3 className="text-lg font-bold text-ascii-green mb-4">
                  Default Timeframe
                </h3>
                <select
                  value={preferences.defaultTimeframe}
                  onChange={(e) => setPreferences(prev => ({ ...prev, defaultTimeframe: e.target.value }))}
                  className="w-full p-3 bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green rounded focus:outline-none focus:border-ascii-green"
                >
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>

              <Button onClick={handlePreferencesUpdate} disabled={saving}>
                {saving ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </Frame>
        )}

        {activeTab === 'telegram' && (
          <Frame className="p-8">
            <h2 className="text-xl font-bold text-ascii-green mb-6">
              Telegram Integration
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 border border-ascii-green/30 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ascii-green mb-2">
                      Bot Connection Status
                    </h3>
                    <p className="text-ascii-green/70">
                      {profile.telegramChatId 
                        ? `Connected as @${profile.telegramUsername || 'Unknown'}`
                        : 'Not connected to Telegram bot'
                      }
                    </p>
                  </div>
                  <div className="text-3xl">
                    {profile.telegramChatId ? '✅' : '❌'}
                  </div>
                </div>
              </div>

              {!profile.telegramChatId && (
                <div className="space-y-4">
                  <div className="p-4 bg-ascii-dark-800 border border-ascii-green/30 rounded">
                    <h4 className="font-bold text-ascii-green mb-2">
                      How to connect:
                    </h4>
                    <ol className="text-ascii-green/70 text-sm space-y-1 list-decimal list-inside">
                      <li>Click the "Connect Telegram" button below</li>
                      <li>Start a chat with the MetaPulse bot</li>
                      <li>Send the /start command</li>
                      <li>Your account will be automatically linked</li>
                    </ol>
                  </div>

                  <Button onClick={handleTelegramLink}>
                    🤖 Connect Telegram Bot
                  </Button>
                </div>
              )}

              {profile.telegramChatId && (
                <div className="space-y-4">
                  <div className="p-4 bg-ascii-green/10 border border-ascii-green/30 rounded">
                    <h4 className="font-bold text-ascii-green mb-2">
                      ✅ Connected Successfully!
                    </h4>
                    <p className="text-ascii-green/70 text-sm">
                      You can now receive alerts and manage your watchlist through Telegram.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline">
                      Test Connection
                    </Button>
                    <Button variant="outline" className="text-ascii-red border-ascii-red/30">
                      Disconnect
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Frame>
        )}
      </div>
    </div>
  );
}