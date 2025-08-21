import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
/*import PrivateRoute from "./components/PrivateRoute";*/
/* import Dashboard from "./pages/dashboard"; */

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}