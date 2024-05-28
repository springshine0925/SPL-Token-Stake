import { Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import idl from './idl.json';  // Add your IDL JSON here

const { SystemProgram } = web3;

// Connection and Wallet Setup
const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.fromSecretKey(/* Your Secret Key Array */);

// Provider
const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
anchor.setProvider(provider);

// Program
const programId = new PublicKey("YourProgramIdHere");
const program = new Program(idl, programId, provider);

// Define accounts (replace with actual addresses or generated keypairs)
const stakingAccount = Keypair.generate();
const userStakingAccount = Keypair.generate();
const userTokenAccount = ...; // User's SPL token account
const stakingTokenAccount = ...; // Staking pool's SPL token account
const userPublicKey = wallet.publicKey;

// Initialize Staking Contract
async function initialize() {
  await program.rpc.initialize({
    accounts: {
      stakingAccount: stakingAccount.publicKey,
      authority: userPublicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [stakingAccount],
  });
  console.log("Staking contract initialized");
}

// Stake Tokens
async function stake(amount: number) {
  await program.rpc.deposit(new BN(amount), {
    accounts: {
      stakingAccount: stakingAccount.publicKey,
      userStakingAccount: userStakingAccount.publicKey,
      userTokenAccount,
      stakingTokenAccount,
      authority: userPublicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    signers: [],
  });
  console.log(`${amount} tokens staked`);
}

// Unstake Tokens
async function unstake(amount: number) {
  await program.rpc.withdraw(new BN(amount), {
    accounts: {
      stakingAccount: stakingAccount.publicKey,
      userStakingAccount: userStakingAccount.publicKey,
      userTokenAccount,
      stakingTokenAccount,
      authority: userPublicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    signers: [],
  });
  console.log(`${amount} tokens unstaked`);
}

// Example Execution
(async () => {
  await initialize();
  await stake(100);
  await unstake(50);
})();