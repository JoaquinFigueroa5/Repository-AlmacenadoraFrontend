import { lazy } from 'react';
import ProvidersPage from './components/providers/ProvidersPage';

const Auth = lazy(() => import('./pages/Auth'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ViewUsers = lazy(() => import('./components/ViewUsers'));
const ProductsPage = lazy(() => import('./pages/products/ProductPage'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const UnauthorizedModal = lazy(() => import('./components/UnauthorizedModal'));
const Stats = lazy(() => import('./pages/Stats'));
const ClientsPage = lazy(() => import('./components/clients/ClientPage'));
const CategoryPage = lazy(() => import('./components/category/CategoryPage'));

const routes = [
    { path: '/', element: <Auth /> },
    { path: '/unauthorized', element: <UnauthorizedModal /> },
    {
        path: '/dashboard/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
        children: [
            { path: '', element: <LandingPage /> }
        ]
    },
    {
      path: '/products/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
      children: [
        { path: '', element: <ProductsPage /> }
      ]
    },
    {
      path: '/users/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
      children: [
        { path: '*', element: <ViewUsers /> },
        { path: ':id', element: <ViewUsers /> }
      ]
    },
    {
        path: '/information/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
        children: [
            { path: '', element: <Stats /> }
        ]
    },
    {
        path: '/clients/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
        children: [
            {path: '', element: <ClientsPage /> }
        ]
    },
    {
        path: '/category/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
        children: [
            { path: '', element: <CategoryPage /> }
        ]
    },
    {
      path: '/providers/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
      children: [
        { path: '', element: <ProvidersPage /> }
      ]
    }
  ];
  

export default routes