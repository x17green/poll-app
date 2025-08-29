'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useResponsive } from '@/hooks/use-responsive'
import { cn, glassStyles } from '@/lib/theme'

import {
  BarChart3,
  Users,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  Plus,
  TrendingUp,
  Sparkles,
  Rocket,
  Heart,
  Clock,
  CheckCircle,
} from '@/components/ui/icons'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isMobile, isTablet } = useResponsive()

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
      description: 'Watch votes pour in with stunning visualizations and live updates that refresh instantly.',
      gradient: 'from-blue-500 to-indigo-600',
      delay: 0,
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Smart Sharing',
      description: 'Generate QR codes and share polls instantly across all platforms with seamless integration.',
      gradient: 'from-indigo-500 to-purple-600',
      delay: 100,
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with optional authentication controls and data protection.',
      gradient: 'from-purple-500 to-pink-600',
      delay: 200,
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Create professional polls in seconds with our intuitive and powerful interface.',
      gradient: 'from-pink-500 to-rose-600',
      delay: 300,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'Mobile-optimized design that works perfectly on any device, anywhere in the world.',
      gradient: 'from-rose-500 to-orange-600',
      delay: 400,
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Smart Scheduling',
      description: 'Set expiration times, schedule releases, or keep polls open indefinitely.',
      gradient: 'from-orange-500 to-yellow-600',
      delay: 500,
    },
  ]

  const stats = [
    {
      label: 'Active Polls',
      value: '12K+',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-blue-400',
    },
    {
      label: 'Total Votes',
      value: '2.5M+',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-green-400',
    },
    {
      label: 'Happy Users',
      value: '50K+',
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-400',
    },
    {
      label: 'Countries',
      value: '195',
      icon: <Globe className="h-6 w-6" />,
      color: 'text-orange-400',
    },
  ]

  const testimonials = [
    {
      quote: 'This platform transformed how we make team decisions. The real-time results are incredible!',
      author: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechFlow',
      avatar: 'SC',
      rating: 5,
    },
    {
      quote: 'The QR code feature made our conference polling seamless. Attendees loved the experience!',
      author: 'Michael Torres',
      role: 'Event Director',
      company: 'InnovateX',
      avatar: 'MT',
      rating: 5,
    },
    {
      quote: 'Beautiful interface, powerful analytics. Everything we needed for customer feedback.',
      author: 'Emily Rodriguez',
      role: 'Marketing Lead',
      company: 'GrowthLab',
      avatar: 'ER',
      rating: 5,
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">Loading amazing polls...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        {!isMobile && (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/8 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-blue/6 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          </>
        )}
      </div>

      {/* Hero Section */}
      <section className={cn(
        "relative section-padding-responsive",
        "container-responsive text-center relative z-10"
      )}>
        <div className="max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full font-medium mb-8 animate-fade-in hover:scale-105 transition-all duration-300",
            glassStyles.all,
            isMobile ? "px-4 py-2 text-xs" : isTablet ? "px-5 py-2.5 text-xs" : "px-6 py-3 text-sm"
          )}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-sm"></div>
            <span className="premium-muted">Join 50K+ users worldwide</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>

          {/* Hero Headline */}
          <div className={cn("space-y-8 mb-12", isMobile ? "space-y-6" : "")}>
            <h1 className="heading-responsive font-bold leading-tight max-w-5xl mx-auto">
              <span className="block animate-slide-up">Create Polls</span>
              <span className="block premium-gradient-text animate-slide-up" style={{ animationDelay: '200ms' }}>
                That Captivate
              </span>
              <span className={cn(
                "block animate-slide-up premium-muted font-normal",
                isMobile ? "text-base mt-2" : "text-lg mt-4"
              )} style={{ animationDelay: '300ms' }}>
                & Drive Engagement
              </span>
            </h1>
            <p className={cn(
              "body-responsive content-width-responsive mx-auto leading-relaxed animate-slide-up",
              isMobile ? "px-4" : "px-0"
            )} style={{ animationDelay: '400ms' }}>
              Transform decision-making with our stunning, responsive polling platform.
              Real-time results, beautiful analytics, and seamless sharing across all devices.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={cn(
            "flex gap-4 justify-center items-center pt-4 animate-slide-up",
            isMobile ? "flex-col w-full" : "flex-row"
          )} style={{ animationDelay: '600ms' }}>
            {isAuthenticated ? (
              <Link href="/polls/new" className={isMobile ? "w-full" : ""}>
                <Button
                  variant="gradient"
                  size={isMobile ? "default" : "lg"}
                  className={cn("group", isMobile ? "w-full" : "")}
                >
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Your Poll
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register" className={isMobile ? "w-full" : ""}>
                <Button
                  variant="gradient"
                  size={isMobile ? "default" : "lg"}
                  className={cn("group", isMobile ? "w-full" : "")}
                >
                  <Rocket className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Start Free Today
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            )}

            <Link href="/polls" className={isMobile ? "w-full" : ""}>
              <Button
                variant="glass"
                size={isMobile ? "default" : "lg"}
                className={cn("group", isMobile ? "w-full" : "")}
              >
                <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Explore Polls
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={cn(
        "relative section-padding-responsive bg-muted/5",
        "container-responsive"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "grid gap-6",
            isMobile ? "grid-cols-2" : isTablet ? "grid-cols-2" : "grid-cols-4"
          )}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center group hover:scale-105 transition-all duration-300 card-responsive animate-fade-in hover:shadow-glow-sm",
                  glassStyles.all,
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "inline-flex items-center justify-center rounded-full mb-4 bg-current/10 shadow-glow-sm group-hover:shadow-glow transition-all duration-300",
                  stat.color,
                  isMobile ? "w-10 h-10" : "w-12 h-12"
                )}>
                  <span className={cn(stat.color, isMobile ? "text-base" : "text-lg")}>
                    <div className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", "inline-block")}>
                      {stat.icon}
                    </div>
                  </span>
                </div>
                <div className={cn(
                  "font-bold premium-text mb-2 group-hover:premium-accent-text transition-colors duration-300",
                  isMobile ? "text-xl" : "premium-heading-md"
                )}>{stat.value}</div>
                <div className={cn(
                  "premium-muted",
                  isMobile ? "text-xs" : "premium-body-sm"
                )}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative section-padding-responsive container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={cn("text-center mb-16", isMobile ? "mb-12" : "")}>
            <h2 className={cn(
              "subheading-responsive font-bold premium-text mb-6",
              isMobile ? "mb-4" : ""
            )}>
              Powerful Features for Modern Polling
            </h2>
            <p className={cn(
              "body-responsive content-width-responsive mx-auto premium-muted",
              isMobile ? "px-4" : ""
            )}>
              Everything you need to create, share, and analyze polls with professional-grade tools
              and beautiful, responsive design that works perfectly on every device.
            </p>
          </div>

          {/* Features Grid */}
          <div className={cn(
            "grid gap-6 justify-center",
            isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
          )}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className={cn(
                  "group hover:scale-105 hover:shadow-glow transition-all duration-500 animate-fade-in card-responsive",
                  glassStyles.all,
                  isMobile ? "p-6" : ""
                )}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                {/* Icon */}
                <div className={cn(
                  "inline-flex items-center justify-center rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300",
                  `bg-gradient-to-br ${feature.gradient}`,
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                )}>
                  <span className="text-white group-hover:scale-110 transition-transform duration-300">
                    <div className={cn(isMobile ? "h-6 w-6" : "h-8 w-8", "inline-block")}>
                      {feature.icon}
                    </div>
                  </span>
                </div>

                {/* Content */}
                <h3 className={cn(
                  "font-semibold premium-text mb-4 group-hover:premium-accent-text transition-colors duration-300",
                  isMobile ? "text-lg" : "premium-heading-sm"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "premium-muted group-hover:premium-muted/80 transition-colors duration-300 leading-relaxed",
                  isMobile ? "text-sm" : "premium-body"
                )}>
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="w-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-full transition-all duration-500 mt-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative section-padding-responsive bg-muted/5 border-y border-border/30">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className={cn("text-center mb-16", isMobile ? "mb-12" : "")}>
              <h2 className={cn(
                "subheading-responsive font-bold premium-text mb-6",
                isMobile ? "mb-4" : ""
              )}>
                Loved by Teams Worldwide
              </h2>
              <p className={cn(
                "body-responsive content-width-responsive mx-auto premium-muted",
                isMobile ? "px-4" : ""
              )}>
                See what our users are saying about their polling experience.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className={cn(
              "grid gap-6",
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className={cn(
                    "glass-card group hover:scale-105 transition-all duration-300 animate-fade-in card-responsive",
                    isMobile ? "p-6" : ""
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Rating */}
                  <div className={cn("flex items-center gap-1 mb-6", isMobile ? "mb-4" : "")}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className={cn(
                        "fill-yellow-400 text-yellow-400",
                        isMobile ? "h-4 w-4" : "h-5 w-5"
                      )} />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className={cn(
                    "premium-muted mb-8 italic leading-relaxed",
                    isMobile ? "text-sm mb-6" : "premium-body"
                  )}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "rounded-full bg-gradient-to-br from-primary to-brand-accent flex items-center justify-center text-white font-semibold shadow-glow-sm",
                      isMobile ? "w-10 h-10 text-sm" : "w-12 h-12"
                    )}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className={cn(
                        "font-semibold premium-text",
                        isMobile ? "text-sm" : "premium-body"
                      )}>{testimonial.author}</div>
                      <div className={cn(
                        "premium-muted",
                        isMobile ? "text-xs" : "premium-body-sm"
                      )}>
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding-responsive container-responsive">
        <div className="max-w-4xl mx-auto text-center">
          <div className={cn(
            "glass-card space-y-8 card-responsive",
            isMobile ? "p-8 space-y-6" : ""
          )}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className={cn(
                "premium-muted font-medium",
                isMobile ? "text-sm" : "text-base"
              )}>
                No credit card required
              </span>
            </div>

            <h2 className={cn(
              "subheading-responsive font-bold premium-text",
              isMobile ? "leading-tight" : ""
            )}>
              Ready to Get Started?
            </h2>

            <p className={cn(
              "premium-muted content-width-responsive mx-auto",
              isMobile ? "text-sm px-4" : "premium-body-lg"
            )}>
              Join thousands of users who are already creating amazing polls.
              Start for free and upgrade anytime.
            </p>

            <div className={cn(
              "flex gap-4 justify-center items-center pt-4",
              isMobile ? "flex-col w-full" : "flex-row"
            )}>
              {!isAuthenticated ? (
                <>
                  <Link href="/auth/register" className={isMobile ? "w-full" : ""}>
                    <Button
                      variant="gradient"
                      size={isMobile ? "default" : "lg"}
                      className={cn("group", isMobile ? "w-full" : "")}
                    >
                      <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      Create Free Account
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link href="/auth/login" className={isMobile ? "w-full" : ""}>
                    <Button
                      variant="glass"
                      size={isMobile ? "default" : "lg"}
                      className={cn(isMobile ? "w-full" : "")}
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/polls/new" className={isMobile ? "w-full" : ""}>
                  <Button
                    variant="gradient"
                    size={isMobile ? "default" : "lg"}
                    className={cn("group", isMobile ? "w-full" : "")}
                  >
                    <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create Your First Poll
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
