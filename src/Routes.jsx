import { lazy } from 'react';

const Auth = lazy(() => import('./pages/Auth'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ViewUsers = lazy(() => import('./components/ViewUsers'));

const routes = [
    {path: '/', element: <Auth /> },
    {path: '/dashboard', element: <LandingPage /> },
    {path: '/users/*', element: <ViewUsers /> }
]

export default routes