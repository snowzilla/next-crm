'use client'

import { Provider } from "@/components/ui/provider"
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {LoadingProvider} from "@/contexts/loadingContext";
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning>
    <body>
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Toaster/>
          {children}
        </Provider>
      </QueryClientProvider>
    </LoadingProvider>
    </body>
    </html>
  );
}
