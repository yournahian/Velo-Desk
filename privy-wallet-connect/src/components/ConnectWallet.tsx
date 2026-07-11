import { useState } from 'react'
import { usePrivy } from '../hooks/usePrivy'

export default function ConnectWallet() {
  const { ready, authenticated, login, logout, user, wallets, formatAddress } = usePrivy()
  const [isHovering, setIsHovering] = useState(false)

  if (!ready) {
    return (
      <button
        disabled
        className="px-6 py-3 rounded-xl bg-gray-800/50 text-gray-400 border border-gray-700/50 font-medium text-sm cursor-not-allowed animate-pulse"
      >
        Initializing...
      </button>
    )
  }

  if (authenticated && user?.wallet?.address) {
    const primaryWallet = wallets[0]
    const walletType = primaryWallet?.walletClientType ?? 'wallet'
    const isEmbedded = walletType === 'privy'

    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-800/60 border border-gray-700/50">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isEmbedded ? 'bg-emerald-400' : 'bg-blue-400'}`} />
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              {isEmbedded ? 'Embedded' : walletType}
            </span>
          </div>
          <span className="text-gray-200 font-mono text-sm">
            {formatAddress(user.wallet.address)}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(user.wallet!.address)}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            title="Copy address"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={logout}
          className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50"
        >
          {isHovering ? 'Disconnect' : 'Connected'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={login}
      className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm bg-indigo-500 text-white hover:bg-indigo-400 active:bg-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/40 active:shadow-indigo-600/20 overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2.5">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M8 12h8" strokeWidth="2.5" />
        </svg>
        Connect Wallet
      </span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-indigo-400 to-indigo-500" />
    </button>
  )
}
