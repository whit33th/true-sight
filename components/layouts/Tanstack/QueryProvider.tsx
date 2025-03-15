"use client";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface IQueryClientProvider {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: IQueryClientProvider) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 60 * 1000,
            staleTime: 60 * 1000,
            retry: 0,
            refetchOnWindowFocus: false,
            placeholderData: keepPreviousData,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
