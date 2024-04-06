import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../../components/solana/solana-provider';
import { Navigate } from 'react-router-dom';

export default function VaultListFeature() {
  const { publicKey } = useWallet();

  if (publicKey) {
    return <Navigate to={publicKey.toString()} replace />;
  }

  return (
    <div>
      <div className='mt-40'>
        <WalletButton />
      </div>
    </div>
  );
}
