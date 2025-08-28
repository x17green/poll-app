'use client'

import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod' // Removed until package is available
// import { z } from 'zod' // TODO: Re-enable when zod validation is needed
import { Plus, X, Calendar, Settings, Info, Users, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResponsive } from '@/hooks/use-responsive'
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
  const { isMobile, isTablet } = useResponsive()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
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

  if (!mounted) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto', className)}>
        <div className="space-y-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6">
              <div className="h-6 bg-muted/30 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted/20 rounded w-full"></div>
                <div className="h-10 bg-muted/20 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'w-full mx-auto container-responsive',
      isMobile ? 'max-w-full' : isTablet ? 'max-w-3xl' : 'max-w-4xl',
      className
    )}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={cn(
        'space-y-6',
        isMobile ? 'space-y-4' : ''
      )}>
        {/* Basic Information */}
        <Card className="glass-card border-border/50 hover:shadow-glow-sm transition-all duration-300">
          <CardHeader className={cn(
            "border-b border-border/30 bg-muted/5",
            isMobile ? "p-4" : "p-6"
          )}>
            <CardTitle className={cn(
              "flex items-center gap-2 premium-text",
              isMobile ? "text-lg" : "text-xl"
            )}>
              <div className="p-2 bg-gradient-to-br from-primary to-brand-accent rounded-lg shadow-glow-sm">
                <Settings className={cn(
                  "text-white",
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                )} />
              </div>
              Poll Details
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(
            "space-y-4",
            isMobile ? "p-4 space-y-3" : "p-6"
          )}>
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className={cn(
                  "premium-text font-semibold flex items-center gap-2",
                  isMobile ? "text-sm" : ""
                )}
              >
                Poll Title <span className="text-destructive">*</span>
                <Info className="h-4 w-4 premium-muted" />
              </Label>
              <Input
                id="title"
                placeholder="What would you like to ask your audience?"
                {...register('title')}
                className={cn(
                  'glass-input focus-enhanced transition-all duration-200',
                  errors.title && 'border-destructive ring-destructive/20',
                  isMobile ? 'text-sm' : ''
                )}
              />
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className={cn(
                  "premium-muted font-medium",
                  isMobile ? "text-sm" : ""
                )}
              >
                Description (Optional)
              </Label>
              <textarea
                id="description"
                placeholder="Provide additional context or instructions for your poll..."
                className={cn(
                  'glass-input focus-enhanced transition-all duration-200 resize-none',
                  errors.description && 'border-destructive ring-destructive/20',
                  isMobile ? 'min-h-[60px] text-sm' : 'min-h-[80px]'
                )}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Poll Options */}
        <Card className="glass-card border-border/50 hover:shadow-glow-sm transition-all duration-300">
          <CardHeader className={cn(
            "border-b border-border/30 bg-muted/5",
            isMobile ? "p-4" : "p-6"
          )}>
            <CardTitle className={cn(
              "flex items-center gap-2 premium-text",
              isMobile ? "text-lg" : "text-xl"
            )}>
              <div className="p-2 bg-gradient-to-br from-brand-accent to-brand-blue rounded-lg shadow-glow-sm">
                <Users className={cn(
                  "text-white",
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                )} />
              </div>
              Poll Options
              <span className={cn(
                "premium-muted font-normal",
                isMobile ? "text-xs" : "text-sm"
              )}>
                ({fields.length}/10)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(
            "space-y-4",
            isMobile ? "p-4 space-y-3" : "p-6"
          )}>
            {fields.map((field, index) => (
              <div key={field.id} className={cn(
                "glass-card border border-border/30 transition-all duration-200 hover:border-border/60",
                isMobile ? "p-3" : "p-4"
              )}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-br from-primary to-brand-accent flex items-center justify-center text-white font-semibold shadow-glow-sm",
                      isMobile ? "w-6 h-6 text-xs" : "text-sm"
                    )}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor={`option-${index}`}
                      className={cn(
                        "premium-text font-medium flex items-center gap-2",
                        isMobile ? "text-sm" : ""
                      )}
                    >
                      Option {index + 1}
                      <span className="text-destructive">*</span>
                      {index < 2 && (
                        <span className="premium-muted text-xs bg-muted/50 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </Label>
                    <Input
                      id={`option-${index}`}
                      placeholder={`Enter choice ${index + 1}...`}
                      {...register(`options.${index}.text`)}
                      className={cn(
                        'glass-input focus-enhanced transition-all duration-200',
                        errors.options?.[index]?.text && 'border-destructive ring-destructive/20',
                        isMobile ? 'text-sm' : ''
                      )}
                    />
                    {errors.options?.[index]?.text && (
                      <p className="text-sm text-destructive flex items-center gap-2">
                        <X className="h-4 w-4" />
                        {errors.options[index]?.text?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size={isMobile ? "sm" : "icon"}
                    onClick={() => removeOption(index)}
                    disabled={fields.length <= 2}
                    className={cn(
                      "flex-shrink-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
                      fields.length <= 2 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <X className="h-4 w-4" />
                    {isMobile && <span className="ml-1">Remove</span>}
                  </Button>
                </div>
              </div>
            ))}

            {errors.options && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <X className="h-4 w-4" />
                {errors.options.message}
              </p>
            )}

            <Button
              type="button"
              variant="glass"
              onClick={addOption}
              disabled={fields.length >= 10}
              className={cn(
                "w-full group hover:scale-105 transition-all duration-300",
                fields.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Add Option{' '}
              {fields.length < 10 ? `(${fields.length}/10)` : '(Maximum reached)'}
            </Button>
          </CardContent>
        </Card>

        {/* Poll Settings */}
        <Card className="glass-card border-border/50 hover:shadow-glow-sm transition-all duration-300">
          <CardHeader className={cn(
            "border-b border-border/30 bg-muted/5",
            isMobile ? "p-4" : "p-6"
          )}>
            <CardTitle className={cn(
              "flex items-center gap-2 premium-text",
              isMobile ? "text-lg" : "text-xl"
            )}>
              <div className="p-2 bg-gradient-to-br from-brand-blue to-primary rounded-lg shadow-glow-sm">
                <Settings className={cn(
                  "text-white",
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                )} />
              </div>
              Poll Settings
            </CardTitle>
          </CardHeader>
          <CardContent className={cn(
            "space-y-4",
            isMobile ? "p-4 space-y-3" : "p-6"
          )}>
            <div className="space-y-2">
              <Label
                htmlFor="expiresAt"
                className={cn(
                  "premium-text font-medium flex items-center gap-2",
                  isMobile ? "text-sm" : ""
                )}
              >
                <Calendar className="h-4 w-4" />
                Expiration Date (Optional)
              </Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                {...register('expiresAt')}
                min={new Date().toISOString().slice(0, 16)}
                className={cn(
                  'glass-input focus-enhanced transition-all duration-200',
                  isMobile ? 'text-sm' : ''
                )}
              />
              <p className={cn(
                "premium-muted flex items-center gap-2",
                isMobile ? "text-xs" : "text-sm"
              )}>
                <Info className="h-3 w-3" />
                Leave empty for polls that never expire
              </p>
            </div>

            <div className={cn("space-y-4", isMobile ? "space-y-3" : "")}>
              <div className="glass-card border border-border/30 p-4 hover:border-border/60 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="allowMultipleVotes"
                    {...register('allowMultipleVotes')}
                    className="mt-0.5 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20 focus:ring-offset-background transition-all duration-200"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="allowMultipleVotes"
                      className={cn(
                        "premium-text font-medium cursor-pointer",
                        isMobile ? "text-sm" : ""
                      )}
                    >
                      Multiple Choice Selection
                    </Label>
                    <p className={cn(
                      "premium-muted mt-1",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      Allow voters to select multiple options in this poll
                    </p>
                  </div>
                  <Users className="h-5 w-5 premium-muted" />
                </div>
              </div>

              <div className="glass-card border border-border/30 p-4 hover:border-border/60 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="requireAuth"
                    {...register('requireAuth')}
                    className="mt-0.5 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20 focus:ring-offset-background transition-all duration-200"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="requireAuth"
                      className={cn(
                        "premium-text font-medium cursor-pointer",
                        isMobile ? "text-sm" : ""
                      )}
                    >
                      Authentication Required
                    </Label>
                    <p className={cn(
                      "premium-muted mt-1",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      Require users to sign in before voting
                    </p>
                  </div>
                  <Lock className="h-5 w-5 premium-muted" />
                </div>
              </div>
            </div>

            {/* Settings Summary */}
            <div className="glass-card border border-primary/20 bg-primary/5 p-4">
              <p className={cn(
                "font-semibold mb-3 premium-text flex items-center gap-2",
                isMobile ? "text-sm" : ""
              )}>
                <Settings className="h-4 w-4 text-primary" />
                Poll Configuration Summary:
              </p>
              <ul className={cn(
                "space-y-2 premium-muted",
                isMobile ? "text-xs space-y-1" : "text-sm"
              )}>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {watchedOptions?.length || 0} option{(watchedOptions?.length || 0) !== 1 ? 's' : ''}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  {allowMultipleVotes ? 'Multiple' : 'Single'} choice voting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                  {requireAuth
                    ? 'Authentication required'
                    : 'Anonymous voting allowed'}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="sticky bottom-4 z-10">
          <Button
            type="submit"
            variant="gradient"
            size={isMobile ? "default" : "lg"}
            className={cn(
              "w-full group hover:scale-105 transition-all duration-300 shadow-glow-sm hover:shadow-glow",
              !isValid || isLoading ? "opacity-70 cursor-not-allowed" : ""
            )}
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Creating Poll...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create Amazing Poll
                <Calendar className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
