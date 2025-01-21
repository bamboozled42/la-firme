"use client";
import { toast } from "@/components/ui/use-toast";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { createBrowserSupabaseClient } from "../lib/client-utils";

interface SupabaseContextProps {
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a Providers");
  }
  return context.supabase;
};

export function Providers({ children }: { children: ReactNode }) {
  const supabase = createBrowserSupabaseClient();

  return (
    <ThemeProvider>
      <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
    </ThemeProvider>
  );
}

interface ToastHandlerProps {
  notWhitelisted: boolean;
  loginError: boolean;
}

export default function ToastHandler({ notWhitelisted, loginError }: ToastHandlerProps) {
  const router = useRouter();
  useEffect(() => {
    if (notWhitelisted) {
      toast({
        title: "Access Denied",
        description: "You are not on the whitelist for this application.",
        variant: "destructive", // Adjust based on your toast library
      });
    } else if (loginError) {
      toast({
        title: "Error Logging in",
        description: "There was an error logging in. Please try again.",
        variant: "destructive", // Adjust based on your toast library
      });
    }
    router.replace(window.location.pathname);
  }, [notWhitelisted]);

  return null; // This component only handles side effects
}
