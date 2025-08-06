'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-primary hover:bg-primary/90 text-sm !shadow-none',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ClerkProvider>
  )
}
