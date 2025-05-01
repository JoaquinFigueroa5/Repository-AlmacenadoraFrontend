
import { lazy } from 'react';
import { Settings } from './components/settings/Settings';

const Auth = lazy(() => import('./pages/Auth'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ViewUsers = lazy(() => import('./components/ViewUsers'));
// import { ProductsPage } from './pages/products/ProductPage';
const ProductsPage = lazy(() => import('./pages/products/ProductPage'))

const routes = [
    { path: '/', element: <Auth /> },
    { path: '/dashboard', element: <LandingPage /> },
    { path: '/products/*', element: <ProductsPage /> },
    { path: '/users/*', element: <ViewUsers /> },
    {path: '/users/:id', element: <ViewUsers /> }
]

export default routes