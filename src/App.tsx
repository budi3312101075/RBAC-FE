import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { useAuth } from "./store/auth";
import { filterAccess } from "./utils/tools";
import { route } from "./routes/listRoutes"; // Assuming routes are in the `routes` folder
import axios from "axios";
import NotFound from "./pages/404";

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const { loginResponse } = useAuth();

  const allowedRoutes = filterAccess(route);

  return (
    <BrowserRouter>
      {loginResponse ? (
        <Routes>
          <Route element={<Sidebar />}>
            {allowedRoutes.map((r) => (
              <Route key={r.id} path={r.path} element={r.element} />
            ))}
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
