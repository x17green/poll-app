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
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  active: 'bg-green-100 text-green-800 border-green-200',
  expired: 'bg-red-100 text-red-800 border-red-200',
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  archived: 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

interface PollCardProps {
  poll: Poll & { voteCount: number; status: PollStatus }
  onView: (id: string) => void
  onViewResults: (id: string) => void
  onShare: (id: string) => void
  onDelete: (id: string) => void
}

function PollCard({
  poll,
  onView,
  onViewResults,
  onShare,
  onDelete,
}: PollCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const topOption = poll.options.reduce(
    (max, option) => (option.voteCount > max.voteCount ? option : max),
    poll.options[0]
  )

  const topOptionPercentage = calculatePercentage(
    topOption.voteCount,
    poll.totalVotes
  )

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle
                className="text-lg leading-tight cursor-pointer hover:text-primary"
                onClick={() => onView(poll.id)}
              >
                {poll.title}
              </CardTitle>
              <span
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full border',
                  statusColors[poll.status]
                )}
              >
                {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
              </span>
            </div>
            {poll.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {poll.description}
              </p>
            )}
          </div>
          <div className="relative ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white rounded-md shadow-lg border py-1 w-32 z-10">
                <button
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    onView(poll.id)
                    setShowMenu(false)
                  }}
                >
                  <Eye className="h-3 w-3" />
                  View
                </button>
                <button
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    onViewResults(poll.id)
                    setShowMenu(false)
                  }}
                >
                  <BarChart3 className="h-3 w-3" />
                  Results
                </button>
                <button
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    onShare(poll.id)
                    setShowMenu(false)
                  }}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
                <button
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  onClick={() => {
                    onDelete(poll.id)
                    setShowMenu(false)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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
              <div className="flex items-center gap-1">
                <span>Expires: {formatDate(poll.expiresAt)}</span>
              </div>
            )}
          </div>

          {/* Leading option preview */}
          {poll.totalVotes > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Leading: {topOption.text}</span>
                <span className="text-muted-foreground">
                  {topOptionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${topOptionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(poll.id)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewResults(poll.id)}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Results
            </Button>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Polls</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track your polls, view results, and create new ones.
              </p>
            </div>
            <Link href="/polls/new">
              <Button size="lg" className="shadow-sm">
                <Plus className="h-5 w-5 mr-2" />
                Create Poll
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Polls
                    </p>
                    <p className="text-2xl font-bold">{polls.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Votes
                    </p>
                    <p className="text-2xl font-bold">{totalVotes}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Active Polls
                    </p>
                    <p className="text-2xl font-bold">{activePolls}</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search polls..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="whitespace-nowrap"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'active', 'expired', 'draft', 'archived'].map(
                        status => (
                          <Button
                            key={status}
                            variant={
                              statusFilter === status ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                              setStatusFilter(status as PollStatus | 'all')
                            }
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
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

        {/* Polls Grid */}
        {filteredPolls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPolls.map(poll => (
              <PollCard
                key={poll.id}
                poll={poll}
                onView={handleView}
                onViewResults={handleViewResults}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No polls match your criteria'
                    : 'No polls yet'}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {searchQuery || statusFilter !== 'all'
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : 'Create your first poll to get started and begin collecting responses from your audience.'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Link href="/polls/new">
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Poll
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
