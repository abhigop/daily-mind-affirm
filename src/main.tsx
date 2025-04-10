
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from '@/context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
