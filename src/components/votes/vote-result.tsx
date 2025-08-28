'use client'

import * as React from 'react'
// Chart components removed - can be added back when recharts is available
import {
  TrendingUp,
  Users,
  Clock,
  Share2,
  Download,
  BarChart3,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Poll, PollStats } from '@/types'

const CHART_COLORS = [
  '#3B82F6', // blue-500
  '#EF4444', // red-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
  '#F97316', // orange-500
  '#6366F1', // indigo-500
]

interface VoteResultProps {
  poll: Poll
  stats: PollStats
  showChart?: boolean
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
  onShare?: () => void
  onExport?: () => void
}

export function VoteResult({
  poll,
  stats,
  showChart = true,
  variant = 'default',
  className,
  onShare,
  onExport,
}: VoteResultProps) {
  // TODO: Re-enable when charts are implemented
  // const chartData: ChartData[] = stats.optionStats.map((option, index) => ({
  //   name: option.text,
  //   value: option.votes,
  //   percentage: option.percentage,
  //   color: CHART_COLORS[index % CHART_COLORS.length],
  // }))

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const topOption = stats.optionStats.reduce(
    (max, option) => (option.votes > max.votes ? option : max),
    stats.optionStats[0]
  )

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
  const hasVotes = stats.totalVotes > 0

  if (variant === 'compact') {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{poll.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              {stats.totalVotes} votes
            </div>
          </div>
          {isExpired && (
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <Clock className="h-3 w-3 mr-1" />
              Expired
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.optionStats.map(option => (
              <div key={option.optionId} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-gray-600">
                    {option.votes} ({option.percentage}%)
                  </span>
                </div>
                <Progress value={option.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{poll.title}</CardTitle>
              {poll.description && (
                <p className="text-gray-600">{poll.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {stats.totalVotes} total votes
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Created {formatDate(poll.createdAt)}
                </div>
                {isExpired && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Expired
                  </div>
                )}
                {!poll.isActive && !isExpired && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Inactive
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {onShare && (
                <Button variant="outline" size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Results Overview */}
      {hasVotes ? (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Votes
                </CardTitle>
                <Users className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVotes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leading Option
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {topOption?.percentage}%
                </div>
                <p className="text-xs text-gray-600 mt-1">{topOption?.text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{poll.options.length}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {poll.allowMultipleVotes
                    ? 'Multiple choice'
                    : 'Single choice'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Bars */}
            <Card>
              <CardHeader>
                <CardTitle>Results Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.optionStats
                    .sort((a, b) => b.votes - a.votes)
                    .map(option => (
                      <div key={option.optionId} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  CHART_COLORS[
                                    stats.optionStats.findIndex(
                                      o => o.optionId === option.optionId
                                    ) % CHART_COLORS.length
                                  ],
                              }}
                            />
                            <span className="font-medium text-sm">
                              {option.text}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {option.votes} votes ({option.percentage}%)
                          </div>
                        </div>
                        <Progress value={option.percentage} className="h-3" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Chart Placeholder */}
            {showChart && (
              <Card>
                <CardHeader>
                  <CardTitle>Visual Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">
                        Chart visualization coming soon
                      </p>
                      <p className="text-gray-500 text-xs">
                        Install recharts package for charts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      ) : (
        /* No Votes State */
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-semibold">No votes yet</h3>
              <p className="text-gray-600">
                Be the first to vote on this poll!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
