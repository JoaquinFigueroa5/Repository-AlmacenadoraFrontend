import { Auth } from "./pages/Auth";
import { LandingPage } from "./pages/LandingPage";
import { ProductsPage } from "./pages/products/ProductPage";

const routes = [
    {path: '/', element: <Auth /> },
    { path: '/products', element: <ProductsPage /> },
    {path: '/dashboard', element: <LandingPage /> }
]

export default routes