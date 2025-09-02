'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart3, Menu, X, User, Plus, TrendingUp } from '@/components/ui/icons'
import { useResponsive } from '@/hooks/use-responsive'
import { useTheme } from '@/contexts/ThemeContext'
import { cn, glassStyles, premiumTextStyles } from '@/lib/theme'
import { useAuth } from '@/contexts/AuthContext'
import { logout } from '@/app/(auth)/actions'

export function Navigation() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isMobile, isTablet, isDesktop } = useResponsive()
  const { theme, isDark } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await logout()
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('nav')
      if (nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Close menu on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  if (!mounted) {
    return (
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto responsive-padding">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg animate-pulse"></div>
              <div className="w-20 h-6 bg-primary/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={cn("sticky top-0 z-50 backdrop-blur-lg", glassStyles.all)}>
      <div className="container-responsive">
        <div className={cn(
          "flex justify-between items-center",
          isMobile ? "h-14" : isTablet ? "h-16" : "h-18",
          "text-foreground"
        )}>
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 hover:opacity-80 transition-all duration-300 group focus-enhanced",
              isMobile ? "gap-1.5" : "gap-2"
            )}
          >
            <div className={cn(
              "bg-gradient-to-br from-primary via-brand-blue to-brand-accent rounded-lg shadow-glow-sm group-hover:shadow-glow transition-all duration-300",
              isMobile ? "p-1.5" : "p-2"
            )}>
              <BarChart3 className={cn(
                "text-white group-hover:scale-110 transition-transform duration-300",
                isMobile ? "h-5 w-5" : isTablet ? "h-5.5 w-5.5" : "h-6 w-6"
              )} />
            </div>
            <span className={cn(
              "font-bold",
              premiumTextStyles.text,
              "group-hover:" + premiumTextStyles.accent.replace("bg-gradient", "bg-gradient"),
              "transition-colors duration-300",
              isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"
            )}>
              Poll App
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
            "items-center",
            isMobile ? "hidden" : isTablet ? "hidden md:flex md:space-x-2 md:gap-1 lg:gap-2" : "hidden lg:flex lg:space-x-4 lg:gap-2 xl:gap-3"
          )}>
            <Link
              href="/"
              className="premium-muted hover:premium-text hover:bg-muted/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-enhanced"
            >
              <BarChart3 className="h-4 w-4" />
              <span className={isTablet ? "hidden xl:inline" : ""}>Home</span>
            </Link>
            <Link
              href="/polls"
              className="premium-muted hover:premium-text hover:bg-muted/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-enhanced"
            >
              <BarChart3 className="h-4 w-4" />
              <span className={isTablet ? "hidden xl:inline" : ""}>My Polls</span>
            </Link>
            <Link
              href="/polls/new"
              className="premium-muted hover:premium-text hover:bg-muted/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-enhanced"
            >
              <Plus className="h-4 w-4" />
              <span className={isTablet ? "hidden xl:inline" : ""}>Create</span>
            </Link>
            <Link
              href="/explore"
              className="premium-muted hover:premium-text hover:bg-muted/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-enhanced"
            >
              <TrendingUp className="h-4 w-4" />
              <span className={isTablet ? "hidden xl:inline" : ""}>Explore</span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className={cn(
            "items-center",
            isMobile ? "hidden" : isTablet ? "hidden md:flex md:space-x-2 md:gap-1" : "hidden lg:flex lg:space-x-3 lg:gap-2"
          )}>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "flex items-center space-x-2 px-3 py-2 text-sm",
                  premiumTextStyles.muted,
                  "bg-muted/30 rounded-lg",
                  isTablet ? "hidden lg:flex" : isDesktop ? "flex" : "hidden"
                )}>
                  <User className="h-4 w-4" />
                  <span>Welcome back, {user?.user_metadata?.display_name || user.email}!</span>
                </div>
                <Button
                  variant="outline"
                  size={isTablet ? "sm" : "default"}
                  onClick={handleSignOut}
                  className="flex items-center gap-2 focus-enhanced"
                >
                  <User className="h-4 w-4" />
                  <span className={isTablet ? "hidden xl:inline" : ""}>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size={isTablet ? "sm" : "default"}
                    className="focus-enhanced"
                    responsive
                  >
                    <span className={isTablet ? "hidden lg:inline" : ""}>Sign In</span>
                    <User className={cn("h-4 w-4", isTablet ? "lg:hidden" : "hidden")} />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="gradient"
                    size={isTablet ? "sm" : "default"}
                    className="focus-enhanced"
                    responsive
                  >
                    <span className={isTablet ? "hidden lg:inline" : ""}>Get Started</span>
                    <Plus className={cn("h-4 w-4", isTablet ? "lg:hidden" : "hidden")} />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className={cn(
            isMobile ? "flex" : isTablet ? "flex md:hidden" : "flex lg:hidden"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className={cn("p-2 focus-enhanced", theme === 'dark' ? "hover:bg-white/10" : "hover:bg-black/10")}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              responsive
            >
              <div className="relative w-6 h-6">
                <Menu className={cn(
                  "h-6 w-6 absolute transition-all duration-300",
                  isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                )} />
                <X className={cn(
                  "h-6 w-6 absolute transition-all duration-300",
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                )} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "border-t border-border/50 bg-background/98 backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden",
        isMobile ? "md:hidden" : isTablet ? "md:hidden" : "lg:hidden",
        isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        isDark ? "border-white/10" : "border-black/10"
      )}>
        <div className="px-4 py-4 space-y-2">
          {/* Navigation Links */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              premiumTextStyles.muted,
              "hover:" + premiumTextStyles.text,
              "text-sm font-medium transition-all duration-200 rounded-xl hover:bg-muted/50 focus-enhanced"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/polls"
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              premiumTextStyles.muted,
              "hover:" + premiumTextStyles.text,
              "text-sm font-medium transition-all duration-200 rounded-xl hover:bg-muted/50 focus-enhanced"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            <BarChart3 className="h-5 w-5" />
            <span>My Polls</span>
          </Link>
          <Link
            href="/polls/new"
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              premiumTextStyles.muted,
              "hover:" + premiumTextStyles.text,
              "text-sm font-medium transition-all duration-200 rounded-xl hover:bg-muted/50 focus-enhanced"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            <Plus className="h-5 w-5" />
            <span>Create Poll</span>
          </Link>
          <Link
            href="/explore"
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              premiumTextStyles.muted,
              "hover:" + premiumTextStyles.text,
              "text-sm font-medium transition-all duration-200 rounded-xl hover:bg-muted/50 focus-enhanced"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Explore</span>
          </Link>
        </div>

        {/* Mobile Auth Section */}
        <div className={cn(
          "px-4 pb-4 pt-2 border-t bg-muted/10",
          isDark ? "border-white/10" : "border-black/10"
        )}>
          {user ? (
            <div className="space-y-3">
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm",
                premiumTextStyles.muted,
                "bg-muted/40 rounded-xl"
              )}>
                <User className="h-5 w-5" />
                <span>Welcome back, {user?.user_metadata?.display_name || user.email}!</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSignOut()
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 focus-enhanced"
                responsive
                fullWidth
              >
                <User className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full focus-enhanced" responsive fullWidth>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="gradient" size="sm" className="w-full focus-enhanced" responsive fullWidth>
                  <Plus className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
