'use client'

import { getCelebsDotFunProgram, getCelebsDotFunProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useCelebsDotFunProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCelebsDotFunProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCelebsDotFunProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['CelebsDotFun', 'all', { cluster }],
    queryFn: () => program.account.CelebsDotFun.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['CelebsDotFun', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ CelebsDotFun: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useCelebsDotFunProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCelebsDotFunProgram()

  const accountQuery = useQuery({
    queryKey: ['CelebsDotFun', 'fetch', { cluster, account }],
    queryFn: () => program.account.CelebsDotFun.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['CelebsDotFun', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ CelebsDotFun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['CelebsDotFun', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ CelebsDotFun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['CelebsDotFun', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ CelebsDotFun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['CelebsDotFun', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ CelebsDotFun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
