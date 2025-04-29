import { Auth } from "./pages/Auth";
import { Stats } from "./pages/Stats";

const routes = [
    {path: '/', element: <Auth /> },
    {path: '/stats', element: <Stats />}
]

export default routes