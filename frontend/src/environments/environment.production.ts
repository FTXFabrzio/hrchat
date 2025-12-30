export const environment = {
  production: true,
  supabaseUrl: window.__env?.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: window.__env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  apiBaseUrl: window.__env?.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000',
  chatWebhooks: {
    test: {
      url: 'https://fabrizio.vexy.host/webhook-test/051f43ab-99a2-409b-b885-e4d3050be51c',
    },
    production: {
      url: 'https://fabrizio.vexy.host/webhook/051f43ab-99a2-409b-b885-e4d3050be51c',
    },
  },
};

