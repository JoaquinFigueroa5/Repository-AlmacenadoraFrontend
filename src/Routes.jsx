import { Auth } from "./pages/Auth";
import { LandingPage } from "./pages/LandingPage";

const routes = [
    {path: '/', element: <Auth /> },
    {path: '/dashboard', element: <LandingPage /> }
]

export default routes