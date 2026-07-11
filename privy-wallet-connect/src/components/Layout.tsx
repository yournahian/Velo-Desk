import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M8 12h8" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Web3 Wallet</span>
          </div>
          {children}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-16 mb-3">
            Web3 Wallet Connection
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Connect your wallet to get started. Supports MetaMask, Rabby, Coinbase Wallet, and WalletConnect.
          </p>
        </div>
      </main>
    </div>
  )
}
