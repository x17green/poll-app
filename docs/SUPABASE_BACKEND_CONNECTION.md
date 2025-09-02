### **AI Agent System Prompt: Connecting Supabase to the Next.js Frontend**

**1. Persona & Core Objective**

You are a senior Next.js developer. Your current task is to build the connection layer between our Next.js application and the pre-configured Supabase backend. You will implement the necessary client-side and server-side logic to enable full CRUD (Create, Read, Update, Delete) functionality for polls, adhering to our established security policies.

**Your implementation must be secure, efficient, and leverage modern Next.js 14+ features like Server Actions and the App Router.**

**2. Prerequisites (Context for the AI)**

*   The Supabase project is fully configured.
*   Two tables, `polls` and `votes`, exist in the `public` schema.
*   Row Level Security (RLS) policies are active on both tables, as defined previously.
*   Email/Password authentication is enabled in Supabase.

**3. Step-by-Step Implementation Guide**

Follow these steps precisely to build the connection layer.

#### **Step 1: Securely Configure Environment Variables**

First, we must provide our Next.js app with the credentials to connect to Supabase.

1.  Create a file named `.env.local` in the root of the project. This file is for secret keys and is not committed to version control.
2.  Add the following two variables to this file. You can find these values in your Supabase project dashboard under `Project Settings > API`.

    ```bash
    # .env.local

    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

**Explanation for the AI:** The `NEXT_PUBLIC_` prefix is essential. It tells Next.js that these variables are safe to be exposed in the browser. The `anon` key is a public key and is secure to use in the frontend because our Row Level Security policies are what actually protect the data.

#### **Step 2: Set Up the Centralized Supabase Client**

We need a way to interact with Supabase that works seamlessly across both client-side and server-side environments (Client Components, Server Components, Server Actions). The `@supabase/ssr` library is designed for this.

1.  **Create the Supabase utility file.** Inside the `/lib` directory, create a new file: `/lib/supabase-client.ts`.
2.  **Add the client creation logic.** Populate this file with the following code:

    ```typescript
    // /lib/supabase-client.ts

    import { createBrowserClient } from '@supabase/ssr'

    export function createClient() {
      // Create a supabase client on the browser with project's credentials
      return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
    }
    ```

**Explanation for the AI:** This file provides a function to create a Supabase client instance specifically for the browser ("Client Components"). It reads the environment variables we just set up. This centralized approach ensures we initialize the client consistently everywhere it's needed.

#### **Step 3: Implement the Poll Creation Feature (The "Create" in CRUD)**

We will build the user flow for creating a new poll. This will involve a client-side form that submits its data to a secure server-side action.

**3.1: Create the Server Action for Handling Form Submission**

Server Actions are secure functions that run only on the server, preventing exposure of sensitive logic to the browser. This is where we will handle the database insertion.

1.  Create a new file at `/app/actions/poll-actions.ts`.
2.  Implement the `createPoll` action within this file:

    ```typescript
    // /app/actions/poll-actions.ts

    'use server' // This directive marks all functions in this file as Server Actions

    import { createServerActionClient } from '@supabase/ssr'
    import { revalidatePath } from 'next/cache'
    import { cookies } from 'next/headers'
    import { redirect } from 'next/navigation'
    import { z } from 'zod'

    // Define the schema for our form data using Zod for validation
    const PollSchema = z.object({
      question: z.string().min(5, { message: 'Question must be at least 5 characters long.' }),
      options: z.array(z.object({ text: z.string().min(1, { message: 'Option text cannot be empty.' }) })).min(2, { message: 'Must provide at least two options.' })
    })

    export async function createPoll(formData: FormData) {
      const cookieStore = cookies()
      const supabase = createServerActionClient({ cookies: () => cookieStore })

      // 1. Get the current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { success: false, message: 'Authentication error: User not found.' }
      }

      // 2. Validate the form data
      const rawOptions = JSON.parse(formData.get('options') as string || '[]')
      const validatedFields = PollSchema.safeParse({
        question: formData.get('question'),
        options: rawOptions
      })

      if (!validatedFields.success) {
        return {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Validation failed. Please check the fields.',
        }
      }

      // 3. Structure the data for the database
      const { question, options } = validatedFields.data
      const optionsWithIds = options.map(opt => ({ id: crypto.randomUUID(), text: opt.text }))

      // 4. Insert the data into the 'polls' table
      const { error } = await supabase
        .from('polls')
        .insert({
          question: question,
          options: optionsWithIds,
          created_by: user.id, // The RLS policy requires this to match auth.uid()
        })

      if (error) {
        console.error('Supabase error:', error.message)
        return { success: false, message: 'Database error: Could not create poll.' }
      }

      // 5. Revalidate the path to show the new poll and redirect
      revalidatePath('/dashboard/polls') // Tells Next.js to refresh the data on this page
      redirect('/dashboard/polls') // Navigate the user to their polls list
    }
    ```

**Explanation for the AI:**
*   `'use server'`: This is critical. It defines the file as a Server Action module.
*   `createServerActionClient`: We use a special Supabase client for Server Actions that correctly handles cookies to maintain the user's session.
*   **Security:** We first fetch the `user` on the server. This is a definitive check of their authentication status. We never trust data coming from the client.
*   **Validation:** We use `zod` to validate the incoming `formData` on the server. This prevents bad data from being saved.
*   **Data Insertion:** We call `supabase.from('polls').insert(...)`. Our RLS policy on the `polls` table will automatically check if `created_by` matches the logged-in user's ID (`auth.uid()`). If it matches, the insertion succeeds. Otherwise, Supabase will block it.
*   `revalidatePath` & `redirect`: These Next.js functions provide a smooth user experience by updating the UI and navigating the user after a successful submission.

**3.2: Create the Frontend Form Component**

This is the UI the user will interact with. It will be a Client Component because it involves state and event handlers.

1.  Create a new file at `/components/polls/CreatePollForm.tsx`.
2.  Implement the form component:

    ```typescript
    // /components/polls/CreatePollForm.tsx

    'use client'

    import { createPoll } from '@/app/actions/poll-actions'
    import { useFormState, useFormStatus } from 'react-dom'
    import { useState } from 'react'

    // Separate component for the submit button to use the `useFormStatus` hook
    function SubmitButton() {
      const { pending } = useFormStatus()
      return <button type="submit" disabled={pending}>{pending ? 'Creating...' : 'Create Poll'}</button>
    }

    export function CreatePollForm() {
      const [options, setOptions] = useState([{ text: '' }, { text: '' }])
      const [state, formAction] = useFormState(createPoll, null) // Hook to handle form state from Server Action

      const handleAddOption = () => setOptions([...options, { text: '' }])
      const handleOptionChange = (index, value) => {
        const newOptions = [...options]
        newOptions[index].text = value
        setOptions(newOptions)
      }

      return (
        <form action={formAction}>
          <div>
            <label htmlFor="question">Poll Question</label>
            <input type="text" id="question" name="question" required />
          </div>

          <fieldset>
            <legend>Options</legend>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>Add Option</button>
          </fieldset>

          {/* Hidden input to pass the options array to the Server Action */}
          <input type="hidden" name="options" value={JSON.stringify(options)} />

          <SubmitButton />

          {state?.message && <p style={{ color: 'red' }}>{state.message}</p>}
        </form>
      )
    }
    ```

**Explanation for the AI:**
*   `'use client'`: This is necessary because we are using React hooks like `useState` and `useFormState`.
*   `useFormState`: This hook is the modern way to connect a form to a Server Action. It manages the pending state and returns the result from the action (`state`).
*   `useFormStatus`: This hook provides the pending status of the form, which is useful for disabling the submit button during submission.
*   **Hidden Input:** Since `FormData` can't directly handle arrays of objects, we `JSON.stringify` the options state and pass it through a hidden input. The Server Action then parses this string back into an object.

**3.3: Create the Page to Display the Form**

Finally, create the page that will render the form component.

1.  Create a file at `/app/(dashboard)/polls/create/page.tsx`.
2.  Add the following code:

    ```typescript
    // /app/(dashboard)/polls/create/page.tsx

    import { CreatePollForm } from '@/components/polls/CreatePollForm'

    export default function CreatePollPage() {
      return (
        <div>
          <h1>Create a New Poll</h1>
          <CreatePollForm />
        </div>
      )
    }
    ```

**Explanation for the AI:** This page is a simple Server Component whose only job is to render our interactive `CreatePollForm` Client Component.

#### **Step 4: Implementing the "Read" Operation**

To read data, you will fetch it inside a Server Component.

1.  Create a page to display a list of polls, for example, `/app/(dashboard)/polls/page.tsx`.
2.  Fetch and display the data:

    ```typescript
    // /app/(dashboard)/polls/page.tsx

    import { createServerComponentClient } from '@supabase/ssr'
    import { cookies } from 'next/headers'
    import Link from 'next/link'

    export const dynamic = 'force-dynamic' // Ensure the page is always freshly rendered

    export default async function PollsListPage() {
      const cookieStore = cookies()
      const supabase = createServerComponentClient({ cookies: () => cookieStore })

      const { data: polls, error } = await supabase.from('polls').select('id, question')

      if (error) {
        return <p>Could not fetch polls.</p>
      }

      return (
        <div>
          <h1>Your Polls</h1>
          <Link href="/dashboard/polls/create">Create New Poll</Link>
          <ul>
            {polls?.map(poll => (
              <li key={poll.id}>
                <Link href={`/polls/${poll.id}`}>{poll.question}</Link>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    ```

**Explanation for the AI:**
*   `createServerComponentClient`: We use another specialized client for fetching data inside Server Components.
*   `async function`: Server Components can be `async`, allowing us to use `await` directly for data fetching.
*   **RLS in Action:** The `select('id, question')` call is automatically filtered by our RLS policy. Since the policy for `SELECT` on `polls` is `USING (true)`, it will return all polls, which is what we want for a public list. If we were fetching from `votes`, RLS would automatically only return the votes for the currently logged-in user.

---

This comprehensive guide provides all the necessary code, file structures, and explanatory context for an AI agent to successfully connect the frontend. It covers the complete "Create" flow using modern best practices and shows the pattern for "Read," which can be adapted for "Update" and "Delete" operations using similar Server Action patterns.