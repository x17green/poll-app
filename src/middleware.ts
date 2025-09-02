import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const protectedRoutes = ['/dashboard', '/polls/new'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Check if the user is already authenticated
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: Record<string, unknown>) {
                    request.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: unknown) {
                    request.cookies.delete(name);
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    const isLoggedIn = !!session;
    const isAuthRoute = pathname.startsWith('/auth');

    // Handle authentication and authorization

    if (isProtectedRoute && !isLoggedIn) {
        // Redirect to login page with the return URL
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('returnUrl', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    if (isLoggedIn && isAuthRoute) {
        // Redirect authenticated users away from auth routes
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Continue to the requested page
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|_next|favicon.ico|auth|api).*)',
    ],
};
