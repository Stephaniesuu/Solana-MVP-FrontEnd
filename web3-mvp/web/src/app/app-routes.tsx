import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { UiLayout } from './components/ui/ui-layout';
import { useRole } from '../contexts/RoleContext'; 

const AccountListFeature = lazy(() => import('./pages/account/account-list-feature'));
const AccountDetailFeature = lazy(() => import('./pages/account/account-detail-feature'));
const ClusterFeature = lazy(() => import('./components/cluster/cluster-feature'));
const DashboardFeature = lazy(() => import('./pages/dashboard/dashboard-feature'));
const Web3MVPFeature = lazy(() => import('./components/web3-mvp/web3-mvp-feature'));
const RoleSelect = lazy(() => import('./pages/RoleSelect/role'));
const VaultCreationForm = lazy(() => import('./pages/strategy/CreateStrategy'));

type RoleType = 'User' | 'Strateger' | 'default';

const AppRoutes = () => {
  const { role } = useRole();
  const location = useLocation();

  const linksBasedOnRole: Record<RoleType, { label: string; path: string; }[]> = {
    'User': [
      { label: 'Account', path: '/account' },
    ],
    'Strateger': [
      { label: 'Account', path: '/account' },
      { label: 'Strategy', path: '/strategy' },
    ],
    'default': []
  };

  const links = linksBasedOnRole[role as RoleType] || [];
  
  const routes = useRoutes([
    { path: '/', element: <Navigate to={role ? '/dashboard' : '/role'} replace /> },
    { path: 'role/', element: <RoleSelect /> },
    { path: '/account/', element: <AccountListFeature /> },
    { path: '/account/:address', element: <AccountDetailFeature /> },
    { path: '/clusters', element: <ClusterFeature /> },
    { path: 'web3-mvp/*', element: <Web3MVPFeature /> },
    { path: '/dashboard', element: role ? <DashboardFeature /> : <Navigate to="/role" replace /> },
    { path: '/strategy', element: <VaultCreationForm /> },
    { path: '*', element: <Navigate to="/role" replace /> },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {location.pathname === '/role' || !role ? routes : <UiLayout links={links}>{routes}</UiLayout>}
    </Suspense>
  );
};

export default AppRoutes;
