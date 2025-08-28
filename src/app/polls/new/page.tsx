'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { PollForm } from '@/components/polls/poll-form'
import { QRCodeCard } from '@/components/ui/qr-code-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { CreatePollData } from '@/types'

export default function NewPollPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [createdPoll, setCreatedPoll] = React.useState<{
    id: string
    title: string
    url: string
  } | null>(null)

  const handleCreatePoll = async (data: CreatePollData) => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      console.log('Creating poll:', data)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock poll creation
      const pollId = `poll-${Date.now()}`
      const pollUrl = `${window.location.origin}/polls/${pollId}`

      const newPoll = {
        id: pollId,
        title: data.title,
        url: pollUrl,
      }

      setCreatedPoll(newPoll)

      // In a real app, you might redirect to the poll page
      // router.push(`/polls/${pollId}`)
    } catch (error) {
      console.error('Error creating poll:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAnother = () => {
    setCreatedPoll(null)
    // Optionally reset form or refresh page
    window.location.reload()
  }

  if (createdPoll) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/polls"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to polls
            </Link>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Poll Created Successfully!
              </h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Your poll is now live and ready to receive votes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Poll Details */}
            <Card>
              <CardHeader>
                <CardTitle>Poll Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{createdPoll.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Poll ID: {createdPoll.id}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Poll URL:</p>
                  <div className="p-3 bg-muted rounded-lg">
                    <code className="text-sm text-muted-foreground break-all">
                      {createdPoll.url}
                    </code>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button
                    onClick={() => router.push(`/polls/${createdPoll.id}`)}
                    className="flex-1"
                  >
                    View Poll
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/polls/${createdPoll.id}/results`)
                    }
                    className="flex-1"
                  >
                    View Results
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleCreateAnother}
                  className="w-full mt-4"
                >
                  Create Another Poll
                </Button>
              </CardContent>
            </Card>

            {/* QR Code */}
            <QRCodeCard
              title="Share Your Poll"
              description="Let others vote by scanning this QR code"
              value={createdPoll.url}
              size={200}
              className="h-fit"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/polls"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to polls
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Create a New Poll
          </h1>
          <p className="text-muted-foreground mt-2">
            Create engaging polls and gather opinions from your audience.
          </p>
        </div>

        {/* Poll Form */}
        <PollForm onSubmit={handleCreatePoll} isLoading={isLoading} />

        {/* Tips Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Creating Great Polls</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Keep your question clear and concise</li>
              <li>• Provide balanced and comprehensive options</li>
              <li>• Consider allowing multiple choices for complex topics</li>
              <li>• Set an appropriate expiration date if needed</li>
              <li>
                • Use authentication if you need to prevent duplicate votes
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
