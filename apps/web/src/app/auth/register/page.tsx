'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 flex items-center justify-center p-4">
        <Frame className="p-8 text-center max-w-md">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-ascii-green mb-4">
            Registration Successful!
          </h2>
          <p className="text-ascii-green/70 mb-6">
            Your account has been created successfully. Redirecting to login...
          </p>
          <div className="animate-spin text-2xl">⚙️</div>
        </Frame>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ascii-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ASCII Art Header */}
        <div className="text-center mb-8">
          <div className="text-ascii-green font-mono text-sm leading-tight mb-4">
            {`
╔═══════════════════════════════════════╗
║        METAPULSE REGISTRATION         ║
║                                       ║
║    ⚙️  JOIN THE CRYPTO TERMINAL  ⚙️     ║
╚═══════════════════════════════════════╝
            `}
          </div>
          <h1 className="text-2xl font-bold text-ascii-green mb-2">
            Create Account
          </h1>
          <p className="text-ascii-green/70">
            Join the steampunk crypto trading revolution
          </p>
        </div>

        <Frame className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 border border-ascii-red/50 bg-ascii-red/10 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-ascii-red">❌</span>
                  <span className="text-ascii-red text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-ascii-green text-sm font-bold mb-2">
                  👤 Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-ascii-green text-sm font-bold mb-2">
                  📧 Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-ascii-green text-sm font-bold mb-2">
                  🔐 Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  disabled={loading}
                />
                <div className="text-xs text-ascii-green/60 mt-1">
                  Minimum 6 characters required
                </div>
              </div>

              <div>
                <label className="block text-ascii-green text-sm font-bold mb-2">
                  🔒 Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="text-xs text-ascii-green/60 leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-ascii-green hover:text-ascii-green/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-ascii-green hover:text-ascii-green/80">
                Privacy Policy
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin">⚙️</div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Create Account</span>
                </div>
              )}
            </Button>

            <div className="text-center">
              <div className="text-ascii-green/50 text-sm">
                Already have an account?{' '}
                <Link 
                  href="/auth/login"
                  className="text-ascii-green hover:text-ascii-green/80 font-bold"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </Frame>

        {/* Features Preview */}
        <Frame className="mt-6 p-4">
          <div className="text-center">
            <h3 className="text-ascii-green font-bold text-sm mb-3">
              🎯 What You'll Get
            </h3>
            <div className="text-ascii-green/70 text-xs space-y-2">
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>Real-time crypto signals & analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👁️</span>
                <span>Personalized watchlists & alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤖</span>
                <span>AI-powered trading insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>Telegram bot integration</span>
              </div>
            </div>
          </div>
        </Frame>

        {/* Footer */}
        <div className="text-center mt-8 text-ascii-green/50 text-xs">
          <div className="font-mono">
            {`
    ⚙️ ═══════════════════════════════════════ ⚙️
       SECURE REGISTRATION TERMINAL v2.0
    ⚙️ ═══════════════════════════════════════ ⚙️
            `}
          </div>
        </div>
      </div>
    </div>
  );
}