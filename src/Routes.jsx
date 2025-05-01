import { lazy } from 'react';
import { Settings } from './components/settings/Settings';

const Auth = lazy(() => import('./pages/Auth'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ViewUsers = lazy(() => import('./components/ViewUsers'));
// const Settings = lazy(() => import('./components/settings/Settings'))


const routes = [
    {path: '/', element: <Auth /> },
    {path: '/dashboard', element: <LandingPage /> },
    {path: '/users', element: <ViewUsers /> },
    {path: '/users/:id', element: <ViewUsers /> },
    // {path: '/users/:id', element: <Settings /> }
]

export default routes