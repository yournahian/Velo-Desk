"use client";

import { usePrivy as usePrivyRaw, useWallets } from '@privy-io/react-auth'
import { useCallback } from 'react'

export function usePrivy() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet,
    connectWallet,
    exportWallet,
  } = usePrivyRaw()

  const { wallets } = useWallets()

  const getEmbeddedWallet = useCallback(() => {
    return wallets.find((w) => w.walletClientType === 'privy')
  }, [wallets])

  const getExternalWallets = useCallback(() => {
    return wallets.filter((w) => w.walletClientType !== 'privy')
  }, [wallets])

  const formatAddress = useCallback((address: string): string => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [])

  return {
    ready,
    authenticated,
    user,
    wallets,
    login,
    logout,
    linkWallet,
    unlinkWallet,
    connectWallet,
    exportWallet,
    getEmbeddedWallet,
    getExternalWallets,
    formatAddress,
  }
}
