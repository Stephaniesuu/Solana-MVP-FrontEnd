import React, { lazy, useEffect, useState } from 'react';
import { Navigate, RouteObject, useRoutes,useLocation} from 'react-router-dom';
import { UiLayout } from './ui/ui-layout';
import { useRole } from '../contexts/RoleContext'; 


const AccountListFeature = lazy(() => import('./pages/account/account-list-feature'));
const AccountDetailFeature = lazy(() => import('./pages/account/account-detail-feature'));
const ClusterFeature = lazy(() => import('./cluster/cluster-feature'));
const DashboardFeature = lazy(() => import('./pages/dashboard/dashboard-feature'));
const Web3MVPFeature = lazy(() => import('./web3-mvp/web3-mvp-feature'));
const RoleSelect = lazy(() => import('./pages/RoleSelect/role'));
const VaultCreationForm = lazy(() => import('./pages/strategy/CreateStrategy'));

const AppRoutes = () => {
  const { role } = useRole(); 
  const [links, setLinks] = useState<{ label: string; path: string }[]>([]);
  const location = useLocation();


  useEffect(() => {
    let linksBasedOnRole: React.SetStateAction<{ label: string; path: string; }[]> = [];
    switch (role) {
      case 'User':
        linksBasedOnRole = [
          { label: 'Account', path: '/account' },
        ];
        break;
      case 'Strateger':
        linksBasedOnRole = [
          { label: 'Account', path: '/account' },
          { label: 'Strategy', path: '/strategy' },
        ];
        break;

      default:
        linksBasedOnRole = [];
        break;
    }
    setLinks(linksBasedOnRole);
  }, [role]);

  const routes = useRoutes([
    { path: '/', element: <Navigate to="/role" replace /> },
    { path: '/account/', element: <AccountListFeature /> },
    { path: '/account/:address', element: <AccountDetailFeature /> },
    { path: '/clusters', element: <ClusterFeature /> },
    { path: 'web3-mvp/*', element: <Web3MVPFeature /> },
    { path: 'role/', element: <RoleSelect /> },
    { path: '/dashboard', element: <DashboardFeature /> },
    { path: '/strategy', element: <VaultCreationForm /> },
    { path: '*', element: <Navigate to="/role" replace /> }, 
  ]);


  if (location.pathname === '/role') {
    return routes; 
  } else {
    return <UiLayout links={links}>{routes}</UiLayout>; 
  }
};
export default AppRoutes;
