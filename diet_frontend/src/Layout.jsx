import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col">
      <div className="relative py-4 px-8 flex flex-col min-h-fit rounded-lg">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
