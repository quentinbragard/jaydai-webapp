// src/app/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'
import { ThemeToggle } from '@/components/ThemeToggle'
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signUp, user, loading: authLoading } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Signup form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(loginEmail, loginPassword)
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!signupEmail || !signupPassword || !signupName) {
      setError('Please fill in all required fields')
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      await signUp(signupEmail, signupPassword, signupName)
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto animate-pulse-glow">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Layers,
      title: "Smart Organization",
      description: "Organize prompts with intelligent folders and tags"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Quick access to your most-used templates"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your prompts are encrypted and secure"
    }
  ]

  const benefits = [
    "Unlimited prompt templates",
    "Reusable content blocks", 
    "Team collaboration",
    "Advanced analytics",
    "Priority support"
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center p-12 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 transform rotate-12 scale-150"></div>
        </div>
        
        <div className="relative z-10 max-w-lg animate-slide-up-fade-in">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center animate-gentle-pulse">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">
              Jaydai
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">
            Supercharge Your
            <span className="text-primary block mt-2">AI Prompts</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            The intelligent prompt management platform that transforms how you work with AI. 
            Organize, reuse, and optimize your prompts like never before.
          </p>

          <div className="space-y-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center space-x-4 animate-slide-up-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-primary rounded-full border-2 border-background"></div>
              ))}
            </div>
            <span className="text-sm">Join 10,000+ AI enthusiasts</span>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-6 animate-slide-up-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Jaydai</span>
            </div>
          </div>

          <Card className="border border-border bg-card shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger value="login" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {activeTab === 'login' ? 'Welcome back' : 'Create account'}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {activeTab === 'login' 
                      ? 'Sign in to access your prompt library' 
                      : 'Start your AI journey with Jaydai'
                    }
                  </p>
                </div>

                <CardContent className="p-0 pt-6">
                  {error && (
                    <div className="mb-4 animate-slide-up-fade-in">
                      <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-destructive-foreground">{error}</AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <TabsContent value="login" className="space-y-4 mt-0">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-foreground">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="pl-10 pr-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 smooth-transition">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg button-gradient-hover smooth-transition"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <GoogleSignInButton 
                        className="w-full border-border hover:bg-accent smooth-transition"
                        disabled={isLoading}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </GoogleSignInButton>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-0">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="pl-10 pr-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Must be at least 6 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password" className="text-foreground">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            className="pl-10 pr-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
                            required
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {/* Benefits List */}
                      <div className="bg-accent/50 border border-accent rounded-lg p-4 space-y-3">
                        <p className="text-sm font-medium text-foreground flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-primary" />
                          What you'll get:
                        </p>
                        <div className="space-y-2">
                          {benefits.slice(0, 3).map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg button-gradient-hover smooth-transition"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Create Account
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-primary hover:text-primary/80 smooth-transition">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary hover:text-primary/80 smooth-transition">
                          Privacy Policy
                        </Link>
                      </p>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}