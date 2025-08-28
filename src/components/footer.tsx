'use client'

import * as React from 'react'
import Link from 'next/link'
import { BarChart3, Github, Twitter, Linkedin, Mail, Heart, Zap } from '@/components/ui/icons'
import { useResponsive } from '@/hooks/use-responsive'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { isMobile, isTablet } = useResponsive()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container-responsive py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted/30 rounded w-32"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted/30 rounded w-20"></div>
                  <div className="h-3 bg-muted/20 rounded w-16"></div>
                  <div className="h-3 bg-muted/20 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-background/95 backdrop-blur-xl border-t border-border/50 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent pointer-events-none" />

      <div className={cn(
        "container-responsive relative",
        isMobile ? "py-8" : isTablet ? "py-10" : "py-12"
      )}>
        <div className={cn(
          "grid gap-8",
          isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {/* Brand */}
          <div className={cn(
            "space-y-4",
            isMobile ? "col-span-1" : isTablet ? "col-span-2 lg:col-span-1" : "sm:col-span-2 lg:col-span-1"
          )}>
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 group focus-enhanced"
            >
              <div className={cn(
                "bg-gradient-to-br from-primary via-brand-blue to-brand-accent rounded-lg shadow-glow-sm group-hover:shadow-glow transition-all duration-300",
                isMobile ? "p-1.5" : "p-2"
              )}>
                <BarChart3 className={cn(
                  "text-white group-hover:scale-110 transition-transform duration-300",
                  isMobile ? "h-5 w-5" : "h-6 w-6"
                )} />
              </div>
              <span className={cn(
                "font-bold premium-text group-hover:premium-accent-text transition-colors duration-300",
                isMobile ? "text-lg" : "text-xl"
              )}>
                Poll App
              </span>
            </Link>
            <p className={cn(
              "premium-muted leading-relaxed",
              isMobile ? "text-sm max-w-full" : "premium-body-sm max-w-xs"
            )}>
              Create engaging polls and gather insights from your audience with
              our modern, responsive polling platform.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                className="group p-2.5 rounded-xl bg-muted/30 hover:bg-muted/60 hover:scale-110 transition-all duration-300 focus-enhanced"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 premium-muted group-hover:text-blue-400 transition-colors duration-300" />
              </Link>
              <Link
                href="#"
                className="group p-2.5 rounded-xl bg-muted/30 hover:bg-muted/60 hover:scale-110 transition-all duration-300 focus-enhanced"
                aria-label="View our GitHub repository"
              >
                <Github className="h-4 w-4 premium-muted group-hover:premium-text transition-colors duration-300" />
              </Link>
              <Link
                href="#"
                className="group p-2.5 rounded-xl bg-muted/30 hover:bg-muted/60 hover:scale-110 transition-all duration-300 focus-enhanced"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-4 w-4 premium-muted group-hover:text-blue-600 transition-colors duration-300" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className={cn(
              "font-semibold premium-text",
              isMobile ? "text-sm" : "premium-caption"
            )}>
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/polls"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  My Polls
                </Link>
              </li>
              <li>
                <Link
                  href="/polls/new"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Create Poll
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className={cn(
              "font-semibold premium-text",
              isMobile ? "text-sm" : "premium-caption"
            )}>
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className={cn(
              "font-semibold premium-text",
              isMobile ? "text-sm" : "premium-caption"
            )}>
              Legal & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/api-docs"
                  className={cn(
                    "premium-muted hover:premium-accent-text transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group focus-enhanced",
                    isMobile ? "text-sm" : "premium-body-sm"
                  )}
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  API Docs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={cn(
          "pt-8 border-t border-border/50",
          isMobile ? "mt-8" : "mt-12"
        )}>
          <div className={cn(
            "mx-auto",
            isMobile ? "text-center" : "max-w-md text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between"
          )}>
            <div className={cn(isMobile ? "mb-6" : "lg:flex-1")}>
              <h3 className={cn(
                "font-semibold premium-text mb-2 flex items-center gap-2",
                isMobile ? "text-base justify-center" : "premium-heading-sm lg:justify-start"
              )}>
                <Zap className="h-5 w-5 text-primary" />
                Stay updated
              </h3>
              <p className={cn(
                "premium-muted",
                isMobile ? "text-sm" : "premium-body-sm"
              )}>
                Get the latest features and updates delivered to your inbox.
              </p>
            </div>
            <div className={cn(isMobile ? "mt-0" : "mt-6 lg:mt-0 lg:ml-8")}>
              <form className={cn(
                "flex gap-3 max-w-md mx-auto lg:mx-0",
                isMobile ? "flex-col" : "flex-col sm:flex-row"
              )}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "glass-input flex-1 min-w-0 focus-enhanced",
                    isMobile ? "text-sm" : ""
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "bg-gradient-to-r from-primary to-brand-accent hover:from-primary/90 hover:to-brand-accent/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 focus-enhanced shadow-glow-sm hover:shadow-glow",
                    isMobile ? "px-4 py-2.5 text-sm" : "px-6 py-3 text-sm"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className={cn(
            "flex items-center justify-between gap-4",
            isMobile ? "flex-col space-y-4" : "flex-col sm:flex-row"
          )}>
            <p className={cn(
              "premium-muted text-center sm:text-left flex items-center gap-2",
              isMobile ? "text-xs" : "premium-body-sm"
            )}>
              <span>© {currentYear} Poll App. All rights reserved.</span>
              <span className="hidden sm:inline">Built with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse hidden sm:inline" />
              <span className="hidden sm:inline">for better decision making.</span>
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/status"
                className={cn(
                  "premium-muted hover:premium-text transition-all duration-300 flex items-center gap-2 hover:scale-105 focus-enhanced",
                  isMobile ? "text-xs" : "premium-body-sm"
                )}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-glow-sm"></div>
                All systems operational
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
