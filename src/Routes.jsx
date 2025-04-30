import { Auth } from "./pages/Auth";
import { Stats } from "./pages/Stats";
import { Movimientos } from "./pages/Movimientos";

const routes = [
    {path: '/', element: <Auth /> },
    {path: '/stats', element: <Stats />},
    {path: '/movimientos', element: <Movimientos />}
]

export default routes