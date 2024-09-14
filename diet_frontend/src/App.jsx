import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
