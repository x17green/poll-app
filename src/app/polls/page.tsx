'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  MoreVertical,
  Eye,
  BarChart3,
  Share2,
  Trash2,
  Sparkles,
} from '@/components/ui/icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResponsive } from '@/hooks/use-responsive'
import { cn, formatDate, calculatePercentage } from '@/lib/utils'
import type { Poll, PollStatus } from '@/types'

// Mock data - replace with actual API calls
const mockPolls: (Poll & { voteCount: number; status: PollStatus })[] = [
  {
    id: '1',
    title: 'What is your favorite programming language?',
    description:
      'Help us understand the community preferences for programming languages in 2024.',
    createdBy: 'user-1',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    expiresAt: new Date('2024-02-15T10:00:00Z'),
    isActive: true,
    allowMultipleVotes: false,
    requireAuth: false,
    options: [
      {
        id: 'opt-1',
        pollId: '1',
        text: 'JavaScript',
        order: 0,
        votes: [],
        voteCount: 45,
      },
      {
        id: 'opt-2',
        pollId: '1',
        text: 'Python',
        order: 1,
        votes: [],
        voteCount: 38,
      },
      {
        id: 'opt-3',
        pollId: '1',
        text: 'TypeScript',
        order: 2,
        votes: [],
        voteCount: 32,
      },
      {
        id: 'opt-4',
        pollId: '1',
        text: 'Go',
        order: 3,
        votes: [],
        voteCount: 15,
      },
    ],
    totalVotes: 130,
    slug: 'favorite-programming-language',
    voteCount: 130,
    status: 'active' as PollStatus,
  },
  {
    id: '2',
    title: 'Best time for team meetings?',
    description:
      "Let's find the optimal time slot that works for everyone on the team.",
    createdBy: 'user-1',
    createdAt: new Date('2024-01-10T14:30:00Z'),
    updatedAt: new Date('2024-01-10T14:30:00Z'),
    expiresAt: new Date('2024-01-20T14:30:00Z'),
    isActive: true,
    allowMultipleVotes: true,
    requireAuth: true,
    options: [
      {
        id: 'opt-5',
        pollId: '2',
        text: '9:00 AM',
        order: 0,
        votes: [],
        voteCount: 12,
      },
      {
        id: 'opt-6',
        pollId: '2',
        text: '2:00 PM',
        order: 1,
        votes: [],
        voteCount: 18,
      },
      {
        id: 'opt-7',
        pollId: '2',
        text: '4:00 PM',
        order: 2,
        votes: [],
        voteCount: 22,
      },
    ],
    totalVotes: 52,
    slug: 'team-meeting-time',
    voteCount: 52,
    status: 'active' as PollStatus,
  },
  {
    id: '3',
    title: 'Company holiday destination',
    description: undefined,
    createdBy: 'user-2',
    createdAt: new Date('2024-01-05T09:15:00Z'),
    updatedAt: new Date('2024-01-05T09:15:00Z'),
    expiresAt: new Date('2024-01-10T09:15:00Z'),
    isActive: false,
    allowMultipleVotes: false,
    requireAuth: true,
    options: [
      {
        id: 'opt-8',
        pollId: '3',
        text: 'Beach Resort',
        order: 0,
        votes: [],
        voteCount: 35,
      },
      {
        id: 'opt-9',
        pollId: '3',
        text: 'Mountain Cabin',
        order: 1,
        votes: [],
        voteCount: 28,
      },
      {
        id: 'opt-10',
        pollId: '3',
        text: 'City Tour',
        order: 2,
        votes: [],
        voteCount: 19,
      },
    ],
    totalVotes: 82,
    slug: 'company-holiday-destination',
    voteCount: 82,
    status: 'expired' as PollStatus,
  },
]

const statusColors = {
  active: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
  expired: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
  draft: 'bg-muted text-muted-foreground border-border',
  archived: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
}

interface PollCardProps {
  poll: Poll & { voteCount: number; status: PollStatus }
  onView: (id: string) => void
  onViewResults: (id: string) => void
  onShare: (id: string) => void
  onDelete: (id: string) => void
  className?: string
  style?: React.CSSProperties
}

