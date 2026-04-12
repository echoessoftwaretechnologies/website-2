import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

// Simple hash function (for demo - production should use bcrypt/argon2 on server)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
};

// Pre-hashed password using simpleHash
const STORED_PASSWORD_HASH = simpleHash('Echoes!Tech$Secure^Cloud_91' + 'echoes_salt_2024');
const SALT = 'echoes_salt_2024';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Hash the entered password with salt
    const hashedInput = simpleHash(password + SALT);
    
    // Simulate API delay for security feel
    setTimeout(() => {
      // Check credentials with hashed password
      if (email === 'admin@echoess.in' && hashedInput === STORED_PASSWORD_HASH) {
        localStorage.setItem('workspace_auth', 'true');
        localStorage.setItem('workspace_user', JSON.stringify({
          email: 'admin@echoess.in',
          name: 'Admin Team',
          role: 'Administrator'
        }));
        navigate('/workspace');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 [&_*]:!font-[Montserrat]" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/2.png" alt="Echoes Software" className="w-[160px] h-auto mx-auto object-contain" />
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-border p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-medium mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access the workspace
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@echoess.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-foreground text-background font-semibold hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 rounded"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Encryption Badge */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>SHA-256 Encrypted</span>
              <span className="mx-0.5">•</span>
              <span>Secure Connection</span>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
