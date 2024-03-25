// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from '@solana/web3.js';
import type { Web3Mvp } from '../target/types/web3_mvp';
import { IDL as Web3MvpIDL } from '../target/types/web3_mvp';

// Re-export the generated IDL and type
export { Web3Mvp, Web3MvpIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  'BS1cp5pqzCS6s3XNYHGZfRUbowSKFr3R2jVCWa3dbZkE'
);
