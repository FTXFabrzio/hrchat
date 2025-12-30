export {};

declare global {
  interface Window {
    __env?: {
      NEXT_PUBLIC_SUPABASE_URL?: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
      NEXT_PUBLIC_API_BASE_URL?: string;
    };
  }
}

