'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCelebsDotFunProgram } from './CelebsDotFun-data-access'
import { CelebsDotFunList } from './CelebsDotFun-ui'

export default function CelebsDotFunFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCelebsDotFunProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="Celebrity AI Meme Coins"
        subtitle="Mint and trade meme coins powered by AI sentiment analysis of celebrity cultural impact. Choose from living celebrities or deceased legends."
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <CelebsDotFunCreate />
      </AppHero>
      <CelebsDotFunList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
