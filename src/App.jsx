import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
/*import PrivateRoute from "./components/PrivateRoute";*/

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}