import { redirect } from "next/navigation"
import { createServer } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BarChart3, Eye } from "@/components/ui/icons"

export default async function PollsPage() {
  const supabase = await createServer()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  // Fetch user's polls with vote counts
  const { data: polls } = await supabase
    .from("polls")
    .select(`
      *,
      votes(count)
    `)
    .eq("created_by", data.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Polls</h1>
          <p className="text-muted-foreground">Manage and view analytics for all your polls.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/polls/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </Link>
        </Button>
      </div>

      {polls && polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Card key={poll.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{poll.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Options: {poll.options?.length || 0}</span>
                    <span>Votes: {poll.votes?.length || 0}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created {new Date(poll.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/dashboard/polls/${poll.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/dashboard/polls/${poll.id}/results`}>
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Results
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No polls yet</h3>
            <p className="text-muted-foreground mb-6">Create your first poll to start collecting responses.</p>
            <Button asChild>
              <Link href="/dashboard/polls/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Poll
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
