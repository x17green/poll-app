import { createClient as createBrowserClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createBrowserClient> | null = null

export const getClient = () => {
  if (!supabase) {
    supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabase
}
