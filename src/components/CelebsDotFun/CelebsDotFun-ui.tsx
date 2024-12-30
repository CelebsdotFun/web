'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCelebsDotFunProgram } from './CelebsDotFun-data-access'

// Sample data until we update the Anchor program
const aliveCelebrities = [
  { name: 'Elon Musk', aiScore: 92, memeValue: '420.69 SOL', trend: '+12%' },
  { name: 'Keanu Reeves', aiScore: 88, memeValue: '69.42 SOL', trend: '+15%' },
  { name: 'Rick Astley', aiScore: 95, memeValue: '333.33 SOL', trend: '+69%' },
]

const deadCelebrities = [
  { name: 'Albert Einstein', aiScore: 89, memeValue: '314.15 SOL', trend: '+31%' },
  { name: 'Nikola Tesla', aiScore: 86, memeValue: '369.00 SOL', trend: '+25%' },
  { name: 'Bob Ross', aiScore: 91, memeValue: '420.00 SOL', trend: '+42%' },
]

export function CelebsDotFunList() {
  const [showAlive, setShowAlive] = useState(true)
  const { accounts } = useCelebsDotFunProgram()
  
  // Use sample data until Anchor program is updated
  const celebrities = showAlive ? aliveCelebrities : deadCelebrities

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
        {celebrities.map((celeb, index) => (
          <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <h2 className="card-title justify-between">
                {celeb.name}
                <div className="badge badge-secondary">{celeb.trend}</div>
              </h2>
              
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">AI Sentiment Score</div>
                  <div className="stat-value text-primary">{celeb.aiScore}/100</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Meme Value</div>
                  <div className="stat-value text-secondary">{celeb.memeValue}</div>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">Mint Coins</button>
                <button className="btn btn-outline">View Stats</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
