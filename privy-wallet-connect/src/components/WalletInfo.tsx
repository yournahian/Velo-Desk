import { usePrivy } from '../hooks/usePrivy'

export default function WalletInfo() {
  const { authenticated, user, wallets, getEmbeddedWallet, getExternalWallets, exportWallet } = usePrivy()

  if (!authenticated || !user?.wallet?.address) return null

  const embedded = getEmbeddedWallet()
  const external = getExternalWallets()

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      {/* External Wallets */}
      {external.length > 0 && (
        <div className="rounded-xl bg-gray-800/40 border border-gray-700/40 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Connected Wallets
          </h3>
          <div className="space-y-2">
            {external.map((w) => (
              <div
                key={w.address}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-800/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase">
                    {w.walletClientType}
                  </span>
                  <span className="font-mono text-sm text-gray-200">
                    {w.address.slice(0, 6)}...{w.address.slice(-4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Wallet */}
      {embedded && (
        <div className="rounded-xl bg-gray-800/40 border border-gray-700/40 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Embedded Wallet (Privy)
          </h3>
          <div className="px-3 py-2 rounded-lg bg-gray-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-sm text-gray-200">
                {embedded.address.slice(0, 6)}...{embedded.address.slice(-4)}
              </span>
            </div>
            <button
              onClick={exportWallet}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      )}

      {/* No wallets - should not happen if authenticated, but handle gracefully */}
      {wallets.length === 0 && (
        <div className="rounded-xl bg-gray-800/40 border border-gray-700/40 p-5 text-center">
          <p className="text-sm text-gray-400">No wallets found. Please connect a wallet.</p>
        </div>
      )}
    </div>
  )
}
