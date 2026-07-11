import { PrivyProvider } from '@privy-io/react-auth'
import { privyConfig } from './lib/privy'
import Layout from './components/Layout'
import ConnectWallet from './components/ConnectWallet'
import WalletInfo from './components/WalletInfo'

export default function App() {
  return (
    <PrivyProvider config={privyConfig}>
      <Layout>
        <ConnectWallet />
      </Layout>
      <WalletInfo />
    </PrivyProvider>
  )
}
