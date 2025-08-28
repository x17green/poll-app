'use client'

import * as React from 'react'
import { Copy, Download, Share2, ExternalLink } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QRCode } from '@/components/ui/qr-code'
import { cn } from '@/lib/utils'

interface QRCodeCardProps {
  title?: string
  description?: string
  value: string
  size?: number
  level?: 'L' | 'M' | 'Q' | 'H'
  showActions?: boolean
  showUrl?: boolean
  className?: string
  onShare?: () => void
  onDownload?: () => void
}

export function QRCodeCard({
  title = 'Share this Poll',
  description,
  value,
  size = 200,
  level = 'M',
  showActions = true,
  showUrl = true,
  className,
  onShare,
  onDownload,
}: QRCodeCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleDownloadQR = () => {
    if (onDownload) {
      onDownload()
      return
    }

    // Create a canvas to generate the QR code image for download
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // This is a simplified download - in a real implementation,
    // you'd want to regenerate the QR code on canvas
    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`

    // For now, we'll just trigger the custom onDownload if provided
    console.log('Download QR code for:', value)
  }

  const handleShare = async () => {
    if (onShare) {
      onShare()
      return
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || 'Check out this poll',
          url: value,
        })
      } catch (err) {
        console.error('Error sharing:', err)
        // Fallback to copying URL
        handleCopyUrl()
      }
    } else {
      // Fallback to copying URL
      handleCopyUrl()
    }
  }

  const handleOpenUrl = () => {
    window.open(value, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className={cn('w-fit mx-auto', className)}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* QR Code */}
        <div className="flex justify-center">
          <QRCode
            value={value}
            size={size}
            level={level}
            className="border rounded-lg p-4 bg-white"
          />
        </div>

        {/* URL Display */}
        {showUrl && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">Scan or visit:</p>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <code className="flex-1 text-sm text-muted-foreground truncate">
                {value}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenUrl}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy URL'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadQR}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Scan with your phone camera or QR code reader
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
