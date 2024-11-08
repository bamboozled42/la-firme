"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { createBrowserSupabaseClient } from "../lib/client-utils";
import type { SupabaseClient } from "@supabase/supabase-js";

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
      <SupabaseContext.Provider value={{ supabase }}>
        {children}
      </SupabaseContext.Provider>
    </ThemeProvider>
  );
}
