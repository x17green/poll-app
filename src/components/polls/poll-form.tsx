'use client'

import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod' // Removed until package is available
// import { z } from 'zod' // TODO: Re-enable when zod validation is needed
import { Plus, X, Calendar, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { CreatePollData } from '@/types'

// TODO: Re-enable when zod validation is needed
// const pollFormSchema = z.object({
//   title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
//   description: z.string().max(500, 'Description must be less than 500 characters').optional(),
//   options: z
//     .array(
//       z.object({
//         text: z.string().min(1, 'Option text is required').max(100, 'Option must be less than 100 characters'),
//         order: z.number(),
//       })
//     )
//     .min(2, 'At least 2 options are required')
//     .max(10, 'Maximum 10 options allowed'),
//   allowMultiple: z.boolean().default(false),
//   expiresAt: z.date().optional(),
// })

type PollFormData = {
  title: string
  description?: string
  options: {
    text: string
    order: number
  }[]
  expiresAt?: string
  allowMultipleVotes?: boolean
  requireAuth?: boolean
}

interface PollFormProps {
  onSubmit: (data: CreatePollData) => Promise<void>
  isLoading?: boolean
  className?: string
  initialData?: Partial<CreatePollData>
}

export function PollForm({
  onSubmit,
  isLoading = false,
  className,
  initialData,
}: PollFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PollFormData>({
    // resolver: zodResolver(pollFormSchema), // Disabled until package is available
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      options: initialData?.options || [
        { text: '', order: 0 },
        { text: '', order: 1 },
      ],
      allowMultipleVotes: initialData?.allowMultipleVotes || false,
      requireAuth: initialData?.requireAuth || false,
      expiresAt: initialData?.expiresAt
        ? new Date(initialData.expiresAt).toISOString().slice(0, 16)
        : '',
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  const watchedOptions = watch('options')
  const allowMultipleVotes = watch('allowMultipleVotes')
  const requireAuth = watch('requireAuth')

  const handleFormSubmit = async (data: PollFormData) => {
    const submitData: CreatePollData = {
      title: data.title,
      description: data.description || undefined,
      options: data.options.map((option, index) => ({
        text: option.text,
        order: index,
      })),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      allowMultipleVotes: data.allowMultipleVotes || false,
      requireAuth: data.requireAuth || false,
    }

    await onSubmit(submitData)
  }

  const addOption = () => {
    if (fields.length < 10) {
      append({ text: '', order: fields.length })
    }
  }

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Poll Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Poll Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter your poll question..."
                {...register('title')}
                className={cn(errors.title && 'border-destructive')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <textarea
                id="description"
                placeholder="Add more context to your poll..."
                className={cn(
                  'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  errors.description && 'border-red-500'
                )}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Poll Options */}
        <Card>
          <CardHeader>
            <CardTitle>Poll Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <Label htmlFor={`option-${index}`}>
                    Option {index + 1}{' '}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id={`option-${index}`}
                    placeholder={`Enter option ${index + 1}...`}
                    {...register(`options.${index}.text`)}
                    className={cn(
                      errors.options?.[index]?.text && 'border-red-500'
                    )}
                  />
                  {errors.options?.[index]?.text && (
                    <p className="text-sm text-red-600">
                      {errors.options[index]?.text?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(index)}
                  disabled={fields.length <= 2}
                  className="mt-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {errors.options && (
              <p className="text-sm text-red-600">{errors.options.message}</p>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={addOption}
              disabled={fields.length >= 10}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option{' '}
              {fields.length < 10 ? `(${fields.length}/10)` : '(Max reached)'}
            </Button>
          </CardContent>
        </Card>

        {/* Poll Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Poll Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                {...register('expiresAt')}
                min={new Date().toISOString().slice(0, 16)}
              />
              <p className="text-xs text-gray-500">
                Leave empty for polls that never expire
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowMultipleVotes"
                  {...register('allowMultipleVotes')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label
                  htmlFor="allowMultipleVotes"
                  className="text-sm font-normal"
                >
                  Allow voters to select multiple options
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requireAuth"
                  {...register('requireAuth')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="requireAuth" className="text-sm font-normal">
                  Require authentication to vote
                </Label>
              </div>
            </div>

            {/* Settings Summary */}
            <div className="rounded-lg bg-gray-100 p-3 text-sm">
              <p className="font-medium mb-2">Poll Configuration:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• {watchedOptions?.length || 0} options</li>
                <li>
                  • {allowMultipleVotes ? 'Multiple' : 'Single'} choice voting
                </li>
                <li>
                  •{' '}
                  {requireAuth
                    ? 'Authentication required'
                    : 'Anonymous voting allowed'}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Creating Poll...' : 'Create Poll'}
        </Button>
      </form>
    </div>
  )
}
