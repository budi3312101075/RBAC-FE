import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      {/* ------------------------------------------------------- */}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
