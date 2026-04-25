import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Order from "@/pages/Order";
import Support from "@/pages/Support";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </Router>
  );
}
