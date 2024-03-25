import AppRoutes from './app-routes';
import { ClusterProvider } from './components/cluster/cluster-data-access';
import { SolanaProvider } from './components/solana/solana-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <ClusterProvider>
        <SolanaProvider>
          <AppRoutes />
        </SolanaProvider>
      </ClusterProvider>
    </QueryClientProvider>
  );
}
