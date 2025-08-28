'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import {
  BarChart3,
  Users,
  Clock,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  Plus,
  TrendingUp,
} from '@/components/ui/icons'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')
    }
  }, [])

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Real-time Analytics',
      description:
        'Watch votes pour in with stunning visualizations and live updates.',
      gradient: 'from-brand-blue to-brand-indigo',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Smart Sharing',
      description:
        'Generate QR codes and share polls instantly across all platforms.',
      gradient: 'from-brand-indigo to-purple-600',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Private',
      description:
        'Enterprise-grade security with optional authentication controls.',
      gradient: 'from-purple-600 to-brand-orange',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description:
        'Create professional polls in seconds with our intuitive interface.',
      gradient: 'from-brand-orange to-orange-400',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'Mobile-optimized design works perfectly on any device.',
      gradient: 'from-orange-400 to-brand-blue',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Smart Scheduling',
      description: 'Set expiration times or keep polls open indefinitely.',
      gradient: 'from-brand-blue to-brand-indigo',
    },
  ]

  const stats = [
    {
      label: 'Active Polls',
      value: '12K+',
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      label: 'Total Votes',
      value: '2.5M+',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      label: 'Happy Users',
      value: '50K+',
      icon: <Users className="h-6 w-6" />,
    },
    { label: 'Countries', value: '195', icon: <Globe className="h-6 w-6" /> },
  ]

  const testimonials = [
    {
      quote:
        'This platform transformed how we make team decisions. The real-time results are incredible!',
      author: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechFlow',
      avatar: 'SC',
    },
    {
      quote:
        'The QR code feature made our conference polling seamless. Attendees loved it!',
      author: 'Michael Torres',
      role: 'Event Director',
      company: 'InnovateX',
      avatar: 'MT',
    },
    {
      quote:
        'Beautiful interface, powerful analytics. Everything we needed for customer feedback.',
      author: 'Emily Rodriguez',
      role: 'Marketing Lead',
      company: 'GrowthLab',
      avatar: 'ER',
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="particles fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-orange/20 rounded-full blur-xl animate-float-delayed opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-indigo/30 rounded-full blur-lg animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="stagger-fade-in space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80">Join 50K+ users worldwide</span>
            </div>

            {/* Hero Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="hero-gradient-text block">Create Polls</span>
                <span className="hero-gradient-text block">That Captivate</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                Transform decision-making with our stunning polling platform.
                Real-time results, beautiful analytics, and seamless sharing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              {isAuthenticated ? (
                <Link href="/polls/new" className="group">
                  <div className="floating-button px-8 py-4 text-lg font-semibold text-white flex items-center gap-3">
                    <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                    Create Your Poll
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              ) : (
                <Link href="/auth/register" className="group">
                  <div className="floating-button px-8 py-4 text-lg font-semibold text-white flex items-center gap-3">
                    <Zap className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    Start Free Today
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              )}

              <Link href="/polls">
                <Button
                  variant="ghost"
                  size="lg"
                  className="glass-button text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
                >
                  <BarChart3 className="h-6 w-6 mr-2" />
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 text-center">
              <p className="text-white/60 text-sm mb-4">
                Trusted by leading teams
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-2 text-white/70 text-sm">
                  4.9/5 from 2.1K+ reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator animate-bounce-slow">
          <div className="text-white/60 text-sm mb-2">Discover More</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-brand-blue mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 stagger-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need to create, share, and analyze polls with
              professional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 group cursor-pointer ripple-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-all duration-300 shadow-glow`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="stagger-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                  See It In Action
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  Experience the power of real-time polling with our interactive
                  demo. Watch votes update instantly with beautiful animations.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      feature: 'Real-time vote tracking',
                      icon: <TrendingUp className="h-5 w-5" />,
                    },
                    {
                      feature: 'Beautiful result visualization',
                      icon: <BarChart3 className="h-5 w-5" />,
                    },
                    {
                      feature: 'Instant QR code generation',
                      icon: <Zap className="h-5 w-5" />,
                    },
                    {
                      feature: 'Mobile-responsive design',
                      icon: <Globe className="h-5 w-5" />,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div className="text-brand-blue">{item.icon}</div>
                      <span>{item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Poll Card */}
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-blue/30 rounded-full blur-sm animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-brand-orange/40 rounded-full blur-sm animate-float-delayed"></div>

              <div className="glass-card p-8 card-glow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    What&apos;s your favorite coding language?
                  </h3>
                  <div className="text-white/60 text-sm">127 votes</div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: 'JavaScript',
                      votes: 45,
                      percentage: 45,
                      color: 'bg-brand-blue',
                    },
                    {
                      name: 'Python',
                      votes: 38,
                      percentage: 38,
                      color: 'bg-brand-indigo',
                    },
                    {
                      name: 'TypeScript',
                      votes: 32,
                      percentage: 32,
                      color: 'bg-brand-orange',
                    },
                    {
                      name: 'Go',
                      votes: 12,
                      percentage: 12,
                      color: 'bg-purple-500',
                    },
                  ].map((option, index) => (
                    <div key={index} className="space-y-2 group cursor-pointer">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-medium group-hover:gradient-text transition-all duration-300">
                          {option.name}
                        </span>
                        <span className="text-white/70">
                          {option.votes} votes ({option.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${option.color} rounded-full transition-all duration-1000 ease-out shadow-glow group-hover:shadow-glow-lg`}
                          style={{
                            width: `${option.percentage}%`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
                  <Button className="flex-1 glass-button">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                  <Button className="flex-1 glass-button">
                    <Users className="h-4 w-4 mr-2" />
                    Share Poll
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Loved by Teams Worldwide
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-white/70 ml-2">
                4.9/5 from 2,100+ reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-indigo flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                    <p className="text-white/50 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/20 via-brand-blue/20 to-brand-orange/20 opacity-50"></div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold hero-gradient-text">
                Ready to Transform Your Polls?
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join thousands of teams already using our platform to make
                better decisions together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                {isAuthenticated ? (
                  <Link href="/polls/new">
                    <div className="floating-button px-8 py-4 text-lg font-semibold text-white flex items-center gap-3">
                      <Plus className="h-6 w-6" />
                      Create Your First Poll
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/register">
                      <div className="floating-button px-8 py-4 text-lg font-semibold text-white flex items-center gap-3">
                        <Zap className="h-6 w-6" />
                        Start Free Today
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </Link>
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="glass-button text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <p className="text-white/60 text-sm">
                No credit card required • Free plan available • Setup in 30
                seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
