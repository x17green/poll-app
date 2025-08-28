export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Poll {
  id: string
  title: string
  description?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  isActive: boolean
  allowMultipleVotes: boolean
  requireAuth: boolean
  options: PollOption[]
  totalVotes: number
  slug: string
}

export interface PollOption {
  id: string
  pollId: string
  text: string
  order: number
  votes: Vote[]
  voteCount: number
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId?: string
  voterInfo?: VoterInfo
  createdAt: Date
  ipAddress?: string
}

export interface VoterInfo {
  name?: string
  email?: string
}

export interface PollStats {
  totalVotes: number
  optionStats: Array<{
    optionId: string
    text: string
    votes: number
    percentage: number
  }>
  votingHistory: Array<{
    date: string
    votes: number
  }>
}

export interface CreatePollData {
  title: string
  description?: string
  options: Array<{
    text: string
    order: number
  }>
  expiresAt?: Date
  allowMultipleVotes: boolean
  requireAuth: boolean
}

export interface VoteData {
  pollId: string
  optionIds: string[]
  voterInfo?: VoterInfo
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface QRCodeProps {
  value: string
  size?: number
  level?: 'L' | 'M' | 'Q' | 'H'
}

export interface ChartData {
  name: string
  value: number
  percentage: number
  color: string
}

export type PollStatus = 'active' | 'expired' | 'draft' | 'archived'
export type VoteType = 'single' | 'multiple'
export type UserRole = 'user' | 'admin' | 'moderator'

export interface FilterOptions {
  status?: PollStatus
  createdBy?: string
  dateRange?: {
    start: Date
    end: Date
  }
  searchQuery?: string
}

export interface SortOptions {
  field: 'createdAt' | 'updatedAt' | 'title' | 'totalVotes'
  direction: 'asc' | 'desc'
}