function PollCard({
  poll,
  onView,
  onViewResults,
  onShare,
  onDelete,
  className,
  style,
}: PollCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const { isMobile } = useResponsive()
  const topOption = poll.options.reduce(
    (max, option) => (option.voteCount > max.voteCount ? option : max),
    poll.options[0]
  )

  const topOptionPercentage = calculatePercentage(
    topOption.voteCount,
    poll.totalVotes
  )

  return (
    <Card
      variant="glass"
      className={cn(
        "hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-border/50 card-responsive",
        className
      )}
      style={style}
    >
      <CardHeader className={cn(
        "border-b border-border/30 bg-muted/5",
        isMobile ? "p-4 pb-3" : "pb-3"
      )}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1 min-w-0">
            <div className={cn(
              "flex items-start gap-2",
              isMobile ? "flex-col space-y-2" : "flex-row items-center"
            )}>
              <CardTitle
                className={cn(
                  "leading-tight cursor-pointer hover:premium-accent-text transition-colors duration-200 premium-text font-semibold flex-1",
                  isMobile ? "text-base line-clamp-2" : "premium-heading-sm"
                )}
                onClick={() => onView(poll.id)}
              >
                {poll.title}
              </CardTitle>
              <span
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-full border shadow-sm whitespace-nowrap',
                  statusColors[poll.status],
                  isMobile ? "self-start" : ""
                )}
              >
                {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
              </span>
            </div>
            {poll.description && (
              <p className={cn(
                "premium-muted line-clamp-2 leading-relaxed",
                isMobile ? "text-xs" : "premium-body-sm"
              )}>
                {poll.description}
              </p>
            )}

            {/* Quick Stats for Mobile */}
            {isMobile && (
              <div className="flex items-center gap-4 text-xs premium-muted">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{poll.totalVotes} votes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(poll.createdAt)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className={cn(
                "hover:bg-muted/50 hover:scale-105 transition-all duration-200",
                isMobile ? "p-1 h-7 w-7" : "p-1 h-8 w-8"
              )}
            >
              <MoreVertical className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
            </Button>

            {showMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />

                {/* Menu */}
                <div className={cn(
                  "absolute right-0 top-full mt-1 glass-card border border-border/50 shadow-xl z-20 animate-slide-down",
                  isMobile ? "w-44 p-1" : "w-48 p-1"
                )}>
                  <button
                    onClick={() => {
                      onView(poll.id)
                      setShowMenu(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 hover:bg-muted/50 rounded-md transition-all duration-200 premium-text font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}
                  >
                    <Eye className="h-4 w-4 text-blue-500" />
                    View Poll
                  </button>
                  <button
                    onClick={() => {
                      onViewResults(poll.id)
                      setShowMenu(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 hover:bg-muted/50 rounded-md transition-all duration-200 premium-text font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}
                  >
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    View Results
                  </button>
                  <button
                    onClick={() => {
                      onShare(poll.id)
                      setShowMenu(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 hover:bg-muted/50 rounded-md transition-all duration-200 premium-text font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}
                  >
                    <Share2 className="h-4 w-4 text-purple-500" />
                    Share Poll
                  </button>
                  <hr className="my-1 border-border/30" />
                  <button
                    onClick={() => {
                      onDelete(poll.id)
                      setShowMenu(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-all duration-200 font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Poll
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(
        "pt-0",
        isMobile ? "p-4 pt-0" : ""
      )}>
        <div className={cn("space-y-4", isMobile ? "space-y-3" : "")}>
          {/* Stats - Hidden on mobile since shown in header */}
          {!isMobile && (
            <div className="flex items-center justify-between premium-body-sm premium-muted">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{poll.totalVotes} votes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(poll.createdAt)}</span>
                </div>
              </div>
              {poll.expiresAt && (
                <div className="flex items-center gap-1 text-orange-500">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {formatDate(poll.expiresAt)}</span>
                </div>
              )}
            </div>
          )}

          {/* Leading option preview */}
          {poll.totalVotes > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "font-medium premium-text truncate",
                  isMobile ? "text-sm" : "premium-body-sm"
                )}>
                  Leading: {topOption.text}
                </span>
                <span className={cn(
                  "premium-muted font-semibold",
                  isMobile ? "text-sm" : "premium-body-sm"
                )}>
                  {topOptionPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-primary via-brand-accent to-primary/90 h-2 rounded-full transition-all duration-700 shadow-glow-sm"
                  style={{ width: `${topOptionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className={cn(
            "flex gap-2",
            isMobile ? "flex-col" : ""
          )}>
            <Button
              variant="glass"
              size={isMobile ? "sm" : "sm"}
              onClick={() => onView(poll.id)}
              className={cn(
                "group hover:scale-105 transition-all duration-200",
                isMobile ? "w-full" : "flex-1"
              )}
            >
              <Eye className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-200" />
              View
            </Button>
            <Button
              variant="glass"
              size={isMobile ? "sm" : "sm"}
              onClick={() => onViewResults(poll.id)}
              className={cn(
                "group hover:scale-105 transition-all duration-200",
                isMobile ? "w-full" : "flex-1"
              )}
            >
              <TrendingUp className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-200" />
              Results
            </Button>
            {!isMobile && (
              <Button
                variant="glass"
                size="sm"
                onClick={() => onShare(poll.id)}
                className="group hover:scale-105 transition-all duration-200 px-3"
              >
                <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            )}
          </div>

          {/* Mobile expiry info */}
          {isMobile && poll.expiresAt && (
            <div className="flex items-center gap-2 text-xs premium-muted bg-muted/20 px-3 py-2 rounded-lg">
              <Calendar className="h-3 w-3 text-orange-500" />
              <span>Expires: {formatDate(poll.expiresAt)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function PollsPage() {
  const [polls] = React.useState(mockPolls)
  const [filteredPolls, setFilteredPolls] = React.useState(mockPolls)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<PollStatus | 'all'>(
    'all'
  )
  const [showFilters, setShowFilters] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { isMobile, isTablet } = useResponsive()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Filter polls based on search and status
  React.useEffect(() => {
    let filtered = polls

    if (searchQuery) {
      filtered = filtered.filter(
        poll =>
          poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poll.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(poll => poll.status === statusFilter)
    }

    setFilteredPolls(filtered)
  }, [polls, searchQuery, statusFilter])

  const handleView = (id: string) => {
    window.open(`/polls/${id}`, '_blank')
  }

  const handleViewResults = (id: string) => {
    window.open(`/polls/${id}/results`, '_blank')
  }

  const handleShare = async (id: string) => {
    const poll = polls.find(p => p.id === id)
    if (!poll) return

    const url = `${window.location.origin}/polls/${id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: poll.title,
          text: poll.description || 'Check out this poll',
          url: url,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(url)
        // You could show a toast notification here
        console.log('URL copied to clipboard')
      } catch (err) {
        console.log('Error copying to clipboard:', err)
      }
    }
  }

  const handleDelete = (id: string) => {
    // In a real app, you'd show a confirmation dialog and make an API call
    if (confirm('Are you sure you want to delete this poll?')) {
      console.log('Delete poll:', id)
      // TODO: Implement delete functionality
    }
  }

  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0)
  const activePolls = polls.filter(poll => poll.status === 'active').length

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto"></div>
          <p className="premium-body-sm premium-muted">Loading your polls...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground section-padding-responsive">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        {!isMobile && (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/8 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-brand-blue/6 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          </>
        )}
      </div>

      <div className="container-responsive relative z-10">
        {/* Header */}
        <div className={cn("mb-8", isMobile ? "mb-6" : "")}>
          <div className={cn(
            "flex gap-4 mb-6",
            isMobile ? "flex-col" : "flex-col sm:flex-row sm:justify-between sm:items-center"
          )}>
            <div className={cn(isMobile ? "text-center" : "")}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-primary to-brand-accent rounded-lg shadow-glow-sm">
                  <BarChart3 className={cn(
                    "text-white",
                    isMobile ? "h-5 w-5" : "h-6 w-6"
                  )} />
                </div>
                <h1 className={cn(
                  "font-bold premium-text",
                  isMobile ? "text-2xl" : "premium-heading-lg"
                )}>My Polls</h1>
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className={cn(
                "premium-muted leading-relaxed",
                isMobile ? "text-sm" : "premium-body"
              )}>
                Manage and track your polls, view results, and create new ones.
              </p>
            </div>
            <Link href="/polls/new" className={cn(isMobile ? "w-full" : "w-full sm:w-auto")}>
              <Button
                variant="gradient"
                size={isMobile ? "default" : "lg"}
                className={cn(
                  "group hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow",
                  isMobile ? "w-full" : "w-full sm:w-auto"
                )}
              >
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create New Poll
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats Cards */}
          <div className={cn(
            "grid gap-4 mb-6",
            isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
          )}>
            <div className="glass-card card-responsive card-glow hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "premium-muted font-medium",
                    isMobile ? "text-xs" : "premium-body-sm"
                  )}>
                    Total Polls
                  </p>
                  <p className={cn(
                    "premium-text font-bold",
                    isMobile ? "text-xl" : "premium-heading-md"
                  )}>{polls.length}</p>
                </div>
                <div className={cn(
                  "bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl shadow-glow-sm",
                  isMobile ? "p-2" : "p-3"
                )}>
                  <BarChart3 className={cn(
                    "text-blue-500 dark:text-blue-400",
                    isMobile ? "h-5 w-5" : "h-6 w-6"
                  )} />
                </div>
              </div>
            </div>

            <div className="glass-card card-responsive card-glow hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "premium-muted font-medium",
                    isMobile ? "text-xs" : "premium-body-sm"
                  )}>
                    Total Votes
                  </p>
                  <p className={cn(
                    "premium-text font-bold",
                    isMobile ? "text-xl" : "premium-heading-md"
                  )}>{totalVotes.toLocaleString()}</p>
                </div>
                <div className={cn(
                  "bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl shadow-glow-sm",
                  isMobile ? "p-2" : "p-3"
                )}>
                  <Users className={cn(
                    "text-green-500 dark:text-green-400",
                    isMobile ? "h-5 w-5" : "h-6 w-6"
                  )} />
                </div>
              </div>
            </div>

            <div className="glass-card card-responsive card-glow hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "premium-muted font-medium",
                    isMobile ? "text-xs" : "premium-body-sm"
                  )}>
                    Active Polls
                  </p>
                  <p className={cn(
                    "premium-text font-bold",
                    isMobile ? "text-xl" : "premium-heading-md"
                  )}>{activePolls}</p>
                </div>
                <div className={cn(
                  "bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl shadow-glow-sm",
                  isMobile ? "p-2" : "p-3"
                )}>
                  <TrendingUp className={cn(
                    "text-orange-500 dark:text-orange-400",
                    isMobile ? "h-5 w-5" : "h-6 w-6"
                  )} />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className={cn(
            "flex gap-4 mb-6",
            isMobile ? "flex-col" : "flex-col sm:flex-row"
          )}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 premium-muted" />
              <Input
                placeholder="Search polls by title or description..."
                value={searchQuery}
                variant="glass"
                inputSize={isMobile ? "sm" : "md"}
                className="pl-10 focus-enhanced"
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "glass"}
                size={isMobile ? "sm" : "sm"}
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "whitespace-nowrap hover:scale-105 transition-all duration-200",
                  isMobile ? "flex-1" : ""
                )}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters && <span className="ml-1">✓</span>}
              </Button>
            </div>
          </div>

          {/* Enhanced Filter Options */}
          {showFilters && (
            <Card variant="glass" className="mb-6 animate-slide-down border-border/50 hover:shadow-glow-sm transition-all duration-300">
              <CardContent className={cn(
                isMobile ? "p-4" : "p-6"
              )}>
                <div className="space-y-4">
                  <div>
                    <label className={cn(
                      "font-semibold mb-3 premium-text flex items-center gap-2",
                      isMobile ? "text-sm" : "premium-body-sm"
                    )}>
                      <Filter className="h-4 w-4" />
                      Filter by Status
                    </label>
                    <div className={cn(
                      "flex gap-2",
                      isMobile ? "flex-col" : "flex-wrap"
                    )}>
                      {['all', 'active', 'expired', 'draft', 'archived'].map(
                        status => (
                          <Button
                            key={status}
                            variant={
                              statusFilter === status ? 'gradient' : 'glass'
                            }
                            size={isMobile ? "sm" : "sm"}
                            onClick={() =>
                              setStatusFilter(status as PollStatus | 'all')
                            }
                            className={cn(
                              "hover:scale-105 transition-all duration-200",
                              isMobile ? "w-full" : "flex-1"
                            )}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            {statusFilter === status && <span className="ml-2">✓</span>}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Polls Grid */}
        {filteredPolls.length > 0 ? (
          <div className={cn(
            "grid gap-6 stagger-fade-in",
            isMobile ? "grid-cols-1" : isTablet ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          )}>
            {filteredPolls.map((poll, index) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onView={handleView}
                onViewResults={handleViewResults}
                onShare={handleShare}
                onDelete={handleDelete}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <Card variant="glass" className="border-border/50 hover:shadow-glow-sm transition-all duration-300">
            <CardContent className={cn(
              "flex flex-col items-center justify-center text-center",
              isMobile ? "py-12 px-4" : "py-16 px-8"
            )}>
              <div className={cn(
                "space-y-4",
                isMobile ? "max-w-sm space-y-3" : "max-w-md space-y-4"
              )}>
                <div className={cn(
                  "bg-gradient-to-br from-primary/20 to-brand-accent/20 rounded-2xl w-fit mx-auto shadow-glow-sm",
                  isMobile ? "p-3" : "p-4"
                )}>
                  <BarChart3 className={cn(
                    "text-primary mx-auto",
                    isMobile ? "h-8 w-8" : "h-12 w-12"
                  )} />
                </div>
                <div className="space-y-2">
                  <h3 className={cn(
                    "font-bold premium-text",
                    isMobile ? "text-lg" : "premium-heading-md"
                  )}>
                    {searchQuery || statusFilter !== 'all'
                      ? 'No polls match your criteria'
                      : 'No polls yet'}
                  </h3>
                  <p className={cn(
                    "premium-muted leading-relaxed",
                    isMobile ? "text-sm" : "premium-body"
                  )}>
                    {searchQuery || statusFilter !== 'all'
                      ? "Try adjusting your search or filters to find what you're looking for."
                      : 'Create your first poll to get started and begin collecting responses from your audience.'}
                  </p>
                </div>
                {!searchQuery && statusFilter === 'all' && (
                  <Link href="/polls/new" className={cn(isMobile ? "w-full" : "")}>
                    <Button
                      variant="gradient"
                      size={isMobile ? "default" : "lg"}
                      className={cn(
                        "mt-6 group hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow",
                        isMobile ? "w-full" : ""
                      )}
                    >
                      <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Create Your First Poll
                      <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
