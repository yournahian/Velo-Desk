export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "clxplaceholder12345"

if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
  console.warn(
    'Warning: NEXT_PUBLIC_PRIVY_APP_ID is not defined. Please add it to your environment variables.'
  )
}

export const privyConfig = {
  loginMethods: ['wallet' as const],
  legal: {
    termsAndConditionsUrl: 'https://example.com/terms',
    privacyPolicyUrl: 'https://example.com/privacy',
  },
  appearance: {
    theme: 'light' as const,
    accentColor: '#ff5c00' as const,
  },
  embeddedWallets: {
    createOnLogin: 'all-users' as const,
    noPromptOnSignature: true,
  },
  mfa: {
    noPromptOnMfaRequired: true,
  },
}

export const SUPPORTED_WALLETS = [
  { name: 'MetaMask', icon: 'https://cdnjs.cloudflare.com/ajax/libs/web3modal/1.9.0/images/metamask.svg' },
  { name: 'Rabby', icon: 'https://cdn.prod.website-files.com/65b2415e33dafa5a44c1e88c/663769a69ff24c93ea2c9203_rabby.svg' },
  { name: 'Coinbase Wallet', icon: 'https://cdnjs.cloudflare.com/ajax/libs/web3modal/1.9.0/images/coinbase.svg' },
  { name: 'WalletConnect', icon: 'https://cdnjs.cloudflare.com/ajax/libs/web3modal/1.9.0/images/walletconnect.svg' },
]
