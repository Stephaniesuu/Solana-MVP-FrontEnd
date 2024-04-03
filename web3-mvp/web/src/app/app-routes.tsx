import React, { lazy } from 'react';
import { Navigate, useRoutes, RouteObject } from 'react-router-dom';
import { UiLayout } from './components/ui/ui-layout';

import DashboardFeature from './pages/dashboard/dashboard-feature';
const AccountListFeature = lazy(() => import('./pages/account/account-list-feature'));
const AccountDetailFeature = lazy(() => import('./pages/account/account-detail-feature'));
const ClusterFeature = lazy(() => import('./components/cluster/cluster-feature'));
const VaultCreationForm = lazy(() => import('./pages/strategy/createStrategy'));
const ProfileListFeature = lazy(() => import('./pages/profile/profile-list-feature'));
const ProfileDetailFeature = lazy(() => import('./pages/profile/profile-detail-feature'));

const links: { label: string; path: string }[] = [
  { label: 'User', path: '/account' },
];
  
  
  const routes: RouteObject[] = [
    { path: '/account/', element: <AccountListFeature /> },
    { path: '/account/:address', element: <AccountDetailFeature /> },
    { path: '/profile', element:<ProfileListFeature />},
    { path: '/profile/:address', element: <ProfileDetailFeature /> },
    { path: '/createVault', element:<VaultCreationForm />}
    // { path: '/clusters', element: <ClusterFeature /> },
  ];
  
  export function AppRoutes() {
    return (
      <UiLayout links={links}>
        {useRoutes([
          { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
          { path: '/dashboard', element: <DashboardFeature /> },
          ...routes,
          { path: '*', element: <Navigate to={'/dashboard'} replace={true} /> },
        ])}
      </UiLayout>
    );
  }

