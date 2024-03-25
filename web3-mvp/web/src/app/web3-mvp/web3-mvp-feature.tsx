import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useWeb3MVPProgram } from './web3-mvp-data-access';
import { Web3MVPCreate, Web3MVPProgram } from './web3-mvp-ui';

export default function Web3MVPFeature() {
  const { publicKey } = useWallet();
  const { programId } = useWeb3MVPProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="Web3MVP"
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <Web3MVPCreate />
      </AppHero>
      <Web3MVPProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
