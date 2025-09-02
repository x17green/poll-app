import type React from "react"
import { redirect } from "next/navigation"
import { getClient } from "@/lib/supabase/client"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = getClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={data.user} />
      <main className="pt-16">{children}</main>
    </div>
  )
}
