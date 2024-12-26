import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {CelebsDotFun} from '../target/types/CelebsDotFun'

describe('CelebsDotFun', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.CelebsDotFun as Program<CelebsDotFun>

  const CelebsDotFunKeypair = Keypair.generate()

  it('Initialize CelebsDotFun', async () => {
    await program.methods
      .initialize()
      .accounts({
        CelebsDotFun: CelebsDotFunKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([CelebsDotFunKeypair])
      .rpc()

    const currentCount = await program.account.CelebsDotFun.fetch(CelebsDotFunKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment CelebsDotFun', async () => {
    await program.methods.increment().accounts({ CelebsDotFun: CelebsDotFunKeypair.publicKey }).rpc()

    const currentCount = await program.account.CelebsDotFun.fetch(CelebsDotFunKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment CelebsDotFun Again', async () => {
    await program.methods.increment().accounts({ CelebsDotFun: CelebsDotFunKeypair.publicKey }).rpc()

    const currentCount = await program.account.CelebsDotFun.fetch(CelebsDotFunKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement CelebsDotFun', async () => {
    await program.methods.decrement().accounts({ CelebsDotFun: CelebsDotFunKeypair.publicKey }).rpc()

    const currentCount = await program.account.CelebsDotFun.fetch(CelebsDotFunKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set CelebsDotFun value', async () => {
    await program.methods.set(42).accounts({ CelebsDotFun: CelebsDotFunKeypair.publicKey }).rpc()

    const currentCount = await program.account.CelebsDotFun.fetch(CelebsDotFunKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the CelebsDotFun account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        CelebsDotFun: CelebsDotFunKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.CelebsDotFun.fetchNullable(CelebsDotFunKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
