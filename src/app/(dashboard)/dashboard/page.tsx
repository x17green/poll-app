import { redirect } from 'next/navigation'
import { getClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, BarChart3, Users, TrendingUp } from '@/components/ui/icons'

// Define types for profile and poll
interface Profile {
  display_name: string
  id: string
}

interface Poll {
  id: string
  question: string
  created_at: string
}

export default async function DashboardPage() {
  const supabase = getClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  // Fetch user's polls
  const { data: pollsData, error: pollsError } = await supabase
    .from('polls')
    .select('*')
    .eq('created_by', data.user.id)
    .order('created_at', { ascending: false })

  const polls: Poll[] | null = pollsData

  // Fetch user's profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  const profile: Profile | null = profileData

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {data.user?.user_metadata?.display_name || data.user.email}!
        </h1>
        <p className="text-muted-foreground">
          Manage your polls and view analytics from your dashboard.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{polls?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/dashboard/polls/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Poll
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/polls">View All Polls</Link>
          </Button>
        </div>
      </div>

      {/* Recent Polls */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Polls</CardTitle>
        </CardHeader>
        <CardContent>
          {polls && polls.length > 0 ? (
            <div className="space-y-4">
              {polls.slice(0, 5).map(poll => (
                <div
                  key={poll.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{poll.question}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(poll.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/polls/${poll.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven&lsquo;t created any polls yet.
              </p>
              <Button asChild>
                <Link href="/dashboard/polls/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Poll
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
