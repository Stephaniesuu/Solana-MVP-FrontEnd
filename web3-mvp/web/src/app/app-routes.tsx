import React, { lazy } from 'react';
import { Navigate, useRoutes, RouteObject } from 'react-router-dom';
import { UiLayout } from './components/ui/ui-layout';

const AccountListFeature = lazy(() => import('./pages/account/account-list-feature'));
const AccountDetailFeature = lazy(() => import('./pages/account/account-detail-feature'));
const ClusterFeature = lazy(() => import('./components/cluster/cluster-feature'));
const VaultCreationForm = lazy(() => import('./pages/strategy/CreateStrategy'));
const ProfileListFeature = lazy(() => import('./pages/profile/profile-list-feature'));
const ProfileDetailFeature = lazy(() => import('./pages/profile/profile-detail-feature'));
const Marketplace = lazy(() => import('./pages/Marketplace/marketplace'));
const VaultDetail = lazy(() => import('./pages/VaultDetail/VaultDetail'));

const links: { label: string; path: string }[] = [
  { label: 'User', path: '/account' },
];
  
  
  const routes: RouteObject[] = [
    { path: '/account/', element: <AccountListFeature /> },
    { path: '/account/:address', element: <AccountDetailFeature /> },
    { path: '/profile', element:<ProfileListFeature />},
    { path: '/profile/:address', element: <ProfileDetailFeature /> },
    { path: '/createVault', element:<VaultCreationForm />},
    // { path: '/clusters', element: <ClusterFeature /> },
    { path: '/marketplace', element: <Marketplace /> },
    { path: '/vaultdetail', element: <VaultDetail /> },
  ];
  
  export function AppRoutes() {
    return (
      <UiLayout links={links}>
        {useRoutes([
          { index: true, element: <Navigate to={'/marketplace'} replace={true} /> },
          { path: '/marketplace', element: <Marketplace /> },
          ...routes,
          { path: '*', element: <Navigate to={'/marketplace'} replace={true} /> },
        ])}
      </UiLayout>
    );
  }

