poll-app/rules/ai-assistant/project-rules.md
```

```
# Project Rules for AI Assistant

This document outlines the structure, libraries, and expectations for the Polling App project. These rules are designed to help AI assistants (e.g., Zed, VSCode, Cursor, Trae) understand and work effectively within the project.

---

## 1. **Folder Structure**
- **`/src/app/polls/`**: Contains all components and pages related to poll creation, listing, and management.
  - Example: `PollForm.tsx`, `PollList.tsx`
- **`/src/app/api/`**: Houses API routes for handling backend logic.
  - Example: `polls.ts`, `auth.ts`
- **`/src/components/`**: Shared UI components used across the app.
  - Example: `Button.tsx`, `Modal.tsx`
- **`/src/hooks/`**: Custom React hooks for reusable logic.
  - Example: `useAuth.ts`, `usePolls.ts`

---

## 2. **Form Libraries**
- **`react-hook-form`**: Used for managing forms.
  - Always use `zod` for schema validation with `react-hook-form`.
  - Example:
    ```tsx
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { z } from "zod";

    const schema = z.object({
      title: z.string().min(1, "Title is required"),
    });

    const { register, handleSubmit } = useForm({
      resolver: zodResolver(schema),
    });
    ```
- **`shadcn/ui`**: Use for consistent and accessible UI components.
  - Example: `<Button>`, `<Input>`, `<Form>`

---

## 3. **Supabase Usage**
- **Authentication**: Supabase is used for user authentication.
  - Example:
    ```tsx
    import { supabase } from "@/lib/supabase";

    const { data, error } = await supabase.auth.signInWithPassword({
      email: "user@example.com",
      password: "password123",
    });
    ```
- **Database**: Use Supabase for managing polls and user data.
  - Example:
    ```tsx
    const { data, error } = await supabase
      .from("polls")
      .select("*")
      .eq("user_id", userId);
    ```

---

## 4. **Scaffolding and Refactoring**
- **Creating a New Poll Form**:
  - Use `react-hook-form` for form management.
  - Use `zod` for validation.
  - Example:
    ```tsx
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { z } from "zod";
    import { Button, Input } from "@/components/ui";

    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
    });

    export default function PollForm() {
      const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema),
      });

      const onSubmit = (data) => {
        console.log(data);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("title")} placeholder="Poll Title" />
          <Input {...register("description")} placeholder="Description" />
          <Button type="submit">Create Poll</Button>
        </form>
      );
    }
    ```

---

## 5. **AI Assistant Expectations**
- **Follow Folder Structure**: Ensure new files are placed in the correct directories.
- **Use Approved Libraries**: Always use `react-hook-form`, `zod`, and `shadcn/ui` for forms and UI.
- **Supabase Integration**: Use Supabase for all authentication and database operations.
- **Code Consistency**: Follow the existing patterns and conventions in the project.

---

By adhering to these rules, the AI assistant can effectively scaffold, refactor, and contribute to the Polling App project.