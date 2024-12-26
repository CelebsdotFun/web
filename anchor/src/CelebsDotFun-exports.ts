// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CelebsDotFunIDL from '../target/idl/CelebsDotFun.json'
import type { CelebsDotFun } from '../target/types/CelebsDotFun'

// Re-export the generated IDL and type
export { CelebsDotFun, CelebsDotFunIDL }

// The programId is imported from the program IDL.
export const CELEBS_DOT_FUN_PROGRAM_ID = new PublicKey(CelebsDotFunIDL.address)

// This is a helper function to get the CelebsDotFun Anchor program.
export function getCelebsDotFunProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CelebsDotFunIDL, address: address ? address.toBase58() : CelebsDotFunIDL.address } as CelebsDotFun, provider)
}

// This is a helper function to get the program ID for the CelebsDotFun program depending on the cluster.
export function getCelebsDotFunProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the CelebsDotFun program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return CELEBS_DOT_FUN_PROGRAM_ID
  }
}
