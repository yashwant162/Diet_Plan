import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/AboutUsPage";

axios.defaults.baseURL = "http://172.18.1.149:8000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
