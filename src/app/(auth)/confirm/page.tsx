import Link from 'next/link'

export default function AuthConfirmPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Check your email</h1>
        <p className="text-muted-foreground mb-8">
          We&apos;ve sent a confirmation link to your email address. Please click the
          link to complete your registration.
        </p>
        <Link href="/login">
          <span className="text-primary hover:underline">
            Back to login
          </span>
        </Link>
      </div>
    </div>
  )
}
