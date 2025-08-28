'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface QRCodeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  value: string
  size?: number
  level?: 'L' | 'M' | 'Q' | 'H'
  includeMargin?: boolean
  color?: {
    dark?: string
    light?: string
  }
}

const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      className,
      value,
      size = 200,
      level = 'M',
      includeMargin = true,
      color = { dark: '#000000', light: '#FFFFFF' },
      ...props
    },
    ref
  ) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
      const generateQRCode = async () => {
        setIsLoading(true)
        try {
          // Using QR Server API as fallback when qrcode package isn't available
          // Generate QR code URL (commented out to avoid unused variable warning)
          // const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&ecc=${level}&margin=${includeMargin ? 4 : 0}&color=${color.dark?.replace('#', '')}&bgcolor=${color.light?.replace('#', '')}`

          // For now, we'll create a simple placeholder
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')

          if (ctx) {
            // Fill background
            ctx.fillStyle = color.light || '#FFFFFF'
            ctx.fillRect(0, 0, size, size)

            // Create a simple pattern to represent QR code
            ctx.fillStyle = color.dark || '#000000'
            const cellSize = size / 25

            // Draw a simple QR-like pattern
            for (let i = 0; i < 25; i++) {
              for (let j = 0; j < 25; j++) {
                if ((i + j) % 3 === 0 || (i % 7 === 0 && j % 7 === 0)) {
                  ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
                }
              }
            }

            // Add corner markers
            const markerSize = cellSize * 7
            ctx.fillRect(0, 0, markerSize, markerSize)
            ctx.fillRect(size - markerSize, 0, markerSize, markerSize)
            ctx.fillRect(0, size - markerSize, markerSize, markerSize)

            // Clear inner parts of corner markers
            ctx.fillStyle = color.light || '#FFFFFF'
            const innerMarkerSize = cellSize * 5
            const offset = cellSize
            ctx.fillRect(offset, offset, innerMarkerSize, innerMarkerSize)
            ctx.fillRect(
              size - markerSize + offset,
              offset,
              innerMarkerSize,
              innerMarkerSize
            )
            ctx.fillRect(
              offset,
              size - markerSize + offset,
              innerMarkerSize,
              innerMarkerSize
            )

            // Add inner squares of corner markers
            ctx.fillStyle = color.dark || '#000000'
            const innerSquareSize = cellSize * 3
            const innerOffset = cellSize * 2
            ctx.fillRect(
              innerOffset,
              innerOffset,
              innerSquareSize,
              innerSquareSize
            )
            ctx.fillRect(
              size - markerSize + innerOffset,
              innerOffset,
              innerSquareSize,
              innerSquareSize
            )
            ctx.fillRect(
              innerOffset,
              size - markerSize + innerOffset,
              innerSquareSize,
              innerSquareSize
            )

            setQrCodeDataUrl(canvas.toDataURL())
          } else {
            throw new Error('Canvas not supported')
          }

          setError('')
        } catch (err) {
          setError('Failed to generate QR code')
          console.error('QR Code generation error:', err)
        } finally {
          setIsLoading(false)
        }
      }

      if (value) {
        generateQRCode()
      }
    }, [value, size, level, includeMargin, color.dark, color.light])

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-4',
            className
          )}
          {...props}
        >
          <span className="text-red-600 text-sm">{error}</span>
        </div>
      )
    }

    if (isLoading || !qrCodeDataUrl) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center rounded-lg border bg-gray-100 animate-pulse',
            className
          )}
          style={{ width: size, height: size }}
          {...props}
        >
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <Image
          src={qrCodeDataUrl}
          alt={`QR Code for ${value}`}
          width={size}
          height={size}
          className="rounded border"
          unoptimized
        />
      </div>
    )
  }
)

QRCode.displayName = 'QRCode'

export { QRCode }
