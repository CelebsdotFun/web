'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero } from '../ui/ui-layout'
import { useState } from 'react'

// Sample data - In production, this would come from your Solana program
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

export default function CelebsDotFunFeature() {
  const { publicKey } = useWallet()
  const [selectedPanel, setSelectedPanel] = useState<'alive' | 'dead'>('alive')

  return publicKey ? (
    <div className="min-h-screen bg-base-200">
      <AppHero 
        title="AI Sentient Meme Coins" 
        subtitle="Mint and trade celebrity-powered meme coins enhanced by artificial intelligence" 
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Panel Toggle */}
        <div className="tabs tabs-boxed justify-center mb-8">
          <button 
            className={`tab tab-lg ${selectedPanel === 'alive' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPanel('alive')}
          >
            Living Legends
          </button>
          <button 
            className={`tab tab-lg ${selectedPanel === 'dead' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPanel('dead')}
          >
            Immortal Icons
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Celebrity Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {(selectedPanel === 'alive' ? aliveCelebrities : deadCelebrities).map((celeb, index) => (
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

          {/* Info Panel */}
          <div className="alert alert-info shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-bold">How it works</h3>
                <div className="text-xs">
                  Each celebrity meme coin is powered by our AI sentiment analysis engine that tracks cultural impact, 
                  social media presence, and historical significance. Mint coins to start trading!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
