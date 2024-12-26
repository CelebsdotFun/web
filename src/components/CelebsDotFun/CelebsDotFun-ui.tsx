'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCelebsDotFunProgram } from './CelebsDotFun-data-access'

export function CelebsDotFunList() {
  const [showAlive, setShowAlive] = useState(true)
  const { accounts } = useCelebsDotFunProgram()
  
  const filteredAccounts = useMemo(() => {
    return accounts.data?.filter(account => account.is_alive === showAlive) || []
  }, [accounts.data, showAlive])

  return (
    <div className="space-y-6">
      <div className="tabs tabs-boxed justify-center">
        <button 
          className={`tab ${showAlive ? 'tab-active' : ''}`}
          onClick={() => setShowAlive(true)}
        >
          Living Celebrities
        </button>
        <button 
          className={`tab ${!showAlive ? 'tab-active' : ''}`}
          onClick={() => setShowAlive(false)}
        >
          Deceased Legends
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filteredAccounts.map((account) => (
          <CelebrityCard 
            key={account.publicKey.toString()} 
            account={account.publicKey}
          />
        ))}
      </div>
    </div>
  )
}

function CelebrityCard({ account }: { account: PublicKey }) {
  const { accountQuery } = useCelebsDotFunProgram()
  const celebrity = accountQuery.data

  if (!celebrity) return null

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{celebrity.name}</h2>
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">AI Sentiment Score</div>
            <div className="stat-value">{celebrity.ai_sentiment_score}/100</div>
          </div>
          <div className="stat">
            <div className="stat-title">Meme Power</div>
            <div className="stat-value">{celebrity.meme_power}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Supply</div>
            <div className="stat-value">{celebrity.supply}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Mint Tokens</button>
        </div>
      </div>
    </div>
  )
}
