import { PrivyClient } from '@privy-io/react-auth'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID

if (!PRIVY_APP_ID) {
  throw new Error(
    'VITE_PRIVY_APP_ID is not defined. Set it in your .env file or environment variables.'
  )
}

export const privyConfig = {
  appId: PRIVY_APP_ID,
  loginMethods: ['wallet'],
  legal: {
    termsUrl: 'https://example.com/terms',
    privacyUrl: 'https://example.com/privacy',
  },
  appearance: {
    theme: 'dark',
    accentColor: '#6366f1',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdib3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iIzYzNjZmMSIvPjx0ZXh0IHg9IjI0IiB5PSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+VzM8L3RleHQ+PC9zdmc+',
  },
  embeddedWallets: {
    createOnLogin: 'all-users',
    noPromptOnSignature: true,
  },
  mfa: {
    noPromptOnMfaRequired: true,
  },
}

// This is only used on the backend. Never expose the app secret to the frontend.
// The app secret should be stored in server-side environment variables only.
export const PRIVY_APP_SECRET_ENV_VAR = 'PRIVY_APP_SECRET'
