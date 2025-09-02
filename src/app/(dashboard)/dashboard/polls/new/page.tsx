"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, X } from "@/components/ui/icons"
import { getClient } from "@/lib/supabase/client"

export default function NewPollPage() {
  const [question, setQuestion] = React.useState("")
  const [options, setOptions] = React.useState(["", ""])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = getClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const validOptions = options.filter((option) => option.trim() !== "")
      if (validOptions.length < 2) {
        throw new Error("Please provide at least 2 options")
      }

      const { data, error } = await supabase
        .from("polls")
        .insert({
          question: question.trim(),
          options: validOptions,
          created_by: user.id,
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/dashboard/polls/${data.id}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/dashboard/polls"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to polls
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Poll</h1>
        <p className="text-muted-foreground">Create engaging polls and gather opinions from your audience.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Poll Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="What's your question?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    required
                  />
                  {options.length > 2 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeOption(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addOption} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Poll"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/polls">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
